import budjetsDal from "../dal/budjetsDal";

const createNewBudjet = async (data) => {
    const {unit, benefitType, month, allocatedAmount}
    const benefitTypes = ["giftCard", "diningHall"]
    if (!benefitTypes.includes(benefitType)) {
        const error = createError(400, `${benefitType} is unauthorized benefit type`)
        throw error
    }
    
    const newBudjet = await budjetsDal.createBudjet()
}