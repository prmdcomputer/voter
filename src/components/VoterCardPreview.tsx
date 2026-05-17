
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
    <div className="voter-preview-wrapper print:m-0">
      <style jsx>{`
        .voter-preview-wrapper {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          overflow: visible;
        }

        #background {
          left: 0px;
          top: 0px;
          position: relative;
          width: 2081px;
          height: 666px;
          overflow: hidden;
          z-index: 0;
          background: transparent;
          transform-origin: top left;
          transform: scale(var(--preview-scale, 0.45));
        }

        /* Front Card Background */
        #Layer14 {
          left: 9px;
          top: 24px;
          position: absolute;
          width: 1023px;
          height: 622px;
          z-index: 2;
          background-image: url('/Layer14.png');
          background-size: cover;
        }

        /* Back Card Background */
        #Layer15 {
          left: 1045px;
          top: 23px;
          position: absolute;
          width: 1010px;
          height: 620px;
          z-index: 3;
          background-image: url('/Layer15.png');
          background-size: cover;
        }

        /* Voter Photo (Front) */
        #Layer13 {
          left: 38px;
          top: 254px;
          position: absolute;
          width: 255px;
          height: 334px;
          z-index: 10;
          overflow: hidden;
          border: 1px solid #000;
        }
        #Layer13 img { width: 100%; height: 100%; object-fit: cover; }

        /* EPIC No (Front) */
        #Layer5 {
          left: 45px;
          top: 194px;
          position: absolute;
          width: 400px;
          height: 45px;
          z-index: 11;
          color: #800000;
          font-weight: 900;
          font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
          font-size: 34px;
        }

        /* Name Details (Front) */
        #Layer2 {
          left: 313px;
          top: 262px;
          position: absolute;
          width: 600px;
          height: 80px;
          z-index: 14;
          line-height: 1.2;
          color: #000;
        }
        .name-hindi { display: block; font-weight: 700; font-size: 28px; }
        .name-eng-label { font-weight: 700; font-size: 26px; }
        .name-eng-val { font-weight: 500; font-size: 26px; text-transform: uppercase; }

        /* Relation Details (Front) */
        #Layer3 {
          left: 311px;
          top: 349px;
          position: absolute;
          width: 600px;
          height: 85px;
          z-index: 13;
          line-height: 1.2;
          color: #000;
        }
        .rel-hindi { display: block; font-weight: 700; font-size: 28px; }
        .rel-eng-label { font-weight: 700; font-size: 26px; }
        .rel-eng-val { font-weight: 500; font-size: 26px; text-transform: uppercase; }

        /* Gender & Age/DOB (Front) */
        #Layer4 {
          left: 311px;
          top: 436px;
          position: absolute;
          width: 600px;
          height: 127px;
          z-index: 12;
          line-height: 1.4;
          color: #000;
        }
        .gender-row { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
        .dob-row-hindi { display: block; font-weight: 700; font-size: 26px; }
        .dob-row-eng { font-weight: 700; font-size: 26px; }
        .dob-val { font-weight: 500; }

        /* Ghost Image (Front) */
        #Layer6 {
          left: 874px;
          top: 186px;
          position: absolute;
          width: 89px;
          height: 110px;
          z-index: 10;
          filter: grayscale(100%) opacity(0.5);
          overflow: hidden;
        }
        #Layer6 img { width: 100%; height: 100%; object-fit: cover; }

        /* Vertical EPIC (Front) */
        #Layer7 {
          left: 958px;
          top: 177px;
          position: absolute;
          width: 25px;
          height: 250px;
          z-index: 10;
          writing-mode: vertical-rl;
          font-size: 16px;
          color: #666;
          font-weight: bold;
        }

        /* QR Code (Back) */
        #Layer8 {
          left: 1082px;
          top: 151px;
          position: absolute;
          width: 281px;
          height: 292px;
          z-index: 8;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 10px;
        }

        /* Address Block (Back) */
        #Layer9 {
          left: 1403px;
          top: 43px;
          position: absolute;
          width: 640px;
          height: auto;
          min-height: 150px;
          z-index: 10;
          font-size: 24px;
          line-height: 1.3;
          color: #000;
        }
        .addr-hindi { font-weight: 700; display: block; margin-bottom: 5px; }
        .addr-eng { font-weight: 500; display: block; }

        /* Download Date (Back) */
        #Layer11 {
          left: 1113px;
          top: 501px;
          position: absolute;
          width: 400px;
          height: 42px;
          z-index: 10;
          font-size: 26px;
          font-weight: 800;
          color: #000;
        }

        /* ERO & Bottom EPIC (Back) */
        #Layer12 {
          left: 1399px;
          top: 356px;
          position: absolute;
          width: 600px;
          height: auto;
          z-index: 10;
          font-size: 22px;
          line-height: 1.4;
          color: #000;
        }

        .epic-bottom {
           margin-top: 35px;
           color: #800000;
           font-weight: 900;
           font-size: 34px;
           letter-spacing: -1px;
           font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
        }

        @media screen and (max-width: 1024px) {
          .voter-preview-wrapper { --preview-scale: 0.4; }
        }
        @media screen and (max-width: 768px) {
          .voter-preview-wrapper { --preview-scale: 0.28; }
        }
        @media print {
          .voter-preview-wrapper { 
            transform: scale(1) !important; 
            max-width: none; 
            margin: 0;
          }
          #background {
             transform: scale(0.35);
          }
        }
      `}</style>

      <div id="background">
        {/* FRONT CARD SECTION */}
        <div id="Layer14" />
        <div id="Layer13">
          <img src={photoUrl} alt="Voter" />
        </div>

        <div id="Layer5">{formData.epicNo || 'UP/31/153/0063398'}</div>

        <div id="Layer2">
          <span className="name-hindi">नाम: {formData.nameLocal || 'सीतापती'}</span>
          <div>
            <span className="name-eng-label">Name: </span>
            <span className="name-eng-val">{formData.name || 'SITAPTI'}</span>
          </div>
        </div>

        <div id="Layer3">
          <span className="rel-hindi">{relationLabelHindi}: {formData.fatherHusbandNameLocal || 'रामनरायन'}</span>
          <div>
            <span className="rel-eng-label">{relationLabelEnglish}: </span>
            <span className="rel-eng-val">{formData.fatherHusbandName || 'RAMNARAYAN'}</span>
          </div>
        </div>

        <div id="Layer4">
          <div className="gender-row">लिंग / Gender: {getGenderText()}</div>
          <span className="dob-row-hindi">जन्म तिथि / आयु:</span>
          <div className="dob-row-eng">
            Date of Birth / Age: <span className="dob-val">{getDobOrAgeText()}</span>
          </div>
        </div>

        <div id="Layer6">
          <img src={photoUrl} alt="Ghost" />
        </div>

        <div id="Layer7">{formData.epicNo || 'UP/31/153/0063398'}</div>

        {/* BACK CARD SECTION */}
        <div id="Layer15" />
        <div id="Layer8">
          <QRCodeSVG value={formData.epicNo || 'UP/31/153/0063398'} size={260} />
        </div>

        <div id="Layer9">
          <span className="addr-hindi">पता: {formData.addressLocal || '65, त्रिकोलिया-२, त्रिकोलिया, पयागपुर, बहराइच, उत्तर प्रदेश - 271871'}</span>
          <span className="addr-eng"><span className="font-bold">Address: </span>{formData.address || '65, TRIKOLIYA-2, TRIKOLIYA, PAYAGPUR, BAHRAICH, UTTAR PRADESH - 271871'}</span>
        </div>

        <div id="Layer11">
          Download Date -: {downloadDate}
        </div>

        <div id="Layer12">
          <div className="font-bold">निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '286 - बहराइच'}</div>
          <div className="mt-1"><span className="font-bold">Electoral Registration Officer, </span>{formData.assemblyConstituency || '286 - Bahraich'}</div>
          
          <div className="epic-bottom">
            {formData.epicNo || 'UP/31/153/0063398'}
          </div>
        </div>
      </div>
    </div>
  );
}
