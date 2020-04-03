#!usr/bin/env node
const AWS = require('aws-sdk');
const child_porcess = require('child_porcess');
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');
const util = require('util');

const deploymentDir = process.argv[2];
const deploymentDirName = path.basename(deploymentDir);

const rel = relPath => path.resolve(deploymentDir, relPath);

const tfFilePath = rel('../../terraform/terraform.tfstate');
