
"use client";

import React from 'react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  // Fallback to bitmap_7.jpg if no photo is uploaded
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
          background: #fff;
          color: #000;
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          position: relative;
          width: 1155px;
          margin: 0 auto;
        }
        .page-1 { position: relative; }
        .l-unconstrained { position: relative; }
        .l-constrained { margin: 0 auto; position: relative; width: 1155px; }
        .text { margin: 0 auto; width: 458px; font-size: 1.5rem; font-weight: bold; text-align: center; }
        .text-style { font-family: 'Noto Sans', sans-serif; line-height: 1.2; }
        .text-style-2 { line-height: 24.8999px; }
        .path-2 { display: block; height: 4px; margin: 13px auto 0; position: relative; right: 15.5px; width: 600px; background-color: #000; }
        .path-8 { height: 1px; margin: 24px auto 0; position: relative; width: 100%; border-bottom: 1px dashed #ccc; }
        
        .row { margin: 17px auto 0; padding: 0 35px 0 38px; position: relative; width: 1155px; display: flex; justify-content: center; gap: 47px; }
        .wrapper-3 { height: 310px; position: relative; width: 492px; margin-top: 31px !important; border: 1px solid #000; overflow: hidden; }
        .col-4 { width: 100%; height: 100%; padding: 19px 18px 1px; background: url('/bitmap.jpg') no-repeat; background-size: cover; position: relative; }
        .path-42 { display: block; margin: 20px auto 0; position: relative; right: 10px; }
        .text-2 { margin: 10px auto 0; position: relative; width: 344px; font-size: 1.125rem; font-weight: bold; text-align: center; }
        .text-style-3 { font-family: 'Noto Sans', sans-serif; line-height: 22px; }
        .text-style-4 { line-height: 25.28003px; }
        
        .row-4 { margin: -3px auto 0; position: relative; width: 450px; display: flex; }
        .col-13 { margin: 17px 0 0; position: relative; width: 331px; }
        .text-3 { margin: 0 0 0 6px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 1rem; }
        .row-10 { margin: 7px 0 0; position: relative; display: flex; }
        .bitmap { width: 120px; height: 162px; margin: 4px 12px 0 0; border: 1px solid #000; object-fit: cover; }
        .col-18 { position: relative; width: 199px; }
        .text-4 { width: 100%; font-family: 'Noto Sans', sans-serif; font-size: 0.8125rem; font-weight: bold; }
        .text-5 { margin: 3px 0 0 1px; width: 100%; font-size: 0.8125rem; font-weight: bold; }
        .text-6 { display: block; margin: 2px 0 0; position: relative; }
        .text-7 { display: block; margin: 9px 0 0; position: relative; }
        
        .wrapper-4 { height: 310px; position: relative; width: 493px; margin-top: 31px !important; border: 1px solid #000; overflow: hidden; }
        .col-5 { width: 100%; height: 100%; padding: 15px 10px; background: url('/bitmap_2.png') no-repeat; background-size: cover; position: relative; }
        .row-6 { margin: 0 auto; position: relative; width: 470px; display: flex; gap: 20px; }
        .col-11 { width: 142px; position: relative; display: flex; flex-direction: column; align-items: center; }
        .bitmap-2 { display: block; margin-bottom: 9px; }
        .path-51-holder { width: 142px; height: 142px; background: url('/path_51.png') no-repeat; display: flex; align-items: center; justify-content: center; }
        .path-52 { display: block; width: 117px; height: 117px; }
        .text-11 { margin: 5px 0 0; font-size: 0.5625rem; text-align: center; }
        .col-12 { flex: 1; position: relative; }
        .text-12 { font-family: 'Noto Sans', sans-serif; font-size: 0.875rem; font-weight: bold; }
        .text-13 { margin: 53px 0 0; font-family: 'Noto Sans', sans-serif; font-size: 0.875rem; font-weight: bold; }
        .text-14 { position: absolute; bottom: 58px; right: 20px; font-size: 0.875rem; font-weight: bold; }
        .text-15 { position: absolute; bottom: 50px; left: 44px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 0.875rem; }
        .row-3 { position: absolute; bottom: 10px; left: 10px; right: 10px; display: flex; justify-content: space-between; align-items: center; }
        
        .l-unconstrained-2 { margin: 30px 0 0; position: relative; }
        .row-5 { position: relative; display: flex; height: 5px; }
        .path-28 { width: 341px; background-color: #b04757; height: 5px; }
        .path-28-2 { flex: 1; background-color: #b04757; height: 5px; }
        
        .row-9 { margin: 41px auto 0; position: relative; width: 1057px; display: flex; gap: 40px; }
        .col-16 { width: 256px; display: flex; flex-direction: column; align-items: center; }
        .text-18 { margin: 31px 0 0; font-size: 1rem; text-align: center; }
        .text-19 { display: block; margin: 20px auto 0; }
        .text-20 { margin: 7px 0 0 12px; font-size: 1rem; font-weight: bold; }
        .text-21 { display: block; margin: 10px 0 0 10px; position: relative; }
        
        .col-17 { flex: 1; position: relative; }
        .row-11, .row-12 { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; margin-bottom: 15px; }
        .text-23, .text-25 { font-size: 1.125rem; font-weight: bold; }
        .text-26, .text-29, .text-32 { display: block; margin-top: 15px; }
        .row-13, .row-14, .row-15 { display: flex; justify-content: space-between; margin-top: 5px; }
        .text-27, .text-30, .text-33 { font-size: 1.125rem; }
        .text-28, .text-31, .text-34 { font-size: 1.125rem; font-weight: bold; text-align: right; }
        
        .wrapper-15 { border: 5px solid #b04757; margin: 20px 0 0; padding: 25px; position: relative; width: 1125px; }
        .text-35 { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; }
        .text-36 { display: block; margin: 20px auto 0; }
        .text-37 { margin-top: 20px; font-size: 0.875rem; line-height: 1.6; }
        
        .row-2 { margin: 14px 56px 0 auto; display: flex; justify-content: flex-end; gap: 7px; }
      `}</style>

      <div className="page-1">
        <div className="l-unconstrained">
          <div className="l-constrained">
            <p className="text">
              <strong className="text-style">भारत निर्वाचन आयोग</strong><br />
              <span className="text-style-2">ELECTION COMMISSION OF INDIA</span>
            </p>
            <div className="path-2"></div>
          </div>
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
                    <img className="bitmap" src={photoUrl} alt="Voter" />
                    <div className="col-18">
                      <p className="text-4">नाम: {formData.nameLocal || '...'}<br /><strong>Name: {formData.name || '...'}</strong></p>
                      <p className="text-5"><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong><br />{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                      <img className="text-6" src="/gender_female.png" alt="Gender" width="180" height="14" />
                      <img className="text-7" src="/date_of_birth.png" alt="DOB" width="128" height="35" />
                    </div>
                  </div>
                </div>
              </div>
              <img className="text-10" src="/e-electors_photo_identity.png" alt="eEPIC Banner" width="370" height="18" />
            </div>
          </div>

          <img src="/path_7.png" alt="" width="2" height="372" />

          {/* Back Card */}
          <div className="wrapper-4">
            <div className="col-5">
              <div className="row-6">
                <div className="col-11">
                  <img className="bitmap-2" src="/bitmap_9.png" alt="Gov" width="60" height="36" />
                  <div className="path-51-holder">
                    <img className="path-52" src="/path_52.png" alt="QR" />
                  </div>
                  <p className="text-11">Scan By VHA/BLO App</p>
                </div>
                <div className="col-12">
                  <p className="text-12">पता: {formData.addressLocal || '...'}<br /><strong>Address: {formData.address || '...'}</strong></p>
                  <p className="text-13">निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}<br /><strong>Electoral Registration Officer, {formData.assemblyConstituency || '...'}</strong></p>
                </div>
              </div>
              <p className="text-14">Download Date -: {downloadDate}</p>
              <p className="text-15">{formData.epicNo}</p>
              <div className="row-3">
                <div className="flex items-center gap-1">
                  <img src="/bitmap_10.png" alt="1950" width="16" height="16" />
                  <span className="text-[10px]">1950</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/bitmap_11.png" alt="Web" width="17" height="16" />
                  <span className="text-[10px]">https://voters.eci.gov.in/</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="path-8-2"></div>

        <div className="l-unconstrained-2">
          <div className="l-constrained-2">
            <div className="row-5">
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
                <div className="row-11">
                  <img src="/epic_no.png" alt="Epic Label" width="201" height="21" />
                  <span className="text-23">{formData.epicNo}</span>
                </div>
                <div className="row-12">
                  <img src="/serial_no.png" alt="Serial Label" width="160" height="18" />
                  <span className="text-25">{formData.serialNo}</span>
                </div>
                <img className="text-26" src="/image.png" alt="AC Label" width="447" height="22" />
                <div className="row-13">
                  <p className="text-27">Assembly Constituency No. and Name :</p>
                  <p className="text-28">{formData.assemblyConstituency}</p>
                </div>
                <img className="text-29" src="/321-.png" alt="Part Label" width="702" height="24" />
                <div className="row-14">
                  <p className="text-30">Part No. and Name :</p>
                  <p className="text-31">{formData.partNo} - {formData.partName}</p>
                </div>
                <img className="text-32" src="/image_2.png" alt="PS Label" width="592" height="24" />
                <div className="row-15">
                  <p className="text-33">Polling Station Address :</p>
                  <p className="text-34">{formData.address}</p>
                </div>
              </div>
            </div>

            <div className="wrapper-15">
              <img className="text-35" src="/kindly_n.png" alt="Kindly Note" width="322" height="24" />
              <img className="text-36" src="/1_eepic.png" alt="Hindi Instructions" width="1039" height="152" />
              <p className="text-37">
                1. eEPIC is a proof of identity for the purpose of an election.<br />
                2. Mere possession of EPIC is no guarantee of name being present in electoral roll. Please check your name in the current electoral roll before every election. Kindly visit www.voters.eci.gov.in<br />
                3. Date of birth mentioned in this card shall not be treated as proof of age or date of birth for any purpose other than registration in electoral roll.<br />
                4. eEPIC is valid throughout the country, till you are enrolled in electoral roll for any constituency in India.<br />
                5. eEPIC can be verified using authentic and secure QR code reader application.<br />
                6. This is electronically generated document.
              </p>
            </div>

            <div className="row-2">
              <img src="/bitmap_3.png" alt="" width="40" height="40" />
              <img src="/bitmap_4.png" alt="" width="41" height="40" />
              <img src="/bitmap_5.png" alt="" width="41" height="40" />
              <img src="/bitmap_6.png" alt="" width="41" height="40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
