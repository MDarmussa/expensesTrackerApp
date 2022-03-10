This is a backend app for tracking individual expenses using simple form including payment method, item purchased, date, and amount paid. 

Using express.js, PostgreSQL
Authentication: jwt


npx sequelize-cli model:generate --name User --attributes username:string,password:string,email:string

npx sequelize-cli model:generate --name Profile --attributes type:string,user_id:integer,item:string,date:dateonly,amount:float,note:citext

npx sequelize-cli model:generate --name Receipt --attributes user_id:integer,profile_id:integer,receipt_photo:string,user_photo:string

profile module data type:
npx sequelize-cli model:generate --name Profile --attributes type:string,item:string,date:dateonly,amount:float,note:citext




 ------- (add extra files to migration to connect the foreign keys) ---------
- run (1)
npx sequelize-cli migration:generate --name userConstraints //addconstraints can be any name
- run
npx sequelize-cli db:migrate 
-run (2)
- npx sequelize-cli migration:generate --name restaurants2 
-run //
npx sequelize-cli db:migrate 

npx sequelize-cli migration:generate --name userreceiptConstraints 
npx sequelize-cli migration:generate --name profilereceiptConstraints 

