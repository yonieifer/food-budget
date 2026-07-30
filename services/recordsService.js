import recordsDal from "../dal/recordsDal.js";
import { createError,  } from "../utils/utils.js";

const createNewRecord = async (data, soldierId) => {
    const soldierRecord = await recordsDal.getRecordBySoldierId(soldierId)
    if (soldierRecord) {
        const error = createError(409, `soldier ${soldierId} already have benefits record`)
        throw error
    }
    const {unit, benefitType, details, decisionReason, budjetApproved, startDate} = data
    const benefitTypes = ["giftCard", "diningHall"]
    if (!benefitTypes.includes(benefitType)) {
        const error = createError(400, `${benefitType} is unauthorized benefit type`)
        throw error
    }
    if (typeof budjetApproved !== "boolean") {
        const error = createError(400, "budjetApproved field must be boolean")
        throw error
    }
    const id = await recordsDal.writeNewRecord({soldierId, unit, currentBenefitType: null, history: []})
    await recordsDal.addBenefitToRecord({startDate, endDate: null, decisionReason, budjetApproved, benefitType, details}, soldierId)
    const record = {id, soldierId, unit, currentBenefitType: benefitType, history: [{startDate, endDate: null, budjetApproved, benefitType, details}]}
    return record
}

const getSoldierRecord = async (soldierId) => {
    const record = await recordsDal.getRecordBySoldierId(soldierId)
    if (!record) {
        const error = createError(404, `the record of soldier ${soldierId} not found`)
        throw error
    }
    return record
}

const addNewBenefitToSoldier = async (data, soldierId) => {
    const {benefitType, details, decisionReason, budjetApproved, decisionDate} = data
    await recordsDal.closeCurrentBenefit(soldierId)
    await recordsDal.addBenefitToRecord({startDate: decisionDate, endDate: null, decisionReason, budjetApproved, benefitType, details}, soldierId)
    const updatedRecord = await getSoldierRecord(soldierId)
    return updatedRecord
}

export default {createNewRecord, getSoldierRecord, addNewBenefitToSoldier}