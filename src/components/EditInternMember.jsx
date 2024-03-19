
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditInternMember = () => {
  const { id } = useParams(); // Get intern member ID from URL parameters
  const navigate = useNavigate();
  const [internMember, setInternMember] = useState({
    name: '',
    address: '',
    dateOfBirth: '',
    selectionStatus: false,
  });

  useEffect(() => {
    const fetchInternMemberDetails = async () => {
      try {
        const response = await axios.get(`/api/internmembers/${id}`);
        setInternMember(response.data);
      } catch (error) {
        console.error('Failed to fetch intern member details:', error);
      }
    };

    fetchInternMemberDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInternMember({
      ...internMember,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5173/internmembers/${id}`, internMember);
      alert('Intern Member updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to update intern member:', error);
      alert('Failed to update intern member.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Intern Member</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={internMember.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={internMember.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={internMember.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="selectionStatus"
            checked={internMember.selectionStatus}
            onChange={handleChange}
          />
          Selected
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditInternMember;
