import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

axios.get(`${url}/api/user/list/`).then(res=>console.log(res.data)).catch(err=>console.err(err));

export const getAllUsers = async () =>{
    try{
        const response = await axios.get(`${url}/api/user/list/`);
        return response.data;
    }catch(error){
        console.error('Error fetching users: '+ error)
        throw error;
    }
}