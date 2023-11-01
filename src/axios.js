import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://144.24.168.122:1337/api',
	params: {
		populate: '*',
	},
})

export default instance
