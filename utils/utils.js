export const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const missingField = (required, object) => {
    const missing = required.find((f) => object[f] === undefined);
    return missing;
};

export const isPrime = (num) => {
    if (num === 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
};

export const getYearToDate = (strDate) => {
    const date = new Date(strDate)
    const startOfTheYear = new Date(date.getFullYear, 0, 0)
    const secDiff = date - startOfTheYear
    const oneDay = 1000 * 60 * 60 * 24
    return secDiff / oneDay
}
