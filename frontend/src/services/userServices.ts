import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface CreateUser{
  name:string;
  username:string;
  email:string;
  password:string;
}

const base_url = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${base_url}/api/user/list/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
    throw error;
  }
};


export const createUser = async (userData:{
  name:string;
  username:string;
  email:string;
  password:string;
  birthdate?: Date | null;
}): Promise<CreateUser> =>{
  try{
    const response = await axios.post(`${base_url}/api/user/create/`,userData);
    return response.data
  }catch (error){
    console.error("Failed to create User: ",error);
    throw error;
  }
}