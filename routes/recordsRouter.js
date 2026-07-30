import express from "express"
import recordsService from "../services/recordsService.js"
import { missingField } from "../utils/utils.js" 
import { checkBody } from "../middleWares/middlewares.js"


const router = express.Router()

router.post ("/:soldiersId/benefits", checkBody, async (req, res) => {
    const soldierId = req.params.soldiersId   
    const startDate = req.body.startDate ?? new Date().toISOString()
    const requiredFields = ["unit", "benefitType", "details", "decisionReason", "budjetApproved"]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
            return
    }
    const newRecord = await recordsService.createNewRecord({startDate, ...req.body}, soldierId)
    res.status(201).send(newRecord)
})

router.get("/:soldiersId/benefits", async (req, res) => {
    const soldierId = req.params.soldiersId
    const record = await recordsService.getSoldierRecord(soldierId)
    res.send(record)
})

router.patch("/:soldiersId/benefits", checkBody, async (req, res) => {
    const soldierId = req.params.soldiersId  
    const decisionDate = req.body.decisionDate ??  new Date().toISOString()
    const requiredFields = ["benefitType", "details", "decisionReason", "budjetApproved"]
    const missing = missingField(requiredFields, req.body)
    if (missing) {
            res.status(400).send(`field ${missing} is required`)
            return
    }
    const result = await recordsService.addNewBenefitToSoldier({decisionDate, ...req.body}, soldierId)
    if (result.reverted) {
        res.send({reverted: result.reverted, reason: "left foot", record: result.record})
        return
    }
    res.send({reverted: result.reverted, record: result.record})
})


export default router