import { Sequelize } from "sequelize";

const db = new Sequelize('express','root','asdasdasd',{
    host:'localhost',
    dialect:'mysql',
})

export default db;