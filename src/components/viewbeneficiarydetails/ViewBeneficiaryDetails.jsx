// ViewBeneficiaryDetails.js
import React from "react";
import { useSelector } from "react-redux";
import "./ViewBeneficiaryDetails.css";
import noDataImage from '../../assets/nodata.png'

const ViewBeneficiaryDetails = () => {
  const beneficiary = useSelector((state) => state.beneficiaries?.beneficiary);

  if (!beneficiary) {
    return <div className='failed-section'>
    <img src={noDataImage} alt="My Image" />
   </div>;;
  }

  return (
      <div className="container">
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: "20px 15px",
            flex: 1,
            position: "relative",
            display: "flex",
            gap: "15px",

          }}
        >
          <p
            style={{
              position: "absolute",
              top: "-35px",
              left: 20,
              backgroundColor: "gray",
              border: "unset",
              fontSize:'13px',
              padding:"10px 12px",
              borderRadius:"50px",
              color:"#E7DFD1",
              fontWeight:700
            }}
          >
            Beneficiary Details
          </p>

          <div style={{ flex: 1 }}>
            <div className={"help_text"}>Name</div>
            <div className={"text_bold"}>{beneficiary.name}</div>
            <div className={"help_text"} style={{ marginTop: 10 }}>
              Bank Name
            </div>
            <div className={"text_bold"}>
            {beneficiary.bankName}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div className={"help_text"}>Account Number</div>
            <div className={"text_bold"}>
            {beneficiary.accountNumber}
            </div>
            <div className={"help_text"} style={{ marginTop: 10 }}>
              Account Type
            </div>
            <div className={"text_bold"}>
            {beneficiary.accountType}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ViewBeneficiaryDetails;
