import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from "..//utils/api.js";
import { Link } from 'react-router-dom';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/all-users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
    }, []);
    return (
        <div>
          <h1>All Users</h1>
          <ul>
            {users.map(user => (
              <li key={user._id}> <Link to={`/plants/user/${user._id}`}>{user.name}</Link> </li>
            ))}
          </ul>
        </div>
      );
}
export default UsersPage;
