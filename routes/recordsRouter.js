import express from "express"
import recordsService from "../services/recordsService.js"


const router = express.Router()

router.post ("/:soldiersId/benefits", async (req, res) => {
    const soldierId = req.params.soldiersId   
    const {unit, benefitType, details, decisionReason, budjetApproved, startDate} = req.body
    const requiredFields = {unit, benefitType, details, decisionReason, budjetApproved, startDate}
    for (const key in requiredFields) {
        if (!key) {
            res.status(400).send(`field ${key} is required`)
        }
    }
    const newRecord = await recordsService.createNewRecord({unit, benefitType, details, decisionReason, budjetApproved, startDate}, soldierId)
    res.status(201).send(newRecord)
})

router.get("/:soldiersId/benefits", async (req, res) => {
    const soldierId = req.params.soldiersId
    const record = await recordsService.getSoldierRecord(soldierId)
    res.send(record)
})

router.patch("/:soldiersId/benefits", async (req, res) => {
    const soldierId = req.params.soldiersId  
    const {benefitType, details, decisionReason, budjetApproved, decisionDate} = req.body
    const requiredFields = {benefitType, details, decisionReason, budjetApproved, decisionDate}
    for (const key in requiredFields) {
        if (!req[key]) {
            res.status(400).send(`field ${key} is required`)
        }
    }
    const updatedRecord = await recordsService.addNewBenefitToSoldier({benefitType, details, decisionReason, budjetApproved, decisionDate}, soldierId)
    res.send(updatedRecord)
})


export default router