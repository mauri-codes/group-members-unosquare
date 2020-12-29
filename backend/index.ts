import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()

const URL = "https://my-json-server.typicode.com/ajd01/demo/memebers"
const port = 3300

app.use(cors())

app.get("/members", async (req, res) => {
    const { data } = await axios.get(URL).catch(err => ({data: err, success: false}))
    res.send(data)
})

app.listen(port, () => console.log(`connected to port ${port}`))
