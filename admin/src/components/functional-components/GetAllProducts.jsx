import axios from 'axios'
import { backendURL } from '../common-things/CommonThings';

async function GetAllProducts(userId, role, category, subCategory) {
    try {
        let response = await axios.get(`${backendURL}/get-products/${userId}/${role}/${category}/${subCategory}`);
        return response.data.data;
    } catch (error) {
        console.log("error while fetching all products : ",error);
    }
}

export default GetAllProducts
