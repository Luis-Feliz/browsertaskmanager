const{Client}=require('pg')

const con=new Client({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"Sander2247@",
    database:"Demo_DB"
})

con.connect().then(()=> console.log ("connected"))