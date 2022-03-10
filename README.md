This is a backend app for tracking individual expenses using simple form including payment method, item purchased, date, and amount paid. 

Using express.js, PostgreSQL
Authentication: jwt

profile module data type:
npx sequelize-cli model:generate --name Profile --attributes type:string,item:string,date:dateonly,amount:float,note:citext


