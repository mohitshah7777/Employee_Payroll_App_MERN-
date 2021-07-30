#!/bin/bash -x

cp .env /home/ubuntu/Employee_Payroll_BackEnd/
cd /home/ubuntu/Employee_Payroll_Backend
directory=$(pwd)
echo "Directory is $directory"
npm i
npm run build
npm start
echo "Successfully Deployed"