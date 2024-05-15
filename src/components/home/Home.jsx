import React from 'react';
import './Home.css'

const Home = ({ goToManageBeneficiaries }) => {
  return (
    <div className='home-container'>
      <div className='home-text'>
      <h1>Welcome to Next Gen Bank</h1>
      <h1>Manage Beneficiaries</h1>
      </div>
      
      <button id="myBtn" onClick={goToManageBeneficiaries}>Manage Beneficiaries</button>
    </div>
  )
};

export default Home;
