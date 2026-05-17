
"use client";

import React from 'react';
import Image from 'next/image';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  // Fallback to provided bitmap_7.jpg if no photo is uploaded
  const photoUrl = formData.photoUrl || '/bitmap_7.jpg';
  
  // Format current date as 19-06-2025 style
  const today = new Date();
  const downloadDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  return (
    <div className="voter-preview-container print:m-0">
      <style jsx>{`
        .voter-preview-container {
          width: 1155px;
          margin: 0 auto;
          background: #fff;
          color: #000;
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          position: relative;
          padding-top: 43px;
          padding-bottom: 40px;
        }
        .l-constrained { margin: 0 auto; position: relative; width: 1155px; }
        .text { margin: 0 auto; width: 458px; font-size: 24px; font-weight: bold; text-align: center; }
        .text-style { font-family: 'Noto Sans', sans-serif; line-height: 1.2; }
        .text-style-2 { line-height: 24.89px; }
        .path-2 { display: block; height: 4px; margin: 13px auto 0; position: relative; width: 600px; background-color: #000; }
        .path-8 { height: 1px; margin: 24px auto 0; width: 100%; border-bottom: 1px dashed #ccc; }
        
        .row { margin: 17px auto 0; padding: 0 35px 0 38px; display: flex; gap: 47px; justify-content: center; }
        .wrapper-3 { height: 310px; position: relative; width: 492px; margin-top: 31px; border: 1px solid #000; overflow: hidden; background: url('/bitmap.jpg') no-repeat; background-size: cover; }
        .col-4 { padding: 19px 18px 1px; height: 100%; position: relative; }
        
        .path-42 { display: block; margin: 20px auto 0; }
        .text-2 { margin: 10px auto 0; width: 344px; text-align: center; }
        .text-style-3 { font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: bold; }
        .text-style-4 { font-size: 16px; line-height: 1.5; }
        
        .row-4 { margin-top: 15px; display: flex; gap: 10px; }
        .col-13 { flex: 1; }
        .text-3 { font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 16px; font-weight: bold; }
        
        .row-10 { display: flex; gap: 12px; margin-top: 7px; }
        .portrait-img { width: 120px; height: 162px; border: 1px solid #000; position: relative; }
        .col-18 { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .text-4 { font-family: 'Noto Sans', sans-serif; font-size: 13px; font-weight: bold; }
        .text-5 { font-family: 'Noto Sans', sans-serif; font-size: 13px; font-weight: bold; }
        
        .e-e-footer { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 370px; }

        .wrapper-4 { height: 310px; position: relative; width: 493px; margin-top: 31px; border: 1px solid #000; overflow: hidden; background: url('/bitmap_2.png') no-repeat; background-size: cover; }
        .col-5 { padding: 15px 10px; height: 100%; position: relative; }
        .row-6 { display: flex; gap: 20px; }
        .col-11 { width: 142px; display: flex; flex-direction: column; align-items: center; }
        .path-51-holder { width: 142px; height: 142px; background: url('/path_51.png') no-repeat; display: flex; align-items: center; justify-content: center; margin-top: 9px; }
        .text-11 { font-size: 9px; text-align: center; margin-top: 5px; }
        
        .col-12 { flex: 1; font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; }
        .text-14 { position: absolute; bottom: 58px; right: 20px; font-size: 14px; font-weight: bold; }
        .text-15 { position: absolute; bottom: 50px; left: 44px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; }
        
        .row-3 { position: absolute; bottom: 10px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; }

        .info-sheet { margin-top: 30px; }
        .sheet-divider { display: flex; height: 5px; }
        .path-28 { width: 341px; background-color: #b04757; }
        .path-28-2 { flex: 1; background-color: #b04757; }
        
        .row-9 { display: flex; padding: 41px 50px; gap: 40px; }
        .col-16 { width: 256px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .col-17 { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        
        .info-row { display: flex; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; align-items: center; justify-content: space-between; }
        .info-label { font-size: 18px; }
        .info-value { font-size: 18px; font-weight: bold; text-align: right; }

        .wrapper-15 { border: 5px solid #b04757; margin: 20px 50px; padding: 25px; position: relative; min-height: 450px; }
        .instruction-header { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; }
        .instruction-content { margin-top: 20px; font-size: 14px; line-height: 1.6; }
        
        .footer-bitmaps { display: flex; justify-content: flex-end; gap: 10px; padding-right: 56px; margin-top: 14px; }
      `}</style>

      <div className="l-constrained">
        <p className="text">
          <strong className="text-style">भारत निर्वाचन आयोग</strong><br />
          <span className="text-style-2">ELECTION COMMISSION OF INDIA</span>
        </p>
        <div className="path-2"></div>
      </div>

      <div className="path-8"></div>

      <div className="row">
        {/* Front Card */}
        <div className="wrapper-3">
          <div className="col-4">
            <img className="path-42" src="/path_42.png" alt="" width="332" height="3" />
            <p className="text-2">
              <strong className="text-style-3">भारत निर्वाचन आयोग</strong><br />
              <span className="text-style-4">ELECTION COMMISSION OF INDIA</span>
            </p>
            <div className="row-4">
              <div className="col-13">
                <p className="text-3">{formData.epicNo || 'UP/31/153/0000000'}</p>
                <div className="row-10">
                  <div className="portrait-img">
                    <img src={photoUrl} alt="Voter" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="col-18">
                    <p className="text-4">नाम: {formData.nameLocal || '...'}<br /><strong>Name: {formData.name || '...'}</strong></p>
                    <p className="text-5"><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong><br />{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                    <img className="text-6" src="/gender_female.png" alt="लिंग / Gender" width="180" height="14" />
                    <img className="text-7" src="/date_of_birth.png" alt="DOB" width="128" height="35" />
                  </div>
                </div>
              </div>
            </div>
            <img className="e-e-footer" src="/e-electors_photo_identity.png" alt="eEPIC Banner" width="370" height="18" />
          </div>
        </div>

        {/* Separator Line */}
        <img src="/path_7.png" alt="" width="2" height="372" style={{ marginTop: '0' }} />

        {/* Back Card */}
        <div className="wrapper-4">
          <div className="col-5">
            <div className="row-6">
              <div className="col-11">
                <img src="/bitmap_9.png" alt="Gov" width="60" height="36" />
                <div className="path-51-holder">
                  <img src="/path_52.png" alt="QR" width="117" height="117" />
                </div>
                <p className="text-11">Scan By VHA/BLO App</p>
              </div>
              <div className="col-12">
                <p>पता: {formData.addressLocal || '...'}<br /><strong>Address: {formData.address || '...'}</strong></p>
                <p style={{ marginTop: '50px' }}>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}<br /><strong>Electoral Registration Officer, {formData.assemblyConstituency || '...'}</strong></p>
              </div>
            </div>
            <p className="text-14">Download Date -: {downloadDate}</p>
            <p className="text-15">{formData.epicNo}</p>
            <div className="row-3">
              <div className="flex items-center gap-2">
                <img src="/bitmap_10.png" alt="1950" width="16" height="16" />
                <span className="text-[10px]">1950</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/bitmap_11.png" alt="Web" width="17" height="16" />
                <span className="text-[10px]">https://voters.eci.gov.in/</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="path-8" style={{ marginTop: '20px' }}></div>

      {/* Info Sheet */}
      <div className="info-sheet">
        <div className="sheet-divider">
          <div className="path-28"></div>
          <div className="path-28-2"></div>
        </div>
        <div className="row-9">
          <div className="col-16">
            <img className="path-9" src="/path_9.png" alt="Big QR" width="256" height="256" />
            <p className="text-18">Scan By VHA/BLO App</p>
            <img className="text-19" src="/download_date_-_19-06-202.png" alt="Date Banner" width="237" height="41" />
            <p className="text-20">N.A</p>
            <img className="text-21" src="/timings_n_a.png" alt="Timings" width="123" height="36" />
          </div>
          <div className="col-17">
            <div className="info-row">
              <img src="/epic_no.png" alt="Epic Label" width="201" height="21" />
              <span className="info-value">{formData.epicNo}</span>
            </div>
            <div className="info-row">
              <img src="/serial_no.png" alt="Serial Label" width="160" height="18" />
              <span className="info-value">{formData.serialNo}</span>
            </div>
            <div className="mt-4">
              <img src="/image.png" alt="AC Label" width="447" height="22" />
              <div className="flex justify-between mt-2">
                <span className="text-[18px]">Assembly Constituency No. and Name :</span>
                <span className="font-bold text-[18px]">{formData.assemblyConstituency}</span>
              </div>
            </div>
            <div className="mt-4">
              <img src="/321-.png" alt="Part Label" width="702" height="24" />
              <div className="flex justify-between mt-2">
                <span className="text-[18px]">Part No. and Name :</span>
                <span className="font-bold text-[18px]">{formData.partNo} - {formData.partName}</span>
              </div>
            </div>
            <div className="mt-4">
              <img src="/image_2.png" alt="PS Label" width="592" height="24" />
              <div className="flex justify-between mt-2">
                <span className="text-[18px]">Polling Station Address :</span>
                <span className="font-bold text-[18px]">{formData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="wrapper-15">
        <img className="instruction-header" src="/kindly_n.png" alt="Please Note" width="322" height="24" />
        <img className="instruction-content" src="/1_eepic.png" alt="Hindi Instructions" width="1039" height="152" />
        <p className="text-37">
          1. eEPIC is a proof of identity for the purpose of an election.<br />
          2. Mere possession of EPIC is no guarantee of name being present in electoral roll. Please check your name in the current electoral roll before every election. Kindly visit www.voters.eci.gov.in<br />
          3. Date of birth mentioned in this card shall not be treated as proof of age or date of birth for any purpose other than registration in electoral roll.<br />
          4. eEPIC is valid throughout the country, till you are enrolled in electoral roll for any constituency in India.<br />
          5. eEPIC can be verified using authentic and secure QR code reader application.<br />
          6. This is electronically generated document.
        </p>
      </div>

      <div className="footer-bitmaps">
        <img src="/bitmap_3.png" alt="B1" width="40" height="40" />
        <img src="/bitmap_4.png" alt="B2" width="41" height="40" />
        <img src="/bitmap_5.png" alt="B3" width="41" height="40" />
        <img src="/bitmap_6.png" alt="B4" width="41" height="40" />
      </div>
    </div>
  );
}
