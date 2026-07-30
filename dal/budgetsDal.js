import sb from "../dbConnections/supabaseConnection.js"

const createBudget = async (budget) => {
    const { data, error } = await sb.from("budgets").insert(budget).select()
    if (error) throw error
    return data[0]
}

const getBudgetByFilter = async (filter) => {
    const { data, error } = await sb.from("budgets").select().match(filter)
    if (error) throw error
    return data
}

const getBudgetById = async (budgetId) => {
    const { data, error } = await sb.from("budgets").select().eq("id", budgetId)
    if (error) throw error
    return data[0]
}

const getExpensesForBudget = async (budgetId) => {
    const {data, error} = await sb.from("expenses").select().eq("budgetId", budgetId)
    if (error) throw error
    return data
}


export default {createBudget, getBudgetByFilter, getBudgetById, getExpensesForBudget}