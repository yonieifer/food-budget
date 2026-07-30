import express from "express"
import budgetService from "../services/budgetService.js"
import { missingField } from "../utils/utils.js" 


const router = express.Router()

router.post("", (req, res) => {
    const requiredFields = ["unit", "benefitType", "month", "allocatedAmount"]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
    }
    const newBudget = await budgetService.createNewBudget(req.body)
    res.status(201).send(newBudget)
})