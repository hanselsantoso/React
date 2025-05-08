import React, { useRef } from "react";
import "../assets/UserApp.css";

function UserForm() {
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const addressRef = useRef(null);
  const usersRef = useRef([]);
  const tableRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      address: addressRef.current.value,
    };

    if (newUser.name && newUser.age && newUser.address) {
      usersRef.current.push(newUser); 

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${newUser.name}</td>
        <td>${newUser.age}</td>
        <td>${newUser.address}</td>
      `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        usersRef.current = usersRef.current.filter((user) => user !== newUser);
        row.remove();
      };

      const actionCell = document.createElement("td");
      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);

      tableRef.current.appendChild(row);

      nameRef.current.value = "";
      ageRef.current.value = "";
      addressRef.current.value = "";
    }
  };

  return (
    <div className="user-app">
      <h2>User Profile Form (Only useRef)</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="Name" />
        <input type="number" ref={ageRef} placeholder="Age" />
        <input type="text" ref={addressRef} placeholder="Address" />
        <button type="submit">Add User</button>
      </form>

      <h3>User List</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody ref={tableRef}></tbody>
      </table>
    </div>
  );
}

export default UserForm;
