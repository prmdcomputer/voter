
"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const photoUrl = formData.photoUrl || 'https://picsum.photos/seed/voter1/200/250';
  
  const getGenderText = () => {
    const hindi = formData.gender === 'Female' ? 'महिला' : formData.gender === 'Male' ? 'पुरुष' : 'अन्य';
    const english = formData.gender === 'Female' ? 'Female' : formData.gender === 'Male' ? 'Male' : 'Other';
    return `${hindi} / ${english}`;
  };

  const getDobOrAgeText = () => {
    if (formData.inputMode === 'dob' && formData.dob) {
      const date = new Date(formData.dob);
      if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      return formData.dob;
    }
    return formData.age || '24';
  };

  return (
    <div className="voter-preview-container print:m-0">
      <style jsx>{`
        .voter-preview-container {
          background: transparent;
          color: #000;
          font-family: 'Noto Sans', Arial, sans-serif;
          width: 1050px;
          margin: 0 auto;
          position: relative;
        }
        
        .card-row { margin: 0 auto; padding: 0; position: relative; width: 100%; display: flex; justify-content: center; align-items: flex-start; gap: 40px; }
        
        /* FRONT CARD */
        .front-card-wrapper { height: 320px; position: relative; width: 500px; overflow: hidden; border: 1px solid #eee; }
        .front-card { height: 100%; width: 100%; background: url(/bitmap.jpg) no-repeat; background-size: 100% 100%; position: relative; }
        
        .front-epic-no {
          position: absolute;
          top: 62px;
          left: 15px;
          font-family: 'Arial Rounded MT Bold', sans-serif;
          font-size: 16px;
          font-weight: bold;
          z-index: 20;
        }

        .photo-section { 
          position: absolute;
          top: 85px;
          left: 15px;
          width: 115px; 
          height: 145px; 
          border: 1px solid #000; 
          overflow: hidden; 
          background: #fff; 
        }
        .voter-photo { width: 100%; height: 100%; object-fit: cover; }
        
        .data-section { 
          position: absolute;
          top: 80px;
          left: 145px;
          font-size: 13px; 
          line-height: 1.5;
          color: #000;
        }
        .data-item { margin-bottom: 2px; }
        .label-b { font-weight: 800; }

        .ghost-img-container { 
          position: absolute;
          bottom: 25px;
          right: 25px;
          width: 45px; 
          height: 55px; 
          border: 1px solid #ccc; 
          filter: grayscale(100%) contrast(120%); 
          opacity: 0.8; 
          overflow: hidden; 
        }
        .ghost-img { width: 100%; height: 100%; object-fit: cover; }

        .vertical-epic-text {
          position: absolute;
          right: 5px;
          top: 100px;
          writing-mode: vertical-rl;
          font-size: 8px;
          color: #666;
          opacity: 0.7;
        }

        /* BACK CARD */
        .back-card-wrapper { height: 320px; position: relative; width: 500px; overflow: hidden; border: 1px solid #eee; }
        .back-card { height: 100%; width: 100%; background: url(/bitmap_2.png) no-repeat; background-size: 100% 100%; position: relative; }
        
        .back-qr-section {
          position: absolute;
          top: 55px;
          left: 45px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .back-qr-box { 
          padding: 5px; 
          background: #fff; 
          border: 1px solid #eee; 
          margin-bottom: 5px;
        }
        .scan-caption { font-size: 9px; color: #555; margin-bottom: 2px; }
        .back-epic-id { font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; font-weight: bold; }

        .back-info-section {
          position: absolute;
          top: 15px;
          left: 180px;
          width: 300px;
          font-size: 13px;
          line-height: 1.4;
        }
        .address-section { margin-bottom: 20px; }
        .ero-section { margin-top: 20px; }

        .dotted-line { border-left: 2px dotted #CBD5E1; height: 320px; margin: 0; }

        @media print {
          .voter-preview-container { width: 100%; }
          .dotted-line { display: none; }
          .front-card-wrapper, .back-card-wrapper { border: none; }
        }
      `}</style>

      <div className="card-row">
        {/* FRONT CARD */}
        <div className="front-card-wrapper">
          <div className="front-card">
            <div className="front-epic-no">{formData.epicNo || 'UAF3743325'}</div>
            
            <div className="photo-section">
              <img className="voter-photo" src={photoUrl} alt="Voter" />
            </div>

            <div className="data-section">
              <div className="data-item">नाम: {formData.nameLocal || 'Uttar Pradesh'}</div>
              <div className="data-item"><span className="label-b">Name: </span>{formData.name || 'suraj'}</div>
              <div className="data-item">पिता का नाम: {formData.fatherHusbandNameLocal || 'Uttar Pradesh'}</div>
              <div className="data-item"><span className="label-b">Father's Name: </span>{formData.fatherHusbandName || 'hdgdfg'}</div>
              <div className="data-item"><span className="label-b">लिंग / Gender: </span>{getGenderText()}</div>
              <div className="data-item"><span className="label-b">जन्मतिथि/ आयु: Date of Birth / Age: </span>{getDobOrAgeText()}</div>
            </div>

            <div className="ghost-img-container">
              <img src={photoUrl} alt="" className="ghost-img" />
            </div>
            
            <div className="vertical-epic-text">
              {formData.epicNo || 'UAF3743325'}
            </div>
          </div>
        </div>

        <div className="dotted-line no-print"></div>

        {/* BACK CARD */}
        <div className="back-card-wrapper">
          <div className="back-card">
            <div className="back-qr-section">
              <div className="back-qr-box">
                <QRCodeSVG value={formData.epicNo || 'UAF3743325'} size={110} />
              </div>
              <p className="scan-caption">Scan By VHA/BLO App</p>
              <p className="back-epic-id">{formData.epicNo || 'UAF3743325'}</p>
            </div>

            <div className="back-info-section">
              <div className="address-section">
                <p>पता: {formData.addressLocal || 'hfgkfkhf'}</p>
                <p><span className="label-b">Address: </span>{formData.address || 'bhikharipur'}</p>
              </div>
              
              <div className="ero-section">
                <p>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || 'tdhdghh'}</p>
                <p><span className="label-b">Electoral Registration Officer, </span>{formData.assemblyConstituency || '8ghgdhdgd'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
