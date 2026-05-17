
"use client";

import React from 'react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const photoUrl = formData.photoUrl || '/bitmap_7.jpg';
  
  const getGenderText = () => {
    if (formData.gender === 'Female') return 'लिंग / Gender: महिला / Female';
    if (formData.gender === 'Male') return 'लिंग / Gender: पुरुष / Male';
    return 'लिंग / Gender: अन्य / Other';
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
    <div className="voter-preview-page print:m-0">
      <style jsx>{`
        .voter-preview-page {
          background: transparent;
          color: #000;
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          width: 1155px;
          margin: 0 auto;
          position: relative;
          padding-top: 20px;
          padding-bottom: 20px;
        }
        
        .row { margin: 0 auto; padding: 0; position: relative; width: 1155px; display: flex; justify-content: center; gap: 47px; }
        
        .wrapper-3 { height: 310px; position: relative; width: 492px; border: 1px solid #000; overflow: hidden; }
        .col-4 { height: 100%; padding: 19px 18px 1px; width: 100%; background: url(/bitmap.jpg) no-repeat; background-size: cover; position: relative; }
        
        .text-2 { margin: 0 auto; width: 344px; font-size: 18px; font-weight: bold; text-align: center; }
        .text-style-3 { font-family: 'Noto Sans', sans-serif; line-height: 22px; }
        .text-style-4 { line-height: 25.3px; }
        
        .row-4 { margin: 10px auto 0; position: relative; width: 450px; display: flex; justify-content: space-between; }
        .col-13 { margin: 17px 0 0; position: relative; width: 331px; }
        .text-3 { margin: 0 0 0 6px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 16px; font-weight: bold; }
        .row-10 { margin: 7px 0 0; position: relative; display: flex; }
        .bitmap { margin: 4px 12px 0 0; width: 120px; height: 162px; object-fit: cover; border: 1px solid #000; }
        .col-18 { position: relative; width: 199px; display: flex; flex-direction: column; gap: 4px; }
        .text-4 { font-family: 'Noto Sans', sans-serif; font-size: 13px; font-weight: bold; line-height: 1.4; }
        .text-5 { margin: 3px 0 0 1px; font-size: 13px; font-weight: bold; line-height: 1.4; }
        
        .dynamic-label { font-family: 'Noto Sans', sans-serif; font-size: 11px; font-weight: 600; line-height: 1.2; margin-top: 4px; }
        
        .wrapper-17 { margin: 0 2px 0 0; padding: 0 2px 5px; position: relative; width: 40px; background: url(/bitmap_8.png) no-repeat center bottom; display: flex; align-items: center; }
        .text-8 { display: block; margin: 0 auto; }
        
        .wrapper-4 { height: 310px; position: relative; width: 493px; border: 1px solid #000; overflow: hidden; }
        .col-5 { height: 100%; padding: 15px 0 4px; width: 100%; background: url(/bitmap_2.png) no-repeat; background-size: cover; position: relative; }
        .row-6 { left: 10px; margin: 0 auto; position: relative; width: 470px; display: flex; gap: 20px; }
        .col-11 { margin: 4px 0 0; position: relative; width: 142px; display: flex; flex-direction: column; align-items: center; }
        .path-51-holder { margin: 9px 0 0; padding: 13px 0; position: relative; width: 142px; background: url(/path_51.png) no-repeat; background-size: contain; display: flex; align-items: center; justify-content: center; }
        .text-11 { margin: 5px 0 0; font-size: 9px; text-align: center; }
        .col-12 { position: relative; width: 308px; }
        .text-12 { font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; line-height: 1.4; }
        .text-13 { margin: 53px 0 0; font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; line-height: 1.4; }
        
        .text-15 { position: absolute; bottom: 50px; left: 44px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; }
        .row-3 { position: absolute; bottom: 15px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; }
        .text-16, .text-17 { font-size: 10px; }

        @media print {
          .voter-preview-page { padding: 0; width: 100%; }
        }
      `}</style>

      <div className="row group">
        {/* Front Card */}
        <div className="wrapper-3">
          <div className="col-4">
            <p className="text-2">
              <strong className="text-style-3">भारत िनवार्चन आयोग</strong><br />
              <span className="text-style-4">ELECTION COMMISSION OF INDIA</span>
            </p>
            <div className="row-4 group">
              <div className="col-13">
                <p className="text-3">{formData.epicNo || '...'}</p>
                <div className="row-10 group">
                  <img className="bitmap" src={photoUrl} alt="Voter" />
                  <div className="col-18">
                    <p className="text-4">नाम: {formData.nameLocal || '...'}<br /><strong>Name: {formData.name || '...'}</strong></p>
                    <p className="text-5"><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong><br />{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                    
                    <div className="dynamic-label">{getGenderText()}</div>
                    <div className="dynamic-label">जन्मतिथि/ आयु: Date of Birth / Age: {getDobOrAgeText()}</div>
                  </div>
                </div>
              </div>
              <div className="wrapper-17">
                <img className="text-8" src="/up_31_153_006339.png" alt="" width="6" height="59" />
              </div>
            </div>
          </div>
        </div>

        <img src="/path_7.png" alt="" width="2" height="372" />

        {/* Back Card */}
        <div className="wrapper-4">
          <div className="col-5">
            <div className="row-6 group">
              <div className="col-11">
                <img src="/bitmap_9.png" alt="Gov" width="60" height="36" />
                <div className="path-51-holder">
                  <img src="/path_52.png" alt="QR" width="117" height="117" />
                </div>
                <p className="text-11">Scan By VHA/BLO App</p>
              </div>
              <div className="col-12">
                <p className="text-12">पता: {formData.addressLocal || '...'}<br /><strong>Address: {formData.address || '...'}</strong></p>
                <div className="mt-12">
                  <p className="text-13">निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}<br /><strong>Electoral Registration Officer, {formData.assemblyConstituency || '...'}</strong></p>
                </div>
              </div>
            </div>
            <p className="text-15">{formData.epicNo}</p>
            <div className="row-3 group">
              <div className="flex items-center gap-2">
                <img src="/bitmap_10.png" alt="" width="16" height="16" />
                <span className="text-16">1950</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/bitmap_11.png" alt="" width="17" height="16" />
                <span className="text-17">https://voters.eci.gov.in/</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
