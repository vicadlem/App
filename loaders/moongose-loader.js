import { connection, connect } from 'mongoose'
import config from '@config'

const initDb = async () => {
  try {
    await connectToMongoDB()
  } catch (err) {
    connection.close()
    throw new Error(`Fail to connect db ${err}`) 
  }
}

const connectToMongoDB = async () => {
  await connect(config.databaseURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export default initDb
