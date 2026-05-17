
"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const photoUrl = formData.photoUrl || '/bitmap_7.jpg';
  
  const getGenderText = () => {
    const hindi = formData.gender === 'Female' ? 'महिला' : formData.gender === 'Male' ? 'पुरुष' : 'अन्य';
    const english = formData.gender === 'Female' ? 'Female' : formData.gender === 'Male' ? 'Male' : 'Other';
    return `लिंग / Gender: ${hindi} / ${english}`;
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
    return formData.age || '...';
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
        
        .card-row { margin: 0 auto; padding: 0; position: relative; width: 100%; display: flex; justify-content: center; align-items: flex-start; gap: 30px; }
        
        .front-card-wrapper { height: 310px; position: relative; width: 492px; overflow: hidden; }
        .front-card { height: 100%; padding: 35px 18px 1px; width: 100%; background: url(/bitmap.jpg) no-repeat; background-size: cover; position: relative; }
        
        .inner-row { margin: 0 auto; position: relative; width: 450px; display: flex; justify-content: space-between; }
        .details-col { margin: 55px 0 0; position: relative; width: 331px; }
        .epic-no { margin: 0 0 10px 6px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 16px; font-weight: bold; }
        .bio-row { margin: 12px 0 0; position: relative; display: flex; }
        
        .voter-photo { margin: -15px 12px 0 0; width: 120px; height: 162px; object-fit: cover; border: 1px solid #000; }
        
        .voter-data { position: relative; width: 199px; display: flex; flex-direction: column; gap: 6px; margin-top: 5px; }
        .voter-name { font-family: 'Noto Sans', sans-serif; font-size: 13px; font-weight: 500; line-height: 1.4; }
        .relative-name { margin: 3px 0 0 0; font-size: 13px; font-weight: 500; line-height: 1.4; }
        
        .label-text { font-family: 'Noto Sans', sans-serif; font-size: 11px; font-weight: 600; line-height: 1.2; margin-top: 4px; }
        
        .vertical-text-wrapper { margin: 40px 2px 0 0; padding: 0 2px 5px; position: relative; width: 40px; background: url(/bitmap_8.png) no-repeat center bottom; display: flex; align-items: center; }
        .vertical-epic { display: block; margin: 0 auto; }
        
        .back-card-wrapper { height: 310px; position: relative; width: 493px; overflow: hidden; }
        .back-card { height: 100%; padding: 15px 0 4px; width: 100%; background: url(/bitmap_2.png) no-repeat; background-size: cover; position: relative; }
        .back-inner-row { left: 10px; margin: 0 auto; position: relative; width: 470px; display: flex; gap: 20px; }
        .qr-col { margin: 4px 0 0; position: relative; width: 142px; display: flex; flex-direction: column; align-items: center; }
        .qr-holder { margin: 9px 0 0; padding: 13px 0; position: relative; width: 142px; background: url(/path_51.png) no-repeat; background-size: contain; display: flex; align-items: center; justify-content: center; }
        .qr-caption { margin: 5px 0 0; font-size: 9px; text-align: center; }
        .address-col { position: relative; width: 308px; }
        .address-text { font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; line-height: 1.4; }
        .ero-text { margin: 53px 0 0; font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; line-height: 1.4; }
        
        .footer-epic { position: absolute; bottom: 50px; left: 44px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; }
        .footer-row { position: absolute; bottom: 15px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; }
        .footer-link { font-size: 10px; }

        .dotted-line { border-left: 2px dotted #CBD5E1; height: 350px; margin: 0 10px; }

        @media print {
          .voter-preview-container { width: 100%; }
          .dotted-line { display: none; }
        }
      `}</style>

      <div className="card-row">
        <div className="front-card-wrapper">
          <div className="front-card">
            <div className="inner-row">
              <div className="details-col">
                <p className="epic-no">{formData.epicNo || '...'}</p>
                <div className="bio-row">
                  <img className="voter-photo" src={photoUrl} alt="Voter" />
                  <div className="voter-data">
                    <p className="voter-name">नाम: {formData.nameLocal || '...'}<br /><strong>Name: {formData.name || '...'}</strong></p>
                    <p className="relative-name"><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong><br />{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                    
                    <div className="label-text">{getGenderText()}</div>
                    <div className="label-text">जन्मतिथि/ आयु: Date of Birth / Age: {getDobOrAgeText()}</div>
                  </div>
                </div>
              </div>
              <div className="vertical-text-wrapper">
                <img className="vertical-epic" src="/up_31_153_006339.png" alt="" width="6" height="59" />
              </div>
            </div>
          </div>
        </div>

        <div className="dotted-line no-print"></div>

        <div className="back-card-wrapper">
          <div className="back-card">
            <div className="back-inner-row">
              <div className="qr-col">
                <img src="/bitmap_9.png" alt="Gov" width="60" height="36" />
                <div className="qr-holder">
                  <QRCodeSVG value={formData.epicNo || 'N/A'} size={110} />
                </div>
                <p className="qr-caption">Scan By VHA/BLO App</p>
              </div>
              <div className="address-col">
                <p className="address-text">पता: {formData.addressLocal || '...'}<br /><strong>Address: {formData.address || '...'}</strong></p>
                <div className="ero-section">
                  <p className="ero-text">निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}<br /><strong>Electoral Registration Officer, {formData.assemblyConstituency || '...'}</strong></p>
                </div>
              </div>
            </div>
            <p className="footer-epic">{formData.epicNo}</p>
            <div className="footer-row">
              <div className="flex items-center gap-2">
                <img src="/bitmap_10.png" alt="" width="16" height="16" />
                <span className="footer-link">1950</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/bitmap_11.png" alt="" width="17" height="16" />
                <span className="footer-link">https://voters.eci.gov.in/</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
