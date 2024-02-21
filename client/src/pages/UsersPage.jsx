import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from "..//utils/api.js";
import { Link } from 'react-router-dom';
import Navbar from '../components/sticky/Navbar.jsx';
import Footer from '../components/sticky/Footer.jsx';

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
       <div className="lg:mx-[150px] flex flex-col min-h-screen">
        <div className="flex-grow">
          <Navbar />
            <div>
              <h1>All Users</h1>
              <ul>
                {users.map(user => (
                  <li key={user._id}> <Link to={`/plants/user/${user._id}`} className="shadow-md bg-gray-300 p-2">{user.name}</Link> </li>
                ))}
              </ul>
            </div>
          </div>
          <Footer />
        </div>
      );
}
export default UsersPage;
