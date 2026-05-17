
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
        .front-card-wrapper { height: 320px; position: relative; width: 500px; overflow: hidden; border: 1px solid #ddd; }
        .front-card { height: 100%; width: 100%; background: #fff url(/bitmap.jpg) no-repeat; background-size: 100% 100%; position: relative; }
        
        .front-epic-no {
          position: absolute;
          top: 105px;
          left: 20px;
          font-family: 'Arial Black', sans-serif;
          font-size: 19px;
          font-weight: 900;
          z-index: 20;
          letter-spacing: -0.5px;
        }

        .photo-section { 
          position: absolute;
          top: 132px;
          left: 20px;
          width: 110px; 
          height: 140px; 
          border: 1px solid #000; 
          overflow: hidden; 
          background: #fff; 
        }
        .voter-photo { width: 100%; height: 100%; object-fit: cover; }
        
        .data-section { 
          position: absolute;
          top: 130px;
          left: 142px;
          font-size: 12.5px; 
          line-height: 1.45;
          color: #000;
          width: 330px;
        }
        .data-item { margin-bottom: 2px; }
        .label-b { font-weight: 800; }
        .label-hindi { display: block; margin-bottom: -1px; }

        .ghost-img-container { 
          position: absolute;
          bottom: 20px;
          right: 25px;
          width: 42px; 
          height: 52px; 
          border: 1px solid #aaa; 
          filter: grayscale(100%) contrast(110%); 
          opacity: 0.6; 
          overflow: hidden; 
        }
        .ghost-img { width: 100%; height: 100%; object-fit: cover; }

        .vertical-epic-text {
          position: absolute;
          right: 12px;
          top: 120px;
          writing-mode: vertical-rl;
          font-size: 7px;
          color: #aaa;
          opacity: 0.8;
          font-family: sans-serif;
        }

        /* BACK CARD */
        .back-card-wrapper { height: 320px; position: relative; width: 500px; overflow: hidden; border: 1px solid #ddd; }
        .back-card { height: 100%; width: 100%; background: #fff url(/bitmap_2.png) no-repeat; background-size: 100% 100%; position: relative; }
        
        .back-qr-section {
          position: absolute;
          top: 60px;
          left: 45px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 130px;
        }
        .back-qr-box { 
          padding: 3px; 
          background: #fff; 
          border: 1px solid #eee; 
          margin-bottom: 4px;
        }
        .scan-caption { font-size: 9px; color: #888; margin-bottom: 2px; }
        .back-epic-id { font-family: 'Arial Black', sans-serif; font-size: 14px; font-weight: 900; }

        .back-info-section {
          position: absolute;
          top: 25px;
          left: 195px;
          width: 280px;
          font-size: 13px;
          line-height: 1.4;
        }
        .address-section { margin-bottom: 25px; }
        .ero-section { margin-top: 15px; }

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
              <div className="data-item">
                <span className="label-hindi">नाम: {formData.nameLocal || 'Uttar Pradesh'}</span>
                <span className="label-b">Name: </span>{formData.name || 'suraj'}
              </div>
              <div className="data-item">
                <span className="label-hindi">पिता का नाम: {formData.fatherHusbandNameLocal || 'Uttar Pradesh'}</span>
                <span className="label-b">Father's Name: </span>{formData.fatherHusbandName || 'hdgdfg'}
              </div>
              <div className="data-item">
                <span className="label-b">लिंग / Gender: </span>{getGenderText()}
              </div>
              <div className="data-item">
                <span className="label-b">जन्मतिथि/ आयु: Date of Birth / Age: </span>{getDobOrAgeText()}
              </div>
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
                <QRCodeSVG value={formData.epicNo || 'UAF3743325'} size={115} />
              </div>
              <p className="scan-caption">Scan By VHA/BLO App</p>
              <p className="back-epic-id">{formData.epicNo || 'UAF3743325'}</p>
            </div>

            <div className="back-info-section">
              <div className="address-section">
                <p>पता: {formData.addressLocal || 'hdjdhg'}</p>
                <p><span className="label-b">Address: </span>{formData.address || 'bhikharipur'}</p>
              </div>
              
              <div className="ero-section">
                <p>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || 'gfjfj'}</p>
                <p><span className="label-b">Electoral Registration Officer, </span>{formData.assemblyConstituency || 'hjgjkghj'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
