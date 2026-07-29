import db from "../dbConnections/mongodbConnection.js"
import {ObjectId} from "mongodb"

const collection = db.collection("records")

const writeNewRecord = async (record) => {
    const result = await collection.insertOne(record);
    return result.insertedId.toString()
}

const addBenefitToRecord = async (benefit, soldierId) => {
    const result = await collection.updateOne({soldierId: soldierId}, { $push: { history: benefit}, $set: {currentBenefitType: benefit.benefitType} })
    return result.modifiedCount > 0
}

const getRecordById = async (recordId) => {
    const record = await collection.findOne({_id: new ObjectId(recordId)})
    const {_id, ...rest} = record
    return {id: _id.toString(), ...rest}
}

const getRecordBySoldierId = async (soldierId) => {
    const record = await collection.findOne({soldierId: soldierId})
    return record
}

const closeCurrentBenefit = async (soldierId) => {
    const record = await getRecordBySoldierId(soldierId)
    const history = record.history
    const currentBenefit = history.pop()
    currentBenefit.endDate = Date().now().toString()
    history.push(currentBenefit)
    const result = await collection.updateOne({soldierId: soldierId}, {$set: {history: history}})
    return result.modifiedCount > 0
}

export default {writeNewRecord, addBenefitToRecord, getRecordById, getRecordBySoldierId, closeCurrentBenefit}


