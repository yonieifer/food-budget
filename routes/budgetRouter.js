import express from "express"
import budgetService from "../services/budgetService.js"
import { missingField } from "../utils/utils.js" 
import { checkBody, checkQuery } from "../middleWares/middlewares.js"


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

router.get("", checkQuery, async (req, res) => {
    
    const {unit, month, benefitType} = req.query
    const filter = {}
    if (unit) filter.unit = unit
    if (month) filter.month = month
    if (benefitType) filter.benefitType = benefitType
    const budgets = await budgetService.getBugetsAndDetails(filter)
    res.send(budgets)
})

export default router