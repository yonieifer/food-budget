import express from "express"

const app = express()

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

app.use(express.json())

app.use((err, req, res, next) => {
    const status = err.statusCode|| 500
    const message = err.message || "server internal error"
    res.status(status).send(message)
})

app.listen(procces.env.PORT, () => console.log(`server is up and listening on port ${process.env.PORT}`))
