import recordsDal from "../dal/recordsDal.js";
import { createError } from "../utils/utils.js";

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
    const newId = await recordsDal.writeNewRecord({soldierId, unit, currentBenefitType: null, history: []})
    await recordsDal.addBenefitToRecord({startDate, endDate: null, decisionReason, budjetApproved, benefitType, details}, newId)
    const record = await recordsDal.getRecordById(newId)
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

export default {createNewRecord, getSoldierRecord}