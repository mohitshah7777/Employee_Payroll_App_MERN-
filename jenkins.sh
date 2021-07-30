#!/bin/bash -x

cp .env /home/ubuntu/Employee_Payroll_BackEnd/
cd /home/ubuntu/Employee_Payroll_Backend
directory=$(pwd)
echo "Directory is $directory"
pm2 delete 0
npm install
pm2 --name Employee_Payroll_FrontEnd start npm -- start
# npm i
# npm run build
# npm start
echo "Successfully Deployed"