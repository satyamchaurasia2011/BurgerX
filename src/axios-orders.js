import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-x-aec4b.firebaseio.com/'
});

export default instance;