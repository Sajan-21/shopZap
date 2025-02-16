import { useParams } from 'react-router-dom'

function CheckLogin() {
    try {
        const params = useParams();
        return params.userId ? true : false;
    } catch (error) {
        console.log("error while CheckLogin : ",error);
    }
}

export default CheckLogin
