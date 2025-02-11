import axios from 'axios';
import { backendURL } from '../../common-things/CommonThings';

async function GetProducts(userId, role, categoryName, subCategoryName) {
    try {
        let response = await axios.get(`${backendURL}/get-products/${userId}/${role}/${categoryName}/${subCategoryName}`);
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
    }
}

export default GetProducts;