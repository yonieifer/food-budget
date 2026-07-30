import budgetsDal from "../dal/budgetsDal.js";
import { createError } from "../utils/utils.js";

const createNewBudget = async (data) => {
    const {unit, benefitType, month, allocatedAmount} = data
    const benefitTypes = ["giftCard", "diningHall"]
    if (!benefitTypes.includes(benefitType)) {
        const error = createError(400, `${benefitType} is unauthorized benefit type`)
        throw error
    }
    const budgetExists = await budgetsDal.getBudgetByFilter({unit, benefitType, month})
    if (budgetExists.length > 0) {
        const error = createError(409, `budget for ${benefitType} for unit ${unit} for month ${month} already exists`)
        throw error
    }
    const newBudget = await budgetsDal.createBudget({unit, benefitType, month, allocatedAmount})
    return newBudget
}

const getSpentAmountForBudget = async (budgetId) => {
    const expenses = await budgetsDal.getExpensesForBudget(budgetId)
    const total = expenses.reduce((total, expense) => total + expense.amount, 0)
    return total
}

const getBugetsAndDetails = async (filter) => {
    const budgets = await budgetsDal.getBudgetByFilter(filter)
    for (const budget of budgets) {
        const spentAmount = await getSpentAmountForBudget(budget.id)
        budget.spentAmount = spentAmount
        budget.remainingAmount = budget.allocatedAmount - spentAmount
    }
    return budgets
}

const getTransactionsForBudget = async (budgetId) => {
    const budget = await budgetsDal.getBudgetById(budgetId)
    if (!budget) {
        const error = createError(404, `budget ${budgetId} not found`)
        throw error
    }
    const expenses = await budgetsDal.getExpensesForBudget(budgetId)
    return expenses
}

export default {createNewBudget, getBugetsAndDetails, getTransactionsForBudget}