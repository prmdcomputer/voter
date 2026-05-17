
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
    return formData.age || '55';
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
        
        .front-card-wrapper { height: 320px; position: relative; width: 500px; overflow: hidden; border: 1px solid #ccc; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .front-card { height: 100%; width: 100%; background: url(/bitmap.jpg) no-repeat; background-size: 100% 100%; position: relative; padding: 10px; box-sizing: border-box; }
        
        .card-header { display: flex; justify-content: space-between; align-items: center; padding: 5px 10px 0; }
        .emblem { width: 35px; height: auto; }
        .header-text { text-align: center; flex: 1; }
        .header-text h1 { margin: 0; font-size: 16px; font-weight: 800; line-height: 1.2; }
        .header-text h2 { margin: 0; font-size: 15px; font-weight: 700; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 2px; }
        .logo-right { width: 45px; height: auto; }

        .front-body { display: flex; margin-top: 10px; padding: 0 10px; position: relative; }
        .epic-no-label { position: absolute; top: -15px; left: 10px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 15px; font-weight: bold; }
        
        .photo-section { width: 110px; height: 145px; border: 1px solid #000; margin-top: 5px; overflow: hidden; background: #fff; z-index: 10; }
        .voter-photo { width: 100%; height: 100%; object-fit: cover; }
        
        .data-section { flex: 1; padding-left: 15px; margin-top: 15px; font-size: 12px; line-height: 1.4; }
        .data-item { margin-bottom: 4px; }
        .data-item strong { font-weight: 700; }

        .right-side-decor { position: absolute; right: 5px; top: 15px; display: flex; flex-direction: column; align-items: center; gap: 50px; }
        .vertical-epic { width: 8px; height: auto; opacity: 0.6; }
        .ghost-img-container { width: 45px; height: 55px; border: 1px solid #ccc; filter: grayscale(100%) contrast(120%); opacity: 0.8; overflow: hidden; }
        .ghost-img { width: 100%; height: 100%; object-fit: cover; }

        .footer-banner { position: absolute; bottom: 8px; width: 100%; text-align: center; font-size: 13px; font-weight: 600; }

        /* BACK CARD */
        .back-card-wrapper { height: 320px; position: relative; width: 500px; overflow: hidden; border: 1px solid #ccc; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .back-card { height: 100%; width: 100%; background: url(/bitmap_2.png) no-repeat; background-size: 100% 100%; position: relative; box-sizing: border-box; }
        
        .back-content { display: flex; padding: 15px 15px 0; }
        .qr-side { width: 160px; display: flex; flex-direction: column; align-items: center; margin-top: 10px; }
        .signature-box { align-self: flex-start; margin-left: 20px; margin-bottom: 10px; }
        .signature-img { height: 25px; width: auto; }
        .qr-box { padding: 8px; background: #fff; display: flex; align-items: center; justify-content: center; margin-bottom: 5px; border: 1px solid #eee; }
        .qr-caption { font-size: 9px; color: #555; margin-bottom: 10px; }
        .back-epic { font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; font-weight: bold; }

        .info-side { flex: 1; padding-left: 20px; margin-top: 10px; font-size: 13px; }
        .address-box { margin-bottom: 30px; }
        .ero-box { line-height: 1.4; }
        .label-b { font-weight: bold; }

        .back-footer { position: absolute; bottom: 10px; width: 100%; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
        .footer-icon-row { display: flex; align-items: center; gap: 5px; }
        .red-line { position: absolute; bottom: 35px; left: 0; width: 100%; height: 2px; background: #c00; }

        .dotted-line { border-left: 2px dotted #CBD5E1; height: 320px; margin: 0; }

        @media print {
          .voter-preview-container { width: 100%; }
          .dotted-line { display: none; }
          .front-card-wrapper, .back-card-wrapper { border: none; box-shadow: none; }
        }
      `}</style>

      <div className="card-row">
        {/* FRONT CARD */}
        <div className="front-card-wrapper">
          <div className="front-card">
            <div className="card-header">
              <img src="/bitmap_9.png" alt="Emblem" className="emblem" />
              <div className="header-text">
                <h1>भारत निर्वाचन आयोग</h1>
                <h2>ELECTION COMMISSION OF INDIA</h2>
              </div>
              <img src="/bitmap_10.png" alt="Logo" className="logo-right" />
            </div>

            <div className="front-body">
              <p className="epic-no-label">{formData.epicNo || 'UAF3743325'}</p>
              
              <div className="photo-section">
                <img className="voter-photo" src={photoUrl} alt="Voter" />
              </div>

              <div className="data-section">
                <div className="data-item">नाम: {formData.nameLocal || 'Uttar Pradesh'}</div>
                <div className="data-item"><span className="label-b">Name: </span>{formData.name || 'suraj'}</div>
                <div className="data-item">पिता का नाम: {formData.fatherHusbandNameLocal || 'Uttar Pradesh'}</div>
                <div className="data-item"><span className="label-b">Father's Name: </span>{formData.fatherHusbandName || 'hdgdfg'}</div>
                <div className="data-item">{getGenderText()}</div>
                <div className="data-item">जन्मतिथि/ आयु: Date of Birth / Age: {getDobOrAgeText()}</div>
              </div>

              <div className="right-side-decor">
                <img src="/up_31_153_006339.png" alt="" className="vertical-epic" />
                <div className="ghost-img-container">
                  <img src={photoUrl} alt="" className="ghost-img" />
                </div>
              </div>
            </div>

            <div className="footer-banner">
              e-Electors Photo Identity Card - ई-निर्वाचक फोटो पहचान पत्र
            </div>
          </div>
        </div>

        <div className="dotted-line no-print"></div>

        {/* BACK CARD */}
        <div className="back-card-wrapper">
          <div className="back-card">
            <div className="back-content">
              <div className="qr-side">
                <div className="signature-box">
                  <img src="/bitmap_11.png" alt="Sign" className="signature-img" />
                </div>
                <div className="qr-box">
                  <QRCodeSVG value={formData.epicNo || 'UAF3743325'} size={100} />
                </div>
                <p className="qr-caption">Scan By VHA/BLO App</p>
                <p className="back-epic">{formData.epicNo || 'UAF3743325'}</p>
              </div>

              <div className="info-side">
                <div className="address-box">
                  <p>पता: {formData.addressLocal || 'jkgbhjgkh'}</p>
                  <p><span className="label-b">Address: </span>{formData.address || 'bhikharipur'}</p>
                </div>
                <div className="ero-box">
                  <p>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || 'kjghjgj'}</p>
                  <p><span className="label-b">Electoral Registration Officer, </span>{formData.assemblyConstituency || 'hjhkhk'}</p>
                </div>
              </div>
            </div>
            
            <div className="red-line"></div>
            
            <div className="back-footer">
              <div className="footer-icon-row">
                <img src="/bitmap_10.png" alt="" width="16" />
                <span>1950</span>
              </div>
              <div className="footer-icon-row">
                <img src="/bitmap_11.png" alt="" width="16" />
                <span>https://voters.eci.gov.in/</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
