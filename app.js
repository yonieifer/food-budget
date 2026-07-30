import express from "express";
import recordsRoter from "./routes/recordsRouter.js";
import budgetsRoter from "./routes/budgetRouter.js";
import { logger, errorHandler } from "./middleWares/middlewares.js";

const app = express();

app.use(logger);

app.use(express.json());

app.use("/soldiers", recordsRoter);

app.use("/budget", budgetsRoter);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}`),
);
