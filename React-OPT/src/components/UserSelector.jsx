import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const UserSelector = ({ selectedUserId, onUserChange }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = useCallback((e) => {
    onUserChange(parseInt(e.target.value));
  }, [onUserChange]);

  return (
    <Form.Select aria-label="Select User" onChange={handleUserChange} value={selectedUserId || ''}>
      <option value="">All Users</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default UserSelector;