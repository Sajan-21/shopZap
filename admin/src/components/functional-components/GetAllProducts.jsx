import axios from 'axios'
import { backendURL } from '../common-things/CommonThings';

async function GetAllProducts(authId, category, subCategory) {
    try {
        let role = 'Admin'
        let response = await axios.get(`${backendURL}/get-products/${authId}/${role}/${category}/${subCategory}`);
        return response.data.data;
    } catch (error) {
        console.log("error while fetching all products : ",error);
    }
}

export default GetAllProducts
