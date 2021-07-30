#!/bin/bash -x

cp .env /home/ubuntu/Employee_Payroll_BackEnd/
cd /home/ubuntu/Employee_Payroll_BackEnd
directory=$(pwd)
echo "Directory is $directory"
pm2 delete 0
npm install
# npm start
pm2 --name Employee_Payroll_Frontend start npm -- start
# npm i
# npm run build
# npm start
echo "Successfully Deployed"