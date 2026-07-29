import express from "express"
import recordsRoter from "./routes/recordsRouter.js"

const app = express()

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

app.use(express.json())

app.use("/soldiers", recordsRoter)

app.use((err, req, res, next) => {
    const status = err.statusCode|| 500
    const message = err.message || "server internal error"
    res.status(status).send(message)
})

app.listen(process.env.PORT, () => console.log(`server is up and listening on port ${process.env.PORT}`))
