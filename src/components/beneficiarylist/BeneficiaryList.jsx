// BeneficiaryList.jsx
import React, { useEffect, useState } from 'react';
import './BeneficiaryList.css';
import { fetchBeneficiaries } from '../../app/features/beneficiariesSlice';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../model/Modal ';
import noDataImage from '../../assets/nodata.png'

const BeneficiaryList = ({ onView, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const beneficiaries = useSelector((state) => state.beneficiaries.list);
  const status = useSelector((state) => state.beneficiaries.status);
  const error = useSelector((state) => state.beneficiaries.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const openModal = (_id, name) => {
    setUserDetails({
      id:_id,
      name:name,
    })
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBeneficiaries());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='failed-section'>
       <img src={noDataImage} alt="My Image" />
      </div>;
  }
  return (
    <div className="beneficiary-table">
      <table>
        <thead>
          <tr>
            <th className='header-cell'>Name</th>
            <th className='header-cell'>Bank Name</th>
            <th className='header-cell'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries && beneficiaries?.map(beneficiary => (
            <tr key={beneficiary.id}>
              <td>{beneficiary.name}</td>
              <td>{beneficiary.bankName}</td>
              <td>
                <button onClick={() => onView(beneficiary)}>View</button>
                <button onClick={() => onEdit(beneficiary)}>Edit</button>
                <button onClick={() => openModal(beneficiary?.id, beneficiary?.name)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
          isModalOpen && 
          <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={()=>{onDelete(userDetails?.id ,closeModal)}}
          btnText={"Yes"}
        >
          <h2>Confirmation Box</h2>
          <p>
          {`Are you sure you want to remove ${userDetails?.name} as beneficiary?`}
          </p>
        </Modal>
        }
    </div>
  );
};

export default BeneficiaryList;
