#!/bin/sh

deployment_dir=/opt/microservices-demo/api-gateway
if [ -d "$deployment_dir"] && [ -x "$deployment_dir"]; then
  cd $deployment_dir

  node -e 'try{require("child_process").execSync("pm2 stop api-gateway")}catch(e){}'
fi