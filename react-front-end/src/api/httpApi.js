import axios from 'axios';
import { parseResponse } from '../utils/Utils';

//TODO: Be aware where the port is going to be
//const instance = axios.create({ baseURL: 'http://35.190.131.104:8888' })
//const instance = axios.create({ baseURL: 'http://localhost:8888' }) // this is for blockchain
const instanceDefault = axios.create({ baseURL: 'http://localhost:8889' }); // this is for firebase
/**
 * This File is for parsing and anything processing middleware with diferent directions
 */
export default {
    user: {
        login: credentials => instanceDefault.post('/login', { credentials })
            .then((res) => {
                console.log('Response in Api Login:');
                let result = parseResponse(res);
                console.log(result);
                return result;
            }),

        signup: params => instanceDefault.post('/createUser', { params })
            .then((res) => {
                console.log('Response in Api Signup');
                let result = parseResponse(res);
                console.log(result);
                return result;
            })
    },
    vocabulary: {
        translate_kichwa_spanish: word_kichwa => instanceDefault.post('/translate_kichwa_spanish', { word_kichwa })
            .then(res => {
                console.log('Response in Api Translate');
                res.data
            }),
        getValueByQuery: input => {
            return instanceDefault.post('/getObjectsByQuery', { input });
        }
    },
    files: {
        uploadFiles: input => {
            let headersFiles = { 'Content-Type': 'multipart/form-data' }
            return instanceDefault.post('/uploadFiles', input, { headers: headersFiles })
        }
    }
}
