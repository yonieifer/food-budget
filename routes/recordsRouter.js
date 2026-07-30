import express from "express"
import recordsService from "../services/recordsService.js"
import { missingField } from "../utils/utils.js" 
import { ReadConcern } from "mongodb"


const router = express.Router()

router.post ("/:soldiersId/benefits", async (req, res) => {
    const soldierId = req.params.soldiersId   
    const {unit, benefitType, details, decisionReason, budjetApproved} = req.body
    const {startDate} = req.body || {startDate: new Date().toISOString()} 
    const requiredFields = [unit, benefitType, details, decisionReason, budjetApproved, startDate]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
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
    const {benefitType, details, decisionReason, budjetApproved} = req.body
    const {decisionDate} = req.body || {decisionDate: new Date().toISOString()}
    const requiredFields = [benefitType, details, decisionReason, budjetApproved, decisionDate]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
    }
    const result = await recordsService.addNewBenefitToSoldier({benefitType, details, decisionReason, budjetApproved, decisionDate}, soldierId)
    if (result.reverted) {
        res.send({reverted: result.reverted, reason: "left foot", record: result.record})
    }
    res.send({reverted: result.reverted, record: result.record})
})


export default router