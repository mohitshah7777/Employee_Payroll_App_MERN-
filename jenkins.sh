#!/bin/bash -x

cp .env /home/ubuntu/Emp_Pay_Backend/
cd /home/ubuntu/Emp_Pay_Backend
directory=$(pwd)
echo "Directory is $directory"
# pm2 delete 0
npx kill-port 4000
npm install
npm start
# pm2 --name Employee_Payroll_Frontend start npm -- start
# npm i
# npm run build
# npm start
echo "Successfully Deployed"