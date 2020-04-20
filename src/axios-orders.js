import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://focused-zephyr-104414.firebaseio.com/'
});

export default instance;