import express from "express"
import budgetService from "../services/budgetService.js"
import { missingField } from "../utils/utils.js" 
import { checkBody, checkQuery } from "../middleWares/middlewares.js"
import budgetsDal from "../dal/budgetsDal.js"
import expensesDal from "../dal/expensesDal.js"


const router = express.Router()

router.post("", checkBody, async (req, res) => {
    const requiredFields = ["unit", "benefitType", "month", "allocatedAmount"]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
            return
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

router.get("/:id/transactions", async (req, res) => {
    const id = req.params.id 
    const expenses = await budgetService.getTransactionsForBudget(id)
    res.send(expenses)
})

router.post("/:id/spend", checkBody, async (req, res) => {
    const budgetId = req.params.id
    const {amount} = req.body
    if (!amount) {
        res.status(400).send(`field amount is required`)
        return
    }
    const result = await budgetService.createExpenseForBudget(req.body, budgetId)
    if (result.error) {
        res.status(400).send(result)
        return
    }
    res.status(201).send(result)
})

export default router
