import recordsDal from "../dal/recordsDal.js";

const createNewRecord = async (data, soldierId) => {
    const isSoldierRecordExists = await recordsDal.getRecordBySoldierId(soldierId)
    if (isSoldierRecordExists) {
        const error = new Error(`soldier ${soldierId} already have benefits record`)
        error.statusCode = 409
    }
    const {unit, benefitType, details, decisionReason, budjetApproved, startDate} = data
    const newId = await recordsDal.writeNewRecord({soldierId, unit, currentBenefitType: null, history: []})
    const isUpdated = await recordsDal.addBenefitToRecord({startDate, endDate: null, decisionReason, budjetApproved, benefitType, details})
    if (!isUpdated) {
        const err
    }

}