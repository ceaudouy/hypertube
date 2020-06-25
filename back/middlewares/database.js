import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USR,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
)

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export default db
