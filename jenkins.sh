#!/bin/bash -x

cd /home/ubuntu/Employee_Payroll_Backend
directory=$(pwd)
echo "Directory is $directory"
npm i
npm run build
npm start
echo "Successfully Deployed"