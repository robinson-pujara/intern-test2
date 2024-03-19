import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './InternMembersTable.css';
import { data } from '../../mock-backend/db';

const InternMembersTable = () => {
  const [internMembers, setInternMembers] = useState(data);
  const [isLoading, setIsLoading] = useState(false); 

  // useEffect(() => {
  //   setIsLoading(true); 
  //   const fetchInternMembers = async () => {
  //     try {
  //       const response = await axios.get('/api/internmembers');
  //       setInternMembers(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch intern members:', error);
  //     } finally {
  //       setIsLoading(false); 
  //     }
  //   };

  //   fetchInternMembers();
  // }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/internmembers/${id}`);
      setInternMembers(internMembers.filter(member => member.id !== id));
      alert('Intern Member deleted successfully!');
    } catch (error) {
      console.error('Failed to delete intern member:', error);
      alert('Failed to delete intern member.');
    }
  };

  return (
    <div className="table-container">
      <h2>Intern Members List</h2>
      {isLoading ? ( // Check if it's loading
        <div className="loader"></div> // Display loader
      ) : (
        <table className="intern-members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Selection Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.address}</td>
                <td>{member.dateOfBirth}</td>
                <td>{member.selectionStatus ? 'Selected' : 'Not Selected'}</td>
                <td className="action-buttons">
                  <Link to={`/edit/${member.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InternMembersTable;
