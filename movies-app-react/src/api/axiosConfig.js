import axios from 'axios';

export default axios.create({
    baseURL: 'https://8ca2-49-144-2-233.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
})
