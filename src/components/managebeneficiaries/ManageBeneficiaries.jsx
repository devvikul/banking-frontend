import React, { useState } from 'react';
import BeneficiaryList from '../beneficiarylist/BeneficiaryList';
import { showToast } from '../../utils/utils';

import './ManageBeneficiaries.css'
import { useNavigate } from 'react-router-dom';
import { deleteBeneficiary, setBeneficiary } from '../../app/features/beneficiariesSlice';
import { useDispatch } from 'react-redux'


const ManageBeneficiaries = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleAddBeniFiClick = () =>{
    dispatch(setBeneficiary(null));
    navigate("/managebeneficiaries/baneficiariesform")
  }

  const onView = (beneficiary) =>{  
    dispatch(setBeneficiary(beneficiary));
    navigate("/managebeneficiaries/viewbeneficiarydetails")
  }

  const onEdit = (beneficiary) =>{
    dispatch(setBeneficiary(beneficiary));
    navigate("/managebeneficiaries/baneficiariesform")
  }


  const onDelete = (id, fn) =>{
    dispatch(deleteBeneficiary(id)).then(result => {
      showToast(false, "Beneficiary removed successfully")
    })
    .catch((error) => {
      showToast(true, "failed removing beneficiary!")
    });
    fn()
    navigate("/managebeneficiaries")
  }
  return (
    <div>
      <div className='beneficiaries-header'>
        <h2>Manage Beneficiaries</h2>
        <div>
          <button onClick={handleAddBeniFiClick}>Add Beneficiaries</button>
        </div>
      </div>
      <BeneficiaryList onDelete={onDelete} onEdit={onEdit} onView={onView} />
      
    </div>
  );
};

export default ManageBeneficiaries;
