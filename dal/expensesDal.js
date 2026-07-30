import sb from "../dbConnections/supabaseConnection.js"

const createExpense = async (expense) => {
    const { data, error } = await sb.from("expenses").insert(expense).select()
    if (error) throw error
    return data[0]
}

export default {createExpense}