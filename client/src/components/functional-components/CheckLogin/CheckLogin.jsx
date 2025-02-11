import { useParams } from 'react-router-dom'

function CheckLogin() {
    const params = useParams();

    if(params.userId){
        return true;
    }else{
        return false;
    }
}

export default CheckLogin;