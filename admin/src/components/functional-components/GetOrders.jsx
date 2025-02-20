import axios from 'axios';
import { backendURL } from '../common-things/CommonThings';

async function GetOrders(token) {
    try {
        let response = await axios({
            method : "GET",
            url : `${backendURL}/get-orders-list`,
            headers : {Authorization : `Bearer ${token}`}
        });
        return response.data.data;
    } catch (error) {
        console.log("error while GetOrders : ",error);
    }
}

export default GetOrders
