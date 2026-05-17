
"use client";

import React from 'react';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const photoUrl = formData.photoUrl || '/bitmap_7.jpg';
  
  const getGenderText = () => {
    if (formData.gender === 'Male') return 'लिंग/Gender : पुरुष/ Male';
    if (formData.gender === 'Female') return 'लिंग/Gender : महिला/ Female';
    return 'लिंग/Gender : अन्य/ Other';
  };

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
        .l-unconstrained { position: relative; }
        .l-constrained { margin: 0 auto; position: relative; width: 1155px; }
        
        .path-8 {
          height: 1px;
          margin: 24px auto 0;
          position: relative;
          width: 100%;
          background: url(/path_8.png) no-repeat center 0;
          background-size: cover;
        }
        
        .row { margin: 17px auto 0; padding: 0 35px 0 38px; position: relative; width: 1155px; display: flex; justify-content: center; gap: 47px; }
        
        .wrapper-3 { height: 310px; position: relative; width: 492px; margin-top: 31px; border: 1px solid #000; }
        .col-4 { height: 100%; padding: 19px 18px 1px; width: 100%; background: url(/bitmap.jpg) no-repeat; background-size: cover; position: relative; }
        
        .row-4 { margin: 20px auto 0; position: relative; width: 450px; display: flex; justify-content: space-between; }
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
        
        .wrapper-4 { height: 310px; position: relative; width: 493px; margin-top: 31px; border: 1px solid #000; }
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

        .l-unconstrained-2 { margin: 30px 0 0; position: relative; }
        .row-5 { display: flex; height: 5px; }
        .path-28 { width: 341px; background-color: #b04757; }
        .path-28-2 { flex: 1; background-color: #b04757; }
        
        .row-9 { margin: 41px auto 0; position: relative; width: 1057px; display: flex; gap: 40px; }
        .col-16 { margin: 22px 0 0; width: 256px; display: flex; flex-direction: column; align-items: center; }
        .text-18 { margin: 31px 0 0; font-size: 16px; text-align: center; }
        .text-20 { margin: 7px 0 0 12px; font-size: 16px; font-weight: bold; }
        
        .col-17 { flex: 1; margin: 4px 0 0; display: flex; flex-direction: column; gap: 15px; }
        .row-11, .row-12, .row-13, .row-14, .row-15 { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
        .text-23, .text-25, .text-28, .text-31, .text-34 { font-size: 18px; font-weight: bold; text-align: right; }
        .text-27, .text-30, .text-33 { font-size: 18px; width: 350px; }

        .wrapper-15 { border: 5px solid #b04757; margin: 20px auto; padding: 40px; position: relative; width: 1125px; }
        .text-37 { margin-top: 20px; line-height: 1.6; font-size: 14px; }
        
        .row-2 { margin: 20px 56px 0 auto; display: flex; justify-content: flex-end; gap: 10px; width: fit-content; }
      `}</style>

      <div className="l-unconstrained">
        <div className="l-constrained">
        </div>
      </div>

      <div className="path-8"></div>

      <div className="row group">
        {/* Front Card */}
        <div className="wrapper-3">
          <div className="col-4">
            <div className="row-4 group">
              <div className="col-13">
                <p className="text-3">{formData.epicNo || 'UP/31/153/0000000'}</p>
                <div className="row-10 group">
                  <img className="bitmap" src={photoUrl} alt="Voter" />
                  <div className="col-18">
                    <p className="text-4">नाम: {formData.nameLocal || '...'}<br /><strong>Name: {formData.name || '...'}</strong></p>
                    <p className="text-5"><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong><br />{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                    
                    <div className="dynamic-label">{getGenderText()}</div>
                    <div className="dynamic-label">जन्मतिथि/ आयु:  Date of Birth / Age: {formData.age || '...'}</div>
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

      <div className="path-8 mt-10"></div>

      {/* Info Sheet */}
      <div className="l-unconstrained-2">
        <div className="l-constrained-2">
          <div className="row-5 group">
            <div className="path-28"></div>
            <div className="path-28-2"></div>
          </div>
          
          <div className="row-9 group">
            <div className="col-16">
              <img src="/path_9.png" alt="Big QR" width="256" height="256" />
              <p className="text-18">Scan By VHA/BLO App</p>
              <div className="mt-8 text-center">
                <p className="text-20">N.A</p>
                <img className="mx-auto mt-2" src="/timings_n_a.png" alt="Timings" width="123" height="36" />
              </div>
            </div>
            
            <div className="col-17">
              <div className="row-11 group">
                <img src="/epic_no.png" alt="Epic Label" width="201" height="21" />
                <p className="text-23">{formData.epicNo}</p>
              </div>
              <div className="row-12 group">
                <img src="/serial_no.png" alt="Serial Label" width="160" height="18" />
                <p className="text-25">{formData.serialNo}</p>
              </div>
              
              <div className="mt-4">
                <img src="/image.png" alt="AC Label" width="447" height="22" />
                <div className="row-13 group mt-2">
                  <p className="text-27">Assembly Constituency No. and Name :</p>
                  <p className="text-28">{formData.assemblyConstituency}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <img src="/321-.png" alt="Part Label" width="702" height="24" />
                <div className="row-14 group mt-2">
                  <p className="text-30">Part No. and Name :</p>
                  <p className="text-31">{formData.partNo} - {formData.partName}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <img src="/image_2.png" alt="PS Label" width="592" height="24" />
                <div className="row-15 group mt-2">
                  <p className="text-33">Polling Station Address :</p>
                  <p className="text-34">{formData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="wrapper-15">
            <img className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4" src="/kindly_n.png" alt="Kindly Note" width="322" height="24" />
            <div className="mt-8">
              <img src="/1_eepic.png" alt="Hindi Instructions" width="1039" height="152" />
              <p className="text-37">
                1. eEPIC is a proof of identity for the purpose of an election.<br />
                2. Mere possession of EPIC is no guarantee of name being present in electoral roll. Please check your name in the current electoral roll before every election. Kindly visit www.voters.eci.gov.in<br />
                3. Date of birth mentioned in this card shall not be treated as proof of age or date of birth for any purpose other than registration in electoral roll.<br />
                4. eEPIC is valid throughout the country, till you are enrolled in electoral roll for any constituency in India.<br />
                5. eEPIC can be verified using authentic and secure QR code reader application.<br />
                6. This is electronically generated document.
              </p>
            </div>
          </div>

          {/* Bottom Icons */}
          <div className="row-2 group">
            <img src="/bitmap_3.png" alt="" width="40" height="40" />
            <img src="/bitmap_4.png" alt="" width="41" height="40" />
            <img src="/bitmap_5.png" alt="" width="41" height="40" />
            <img src="/bitmap_6.png" alt="" width="41" height="40" />
          </div>
        </div>
      </div>
    </div>
  );
}
