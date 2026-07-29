import sb from "../dbConnections/supabaseConnection.js"

const createBudjet = async (budjet) => {
    const { data, error } = await sb.from("budjets").insert(budjet).select()
    if (error) throw error
    return data[0]
}


export default {createBudjet}