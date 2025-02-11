import axios from 'axios'
import { backendURL } from '../../common-things/CommonThings'

async function GetSubCategory() {
    try {
        let response = await axios.get(`${backendURL}/subCategoryCollection`);
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
    }
}

export default GetSubCategory
