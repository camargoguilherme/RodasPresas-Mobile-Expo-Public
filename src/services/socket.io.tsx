import { io } from 'socket.io-client';
import {URL_BACKEND} from '../constants'
const socket = io(URL_BACKEND);

export default socket;
