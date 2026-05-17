"use client";

import React from 'react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const photoUrl = formData.photoUrl || '/bitmap_7.jpg';
  
  const today = new Date();
  const downloadDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  return (
    <div className="voter-preview-page print:m-0">
      <style jsx>{`
        .voter-preview-page {
          background: #fff;
          color: #000;
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          width: 1155px;
          margin: 0 auto;
          position: relative;
          padding-top: 43px;
          padding-bottom: 40px;
        }
        .l-constrained { margin: 0 auto; position: relative; width: 1155px; }
        .header-text { margin: 0 auto; width: 458px; font-size: 24px; font-weight: bold; text-align: center; line-height: 1.2; }
        .path-2 { display: block; height: 4px; margin: 13px auto 0; position: relative; width: 600px; background-color: #000; }
        .path-8 { height: 1px; margin: 24px auto 0; width: 100%; border-bottom: 1px dashed #ccc; }
        
        .card-row { margin: 17px auto 0; padding: 0 35px 0 38px; display: flex; gap: 47px; justify-content: center; }
        
        .card-wrapper { height: 310px; position: relative; width: 492px; margin-top: 31px; border: 1px solid #000; overflow: hidden; }
        .card-front { background: url('/bitmap.jpg') no-repeat; background-size: cover; height: 100%; padding: 19px 18px 1px; }
        .card-back { background: url('/bitmap_2.png') no-repeat; background-size: cover; height: 100%; padding: 15px 10px; }

        .path-42 { display: block; margin: 20px auto 0; }
        .eci-title { margin: 10px auto 0; width: 344px; text-align: center; font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: bold; }
        
        .front-content { display: flex; gap: 10px; margin-top: 15px; }
        .epic-id { font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 16px; font-weight: bold; }
        
        .portrait-section { display: flex; gap: 12px; margin-top: 7px; }
        .portrait-img { width: 120px; height: 162px; border: 1px solid #000; object-fit: cover; }
        .voter-info { flex: 1; display: flex; flex-direction: column; gap: 6px; font-family: 'Noto Sans', sans-serif; font-size: 13px; font-weight: bold; }
        
        .footer-banner { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 370px; }

        .back-row { display: flex; gap: 20px; }
        .back-left { width: 142px; display: flex; flex-direction: column; align-items: center; }
        .qr-holder { width: 142px; height: 142px; background: url('/path_51.png') no-repeat; display: flex; align-items: center; justify-content: center; margin-top: 9px; }
        .back-right { flex: 1; font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; line-height: 1.4; }
        
        .download-date { position: absolute; bottom: 58px; right: 20px; font-size: 14px; font-weight: bold; }
        .epic-bottom { position: absolute; bottom: 50px; left: 44px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; }
        
        .bottom-links { position: absolute; bottom: 10px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; }

        .info-sheet { margin-top: 30px; }
        .sheet-divider { display: flex; height: 5px; }
        .divider-left { width: 341px; background-color: #b04757; }
        .divider-right { flex: 1; background-color: #b04757; }
        
        .sheet-content { display: flex; padding: 41px 50px; gap: 40px; }
        .sheet-left { width: 256px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .sheet-right { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        
        .info-item { display: flex; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; align-items: center; justify-content: space-between; }
        .info-val { font-size: 18px; font-weight: bold; text-align: right; }

        .instructions-box { border: 5px solid #b04757; margin: 20px 50px; padding: 25px; position: relative; }
        .instructions-header { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; }
        
        .final-bitmaps { display: flex; justify-content: flex-end; gap: 10px; padding-right: 56px; margin-top: 14px; }
      `}</style>

      <div className="l-constrained">
        <p className="header-text">
          <strong>भारत निर्वाचन आयोग</strong><br />
          <span className="font-normal text-[25px]">ELECTION COMMISSION OF INDIA</span>
        </p>
        <div className="path-2"></div>
      </div>

      <div className="path-8"></div>

      <div className="card-row">
        {/* Front Card */}
        <div className="card-wrapper">
          <div className="card-front">
            <img className="path-42" src="/path_42.png" alt="" width="332" height="3" />
            <div className="eci-title">
              <strong>भारत निर्वाचन आयोग</strong><br />
              <span className="font-normal">ELECTION COMMISSION OF INDIA</span>
            </div>
            <div className="mt-4">
              <span className="epic-id">{formData.epicNo || 'UP/31/153/0000000'}</span>
              <div className="portrait-section">
                <img src={photoUrl} className="portrait-img" alt="Voter" />
                <div className="voter-info">
                  <p>नाम: {formData.nameLocal || '...'}<br /><strong>Name: {formData.name || '...'}</strong></p>
                  <p><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong><br />{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                  <img src="/gender_female.png" alt="Gender" width="180" height="14" />
                  <img src="/date_of_birth.png" alt="DOB" width="128" height="35" />
                </div>
              </div>
            </div>
            <img className="footer-banner" src="/e-electors_photo_identity.png" alt="Banner" />
          </div>
        </div>

        {/* Card Separator */}
        <img src="/path_7.png" alt="" width="2" height="372" />

        {/* Back Card */}
        <div className="card-wrapper">
          <div className="card-back">
            <div className="back-row">
              <div className="back-left">
                <img src="/bitmap_9.png" alt="Gov" width="60" height="36" />
                <div className="qr-holder">
                  <img src="/path_52.png" alt="QR" width="117" height="117" />
                </div>
                <p className="text-[9px] mt-1">Scan By VHA/BLO App</p>
              </div>
              <div className="back-right">
                <p>पता: {formData.addressLocal || '...'}<br /><strong>Address: {formData.address || '...'}</strong></p>
                <div className="mt-12">
                  <p>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}<br /><strong>Electoral Registration Officer, {formData.assemblyConstituency || '...'}</strong></p>
                </div>
              </div>
            </div>
            <p className="download-date">Download Date -: {downloadDate}</p>
            <p className="epic-bottom">{formData.epicNo}</p>
            <div className="bottom-links">
              <div className="flex items-center gap-2">
                <img src="/bitmap_10.png" alt="1950" width="16" height="16" />
                <span>1950</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/bitmap_11.png" alt="Web" width="17" height="16" />
                <span>https://voters.eci.gov.in/</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="path-8 mt-5"></div>

      {/* Info Sheet */}
      <div className="info-sheet">
        <div className="sheet-divider">
          <div className="divider-left"></div>
          <div className="divider-right"></div>
        </div>
        <div className="sheet-content">
          <div className="sheet-left">
            <img src="/path_9.png" alt="Big QR" width="256" height="256" />
            <p className="text-base mt-2">Scan By VHA/BLO App</p>
            <img className="mt-4" src="/download_date_-_19-06-202.png" alt="Date Banner" width="237" height="41" />
            <p className="font-bold text-lg">N.A</p>
            <img src="/timings_n_a.png" alt="Timings" width="123" height="36" />
          </div>
          <div className="sheet-right">
            <div className="info-item">
              <img src="/epic_no.png" alt="Epic Label" width="201" height="21" />
              <span className="info-val">{formData.epicNo}</span>
            </div>
            <div className="info-item">
              <img src="/serial_no.png" alt="Serial Label" width="160" height="18" />
              <span className="info-val">{formData.serialNo}</span>
            </div>
            <div className="mt-4">
              <img src="/image.png" alt="AC Label" width="447" height="22" />
              <div className="flex justify-between mt-2">
                <span className="text-lg">Assembly Constituency No. and Name :</span>
                <span className="info-val">{formData.assemblyConstituency}</span>
              </div>
            </div>
            <div className="mt-4">
              <img src="/321-.png" alt="Part Label" width="702" height="24" />
              <div className="flex justify-between mt-2">
                <span className="text-lg">Part No. and Name :</span>
                <span className="info-val">{formData.partNo} - {formData.partName}</span>
              </div>
            </div>
            <div className="mt-4">
              <img src="/image_2.png" alt="PS Label" width="592" height="24" />
              <div className="flex justify-between mt-2">
                <span className="text-lg">Polling Station Address :</span>
                <span className="info-val">{formData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions-box">
        <img className="instructions-header" src="/kindly_n.png" alt="Please Note" />
        <div className="mt-6">
          <img src="/1_eepic.png" alt="Hindi Instructions" width="1039" />
          <p className="text-[14px] leading-relaxed mt-6">
            1. eEPIC is a proof of identity for the purpose of an election.<br />
            2. Mere possession of EPIC is no guarantee of name being present in electoral roll. Please check your name in the current electoral roll before every election. Kindly visit www.voters.eci.gov.in<br />
            3. Date of birth mentioned in this card shall not be treated as proof of age or date of birth for any purpose other than registration in electoral roll.<br />
            4. eEPIC is valid throughout the country, till you are enrolled in electoral roll for any constituency in India.<br />
            5. eEPIC can be verified using authentic and secure QR code reader application.<br />
            6. This is electronically generated document.
          </p>
        </div>
      </div>

      <div className="final-bitmaps">
        <img src="/bitmap_3.png" alt="B1" width="40" height="40" />
        <img src="/bitmap_4.png" alt="B2" width="41" height="40" />
        <img src="/bitmap_5.png" alt="B3" width="41" height="40" />
        <img src="/bitmap_6.png" alt="B4" width="41" height="40" />
      </div>
    </div>
  );
}
