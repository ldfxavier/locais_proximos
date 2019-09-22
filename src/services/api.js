import axios from 'axios';

const api = axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api/place',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
