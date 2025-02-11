import axios from 'axios'
import { backendURL } from '../../common-things/CommonThings'

async function GetCategory() {
    try {
        let response = await axios.get(`${backendURL}/categoryCollection`);
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
    }
}

export default GetCategory