
"use client";

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const [downloadDate, setDownloadDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    setDownloadDate(`${dd}-${mm}-${yyyy}`);
  }, []);

  const photoUrl = formData.photoUrl || 'https://picsum.photos/seed/voter1/200/250';
  
  const getGenderText = () => {
    const isFemale = formData.gender === 'Female';
    const isMale = formData.gender === 'Male';
    const hindi = isFemale ? 'महिला' : isMale ? 'पुरुष' : 'अन्य';
    const english = isFemale ? 'Female' : isMale ? 'Male' : 'Other';
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

  const relationLabelHindi = formData.relation === 'Husband' ? 'पति का नाम' : 
                            formData.relation === 'Mother' ? 'माता का नाम' : 'पिता का नाम';
  const relationLabelEnglish = formData.relation === 'Husband' ? "Husband's Name" : 
                               formData.relation === 'Mother' ? "Mother's Name" : "Father's Name";

  return (
    <div className="voter-preview-container print:m-0">
      <style jsx>{`
        .voter-preview-container {
          background: transparent;
          color: #000;
          font-family: 'Noto Sans', 'Inter', Arial, sans-serif;
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
        }
        
        .card-row { 
          display: flex; 
          justify-content: center; 
          align-items: flex-start; 
          gap: 40px; 
          width: 100%;
        }
        
        /* CARD BASE */
        .card-wrapper { 
          height: 320px; 
          width: 500px; 
          position: relative; 
          background: #fff; 
          border: 1px solid #000;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        /* BACKGROUND DECORATION SIMULATION */
        .card-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.15;
          pointer-events: none;
          background: 
            radial-gradient(circle at 0% 0%, #ff9933 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, #128807 0%, transparent 50%);
        }

        /* FRONT CARD ELEMENTS */
        .header {
          position: absolute;
          top: 5px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          z-index: 10;
        }
        .eci-logo { width: 35px; height: 35px; object-fit: contain; }
        .header-text { text-align: center; flex: 1; }
        .header-hindi { font-weight: 800; font-size: 16px; margin-bottom: -4px; }
        .header-english { font-weight: 800; font-size: 14px; border-top: 1.5px solid #000; padding-top: 2px; }
        .tricolor-logo { width: 40px; height: 30px; object-fit: contain; }

        .epic-no-display {
          position: absolute;
          top: 65px;
          left: 20px;
          color: #800000;
          font-weight: 900;
          font-size: 17px;
          z-index: 10;
        }

        .main-photo-box {
          position: absolute;
          top: 95px;
          left: 20px;
          width: 115px;
          height: 145px;
          border: 1px solid #000;
          background: #fff;
          z-index: 10;
        }
        .main-photo { width: 100%; height: 100%; object-fit: cover; }

        .info-data-box {
          position: absolute;
          top: 95px;
          left: 145px;
          z-index: 10;
          font-size: 12px;
          line-height: 1.3;
          width: 280px;
        }
        .data-row { margin-bottom: 4px; }
        .data-label-hindi { display: block; font-weight: 700; color: #333; }
        .data-label-eng { font-weight: 700; color: #000; }
        .data-value { font-weight: 500; }

        .ghost-container {
          position: absolute;
          bottom: 35px;
          right: 35px;
          width: 45px;
          height: 55px;
          border: 0.5px solid #ccc;
          filter: grayscale(100%) opacity(0.6);
          z-index: 5;
        }
        .vertical-epic {
          position: absolute;
          right: 15px;
          top: 100px;
          writing-mode: vertical-rl;
          font-size: 7px;
          color: #999;
          z-index: 5;
        }

        .front-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #f8f9fa;
          border-top: 1px solid #ddd;
          text-align: center;
          padding: 4px 0;
          font-size: 10px;
          font-weight: 600;
          z-index: 10;
        }

        /* BACK CARD ELEMENTS */
        .back-qr-container {
          position: absolute;
          top: 45px;
          left: 25px;
          text-align: center;
          z-index: 10;
        }
        .qr-box { padding: 5px; background: #fff; border: 1px solid #eee; }
        .qr-caption { font-size: 8px; margin-top: 4px; color: #800000; font-weight: 700; }
        .back-epic-label { font-weight: 800; font-size: 13px; margin-top: 5px; }

        .back-details-container {
          position: absolute;
          top: 20px;
          left: 185px;
          width: 290px;
          z-index: 10;
          font-size: 11.5px;
          line-height: 1.35;
        }
        .address-box { margin-bottom: 25px; }
        .ero-box { margin-bottom: 15px; }
        .download-date { font-weight: 700; font-size: 13px; }

        .back-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 22px;
          border-top: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 10px;
          z-index: 10;
          font-size: 9px;
          font-weight: 700;
        }
        .footer-line {
          position: absolute;
          bottom: 2px;
          left: 10px;
          right: 10px;
          height: 2px;
          background: #e11d48;
          z-index: 11;
        }

        .divider { width: 1px; border-left: 2px dashed #CBD5E1; height: 320px; }

        @media print {
          .divider { display: none; }
          .card-row { gap: 10mm; }
          .card-wrapper { box-shadow: none; border: 1px solid #000; }
          .no-print { display: none; }
        }
      `}</style>

      <div className="card-row">
        {/* FRONT CARD */}
        <div className="card-wrapper">
          <div className="card-bg"></div>
          
          <div className="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Election_Commission_of_India_Logo.svg/1200px-Election_Commission_of_India_Logo.svg.png" className="eci-logo" alt="ECI" />
            <div className="header-text">
              <div className="header-hindi">भारत निर्वाचन आयोग</div>
              <div className="header-english">ELECTION COMMISSION OF INDIA</div>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Election_Commission_of_India_symbol.svg/1200px-Election_Commission_of_India_symbol.svg.png" className="tricolor-logo" alt="Logo" />
          </div>

          <div className="epic-no-display">{formData.epicNo || 'UP/31/153/0063398'}</div>

          <div className="main-photo-box">
            <img src={photoUrl} className="main-photo" alt="Voter" />
          </div>

          <div className="info-data-box">
            <div className="data-row">
              <span className="data-label-hindi">नाम: {formData.nameLocal || 'सीतापती'}</span>
              <span className="data-label-eng">Name: </span>
              <span className="data-value">{formData.name || 'Sitapti'}</span>
            </div>
            <div className="data-row">
              <span className="data-label-hindi">{relationLabelHindi}: {formData.fatherHusbandNameLocal || 'रामनरायन'}</span>
              <span className="data-label-eng">{relationLabelEnglish}: </span>
              <span className="data-value">{formData.fatherHusbandName || 'Ramnarayan'}</span>
            </div>
            <div className="data-row">
              <span className="data-label-eng">लिंग / Gender: </span>
              <span className="data-value">{getGenderText()}</span>
            </div>
            <div className="data-row">
              <span className="data-label-hindi">जन्म तिथि / आयु:</span>
              <span className="data-label-eng">Date of Birth / Age: </span>
              <span className="data-value">{getDobOrAgeText()}</span>
            </div>
          </div>

          <div className="ghost-container">
            <img src={photoUrl} className="main-photo" alt="Ghost" />
          </div>
          <div className="vertical-epic">{formData.epicNo || 'UP/31/153/0063398'}</div>

          <div className="front-footer">
            e-Electors Photo Identity Card - ई-निर्वाचक फोटो पहचान पत्र
          </div>
        </div>

        <div className="divider no-print"></div>

        {/* BACK CARD */}
        <div className="card-wrapper">
          <div className="card-bg"></div>
          
          <div className="back-qr-container">
            <div className="qr-box">
              <QRCodeSVG value={formData.epicNo || 'UP/31/153/0063398'} size={110} />
            </div>
            <div className="qr-caption">Scan By VHA/BLO App</div>
            <div className="back-epic-label">{formData.epicNo || 'UP/31/153/0063398'}</div>
          </div>

          <div className="back-details-container">
            <div className="address-box">
              <div>पता: {formData.addressLocal || '65, त्रिकोलिया-२, त्रिकोलिया, पयागपुर, बहराइच, उत्तर प्रदेश - 271871'}</div>
              <div><span className="data-label-eng">Address: </span>{formData.address || '65, TRIKOLIYA-2, TRIKOLIYA, PAYAGPUR, BAHRAICH, UTTAR PRADESH - 271871'}</div>
            </div>

            <div className="ero-box">
              <div>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '286 - बहराइच'}</div>
              <div><span className="data-label-eng">Electoral Registration Officer, </span>{formData.assemblyConstituency || '286 - Bahraich'}</div>
            </div>

            <div className="download-date">
              Download Date -: {downloadDate}
            </div>
          </div>

          <div className="back-footer">
            <div className="flex items-center gap-1">📞 1950</div>
            <div className="flex items-center gap-1">🌐 https://ceouttarpradesh.nic.in/</div>
          </div>
          <div className="footer-line"></div>
        </div>
      </div>
    </div>
  );
}
