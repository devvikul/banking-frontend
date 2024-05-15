import React, { useState } from "react";
import "./BeneficiaryForm.css";
import Modal from "../model/Modal ";
import { useDispatch, useSelector } from 'react-redux';
import { addBeneficiary, updateBeneficiary } from "../../app/features/beneficiariesSlice";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { showToast } from "../../utils/utils";

const BeneficiaryForm = () => {
  const dispatch = useDispatch();
  const beneficiary = useSelector((state) => state.beneficiaries?.beneficiary);
  const status = useSelector((state) => state.beneficiaries.createStatus);
  const navigate= useNavigate()
  const [userDetails, setUserDetails] = useState(beneficiary ? beneficiary :{
    name: "",
    accountNumber: "",
    bankName: "",
    accountType: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);    
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errors = {};
    if (!userDetails.name.trim()) {
      errors.name = "Name is required";
    }
    if (!userDetails.accountNumber.trim()) {
      errors.accountNumber = "Account number is required";
    } else if (!/^\d+$/.test(userDetails.accountNumber)) {
      errors.accountNumber = "Account number must contain only digits";
    } else if (userDetails.accountNumber.length !== 12) {
      errors.accountNumber = "Account number must be 12 digits long";
    }
    if (!userDetails.bankName.trim()) {
      errors.bankName = "Bank name is required";
    }
    if (!userDetails.accountType.trim()) {
      errors.accountType = "Account type is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsModalOpen(true)
  };


  const handleSubmit = (e) => {
    if (beneficiary) {
      dispatch(updateBeneficiary(userDetails))
      .then(result => {
        showToast(false, "Beneficiary details updated successfully")
      })
      .catch((error) => {
        showToast(true, "Update beneficiary failed")
      });
    } else {
      dispatch(addBeneficiary(userDetails))
      .then(result => {
        if(status === "error"){
          showToast(true, "failed adding beneficiary")
        }
        showToast(false, "Beneficiary added successfully")
      })
      .catch((error) => {
        showToast(true, "failed adding beneficiary")
      });
    }

    setUserDetails({
      name: "",
      accountNumber: "",
      bankName: "",
      accountType: "",
    });
    setErrors({});
    closeModal()
    navigate("/managebeneficiaries")
  };

  return (
    <>
      <form autoComplete="off" className="beneficiary-form" onSubmit={handleSubmitForm}>
        <div>
          <h1>{beneficiary ? "Update" : "Add"} beneficiary</h1>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={userDetails.accountNumber}
            onChange={handleChange}
          />
          {errors.accountNumber && (
            <span className="error">{errors.accountNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="bankName">Bank Name:</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={userDetails.bankName}
            onChange={handleChange}
          />
          {errors.bankName && <span className="error">{errors.bankName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="accountType">Account Type:</label>
          <select
            id="accountType"
            name="accountType"
            value={userDetails.accountType}
            onChange={handleChange}
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
          {errors.accountType && (
            <span className="error">{errors.accountType}</span>
          )}
        </div>
        <button type="submit" className="formBtn">
          {beneficiary ? "Update" : "Add"}  Beneficiary
        </button>
        {
          isModalOpen && 
          <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={handleSubmit}
          btnText={"Yes"}
        >
          <h2>Confirmation Box</h2>
          <p>
          {beneficiary ? `Are you sure you want to update ${userDetails.name} details?` : `Are you sure you want to add ${userDetails.name} as beneficiary?`}
          </p>
        </Modal>
        }
        
      </form>
      
    </>
  );
};

export default BeneficiaryForm;