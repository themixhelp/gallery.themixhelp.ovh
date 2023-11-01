import axios from 'axios'
import STORE from '@/store.js'

const instance = axios.create({
	baseURL: `${STORE.URL}/api`,
	params: {
		populate: '*',
	},
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
	},
})

export default instance
