import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const connection = async () => {
    try {
        mongoose.connect(process.env.MONGOURI)
    } catch (err) {
        console.log(`Could not connect: ${err}`)
    }
    const dbConnection = mongoose.connection

    dbConnection.on('error', (err) => {
        console.log(`Connection Error: ${err}`)
    })

    dbConnection.once('open', () => {
        console.log('Connected to DB!')
    })
}