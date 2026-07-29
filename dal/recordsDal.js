import db from "../dbConnections/mongodbConnection.js"
import {ObjectId} from "mongodb"

const collection = db.collection("records")

const writeNewRecord = async (record) => {
    const result = await collection.insertOne(record);
    return result.insertedId.toString()
}

const addBenefitToRecord = async (benefit, recordId) => {
    const result = await collection.updateOne({_id: new ObjectId(recordId)}, { $push: { history: benefit}, $set: {currentBenefitType: benefit.benefitType} })
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

export default {writeNewRecord, addBenefitToRecord, getRecordById, getRecordBySoldierId}
