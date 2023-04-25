import express from 'express'
import router from './routes/users.route'
import connect from './util/db'
import { PORT } from './config/config'

const app = express()

app.use(express.json())

app.use('/api/v1/auth', router)

app.listen(PORT, async()=> {
    console.log(`Server running on Port http://localhost:${PORT}`)

    await connect()
})