import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

interface UserList {
  id: number;
  name:string;
  username: string;
  active: boolean;
  is_admin: boolean;
}

function UserManagementList() {
  const [users, setUsers] = useState<UserList[]>([]);
  const [active,setActive] = useState<boolean>(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const handleDeactivate = async (id: number) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/user/update_active_user/${id}`, {
      active: false,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Update only that user in the list
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: false } : user
      )
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const handleActivate = async (id: number) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/user/update_active_user/${id}`, {
      active: true,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: true } : user
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    axios.get(`${BASE_URL}/api/user/list/`, {
      headers: { Authorization: `Bearer  ${token}` },
    }).then((response) =>{
        console.log(response.data)
        setActive(response.data.active)
        setUsers(response.data)
    }).catch((err)=>{
      console.error(err);
    });
  },[]);

  return (
    <>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Type</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username }</td>
              <td>{user.is_admin ? "Yes" : "No"}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td><button className="btn btn-outline-danger" type="submit" hidden={!user.active} onClick={()=>handleDeactivate(user.id)}>Deactive</button>
              <button className="btn btn-outline-success" hidden={user.active}  onClick={()=>handleActivate(user.id)}>Activate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserManagementList;
