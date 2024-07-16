import * as Yup from 'yup'

import {text} from './validationText'

const PASSWORD_CHARS = '^(?=.*[!@#$%^&*:;=+|~`}{)(></"_\\[\\],\'.?-])'
const PASSWORD_MIN_LENGTH = 3

const fields = {
    EMAIL: 'Email',
    PASSWORD: 'Password'
}
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required(text.required(fields.EMAIL))
        .email(text.like_email(fields.EMAIL)),
    password: Yup.string()
        .required(text.required(fields.PASSWORD))
        .min(PASSWORD_MIN_LENGTH, text.length(fields.PASSWORD, PASSWORD_MIN_LENGTH, 'minimum'))
        .matches(PASSWORD_CHARS, text.has_char(fields.PASSWORD))
        // .matches(/[A-Z]/, text.has_case(fields.PASSWORD, 'uppercase'))
        // .matches(/[a-z]/, text.has_case(fields.PASSWORD), 'lowercase')
        .matches(/\d/, text.has_number(fields.PASSWORD))
})

export {
    loginSchema
}
