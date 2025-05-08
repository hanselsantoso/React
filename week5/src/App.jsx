import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      setUsers([...users, response.data]);
    } catch (err) {
      alert("Failed to add user.");
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user)));
      setEditingUser(null);
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* User Form */}
      <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} />

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* User Table */}
      <UserTable users={users} deleteUser={deleteUser} setEditingUser={setEditingUser} loading={loading} />
    </div>
  );
}

export default App;
