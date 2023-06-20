import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("You're not authenticated");
        }
        if (err.response.status === 403) {
          alert("You're not authorized");
        }
        console.error(err);
      });
  }, []);

  return (
    <div>
      <p>Users List</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Email: {user.email} - Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
