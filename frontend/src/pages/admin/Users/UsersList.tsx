// UsersList.tsx
import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table/Table';
import type { TableColumn } from '../../../components/Table/Table';
import { getAllUsers } from '../../../services/userServices';
import type { User } from '../../../services/userServices';

const usersColumn: TableColumn<User>[] = [
  { header: "Name", accessor: "name" },
  { header: "Username", accessor: "username" }
];

const UsersList = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsersData(data);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Table columns={usersColumn} data={usersData} />
  );
};

export default UsersList;
