#!/usr/local/bin/node
const AWS = require('aws-sdk');
const child_process = require('child_process');
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');
const util = require('util');

const deploymentDir = process.argv[2];
const deploymentDirName = path.basename(deploymentDir);

const rel = (relPath) => path.resolve(deploymentDir, relPath);

const tfFilePath = rel('../terraform/terraform.tfstate');

if (!fs.existsSync(tfFilePath)) {
  throw new Error(
    "terraform state file cannot be found please make sure you run 'terrafom apply' in cli "
  );
}

const { outputs } = JSON.parse(fs.readFileSync(tfFilePath, 'utf-8'));

require('dotenv').config({ path: rel('./.deploy.env') });

const accessEnv = require('./helpers/accessEnv');

const exec = util.promisify(child_process.exec);

const getFullDateTime = () => format(new Date(), 'yyyyMMddHHmms');

const APPLICATION_NAME = accessEnv('APPLICATION_NAME');

const MAX_BUFFER_SIZE = 1024 * 1024; //1MiB

const awsRegion = outputs['aws-region'].value;

const codeDeployClient = new AWS.CodeDeploy({
  accessKeyId: accessEnv('AWS_ACCESS_KEY_ID'),
  apiVersion: '2014-10-06',
  region: awsRegion,
  secretAccessKey: accessEnv('AWS_ACCESS_KEY_SECRET'),
});

const s3Client = new AWS.S3({
  accessKeyId: accessEnv('AWS_ACCESS_KEY_ID'),
  endpoint: new AWS.Endpoint(`https://s3.${awsRegion}.amazonaws.com/`),
  s3ForcePathStyle: true,
  region: awsRegion,
  secretAccessKey: accessEnv('AWS_ACCESS_KEY_SECRET'),
});

const rootDir = rel('../');

(async () => {
  console.log('Loading in 3 sec...');
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const lockFilePath = rel('../deploy.lock');
  console.log('Checking for lock file');
  if (fs.existsSync(lockFilePath)) {
    console.error('Deploy.lock file exists ,halting');
    process.exit();
  }

  console.log('Creating lockfile "deploy.lock".....');
  fs.writeFileSync(
    lockFilePath,
    'This stops node-deploy to run from concurrently, remove if errors are shown'
  );

  console.log('Checking enviornment...');
  if (!fs.existsSync(rel('.production.env'))) {
    console.error('no production.env file found exiting ');
    process.exit();
  }

  console.log('Copying appspec file');
  fs.copyFileSync(rel('./appspec.yml'), rel('../appspec.yml'));

  console.log('Creating deplyoment file');
  const filename = `${deploymentDirName}-deployment-${getFullDateTime()}.zip`;
  const zipPath = `tmp/${filename}`;
  await exec(
    `zip -r ${zipPath} . -x terraform/\\* -x node_modules/\\* -x \\*/node_modules/\\* -x \\*/.cache/\\* -x .git/\\* -x \\*.DS_Store`,
    { cwd: rootDir, maxBuffer: MAX_BUFFER_SIZE }
  );

  console.log('Uploding deployment file...');
  await s3Client
    .putObject({
      body: fs.createReadStream(zipPath),
      Bucket: outputs[`${APPLICATION_NAME}-deployment-bucket-name`].value,
      key: filename,
    })
    .promise();

  console.log(`Upload of deployment file: ${filename} complete`);

  console.log(`Removing local copy of deployment file`);
  fs.unlinkSync(zipPath);

  console.log('Deploying Application...');

  await codeDeployClient
    .createDeployment({
      applicationName: outputs[`${APPLICATION_NAME}-codedeploy-app-name`].value,
      deploymentGroupName: accessEnv('CODEDEPLOY_DEPLOYMENT_GROUP_NAME'),
      revision: {
        revisionType: 'S3',
        s3Location: {
          bucket: outputs[`${APPLICATION_NAME}-deployment-bucket-name`].value,
          bundleType: 'zip',
          key: filename,
        },
      },
    })
    .promise();

  console.log('CodeDeploy deployment initiated');

  console.log('Cleaning up...');
  fs.unlinkSync('../deploy.lock');
  fs.unlinkSync('../appspec.yml');
})();
