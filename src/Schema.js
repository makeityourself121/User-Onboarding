// Here goes the schema for the form
import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Username is required')
        .min(3, 'Username must be 3 characters long'),
    email: yup
        .string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be minimum 6 characters long' )
        .max(16, 'password must be less than 16 characters long'),
    
    tos: yup.boolean()
    .oneOf([true], 'Must agree terms'),
})

export default formSchema