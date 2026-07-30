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
    if (budgetExists) {
        const error = createError(409, `budget for ${benefitType} for unit ${unit} for month ${month} already exists`)
        throw error
    }
    const newBudget = await budgetsDal.createBudget({unit, benefitType, month, allocatedAmount})
    return newBudget
}

export default {createNewBudget}