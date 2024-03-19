// InternMembersForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './InternMembersForm.css';

const InternMembersForm = () => {
  const [internMember, setInternMember] = useState({
    name: '',
    address: '',
    dateOfBirth: '',
    selectionStatus: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInternMember({
      ...internMember,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5173/internmembers', internMember);
        alert('Intern Member added successfully!');
        // Reset form
        setInternMember({
          name: '',
          address: '',
          dateOfBirth: '',
          selectionStatus: false,
        });
      } catch (error) {
        console.error('Failed to add intern member:', error);
        alert('Failed to add intern member.');
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!internMember.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!internMember.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }

    if (!internMember.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit} className="intern-members-form">
      <h2>Add Intern Member</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={internMember.name}
          onChange={handleChange}
          className={formErrors.name && 'error'}
        />
        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={internMember.address}
          onChange={handleChange}
          className={formErrors.address && 'error'}
        />
        {formErrors.address && <span className="error-message">{formErrors.address}</span>}
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={internMember.dateOfBirth}
          onChange={handleChange}
          className={formErrors.dateOfBirth && 'error'}
        />
        {formErrors.dateOfBirth && <span className="error-message">{formErrors.dateOfBirth}</span>}
      </div>
      <div className="form-group">
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default InternMembersForm;
