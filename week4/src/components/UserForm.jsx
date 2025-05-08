import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import "../assets/RegisterForm.css";

// Joi validation schema
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  age: Joi.number().min(18).max(100).required().messages({
    "number.base": "Age must be a number",
    "number.min": "You must be at least 18 years old",
    "number.max": "Age cannot be more than 100",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Please select a gender",
  }),
  terms: Joi.boolean().valid(true).required().messages({
    "any.only": "You must accept the terms and conditions",
  }),
});

function RegisterForm() {
  const [users, setUsers] = useState([]); // Store registered users

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    setUsers([...users, data]); // Add new user to list
    reset(); // Clear form after submission
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <label>Name:</label>
        <input type="text" {...register("name")} placeholder="Enter your name" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Age:</label>
        <input type="number" {...register("age")} placeholder="Enter your age" />
        {errors.age && <p className="error">{errors.age.message}</p>}

        <label>Email:</label>
        <input type="email" {...register("email")} placeholder="Enter your email" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Gender:</label>
        <div className="radio-group">
          <input type="radio" value="male" {...register("gender")} id="male" />
          <label htmlFor="male">Male</label>
          <input type="radio" value="female" {...register("gender")} id="female" />
          <label htmlFor="female">Female</label>
        </div>
        {errors.gender && <p className="error">{errors.gender.message}</p>}

        <div className="checkbox-group">
          <input type="checkbox" {...register("terms")} id="terms" />
          <label htmlFor="terms">I accept the Terms & Conditions</label>
        </div>
        {errors.terms && <p className="error">{errors.terms.message}</p>}

        <button type="submit">Register</button>
      </form>

      {/* User List Table */}
      <h3>Registered Users</h3>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users registered yet.</p>
      )}
    </div>
  );
}

export default RegisterForm;
