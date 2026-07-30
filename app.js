import express from "express";
import recordsRouter from "./routes/recordsRouter.js";
import budgetsRouter from "./routes/budgetRouter.js";
import { logger, errorHandler } from "./middleWares/middlewares.js";

const app = express();

app.use(logger);

app.use(express.json());

app.use("/soldiers", recordsRouter);

app.use("/budget", budgetsRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}...`),
);
