import axios from 'axios'

const instances = [
    axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL})
]

export const [apiService] = instances
