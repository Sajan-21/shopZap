import axios from 'axios'
import { backendURL } from '../common-things/CommonThings';

async function GetUsers(token) {
    try {
        let response = await axios({
            method : 'GET',
            url : `${backendURL}/get-users`,
            headers : {Authorization : `Bearer ${token}`}
        });
        return response.data.data;
    } catch (error) {
        console.log("error while GetUsers : ",error);
    }
}

export default GetUsers
