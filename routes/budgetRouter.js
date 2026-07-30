import express from "express"
import budgetService from "../services/budgetService.js"
import { missingField } from "../utils/utils.js" 
import { checkBody } from "../middleWares/middlewares.js"


const router = express.Router()

router.post("", checkBody, async (req, res) => {
    const requiredFields = ["unit", "benefitType", "month", "allocatedAmount"]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
    }
    const newBudget = await budgetService.createNewBudget(req.body)
    res.status(201).send(newBudget)
})

export default router