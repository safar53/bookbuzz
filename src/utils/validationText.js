const text = {
    required: field => `${field} is required`,
    length: (field, length, type) => `${field} must be ${length} char ${type}`,
    has_number: field => `${field} must contain at least 1 number`,
    has_char: field => `${field} must contain at least 1 special char`,
    has_case: (field, type) => `${field} must contain at least 1 ${type} letter`,
    like_email: field => `${field} must match to email format`
}

export {
    text
}
