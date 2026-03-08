import express from "express"
import cors from "cors"
import identifyRoute from "./routes/identifyRoute"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/identify", identifyRoute)

const PORT = 3000

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})