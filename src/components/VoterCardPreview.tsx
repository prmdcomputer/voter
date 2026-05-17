"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const portraitPlaceholder = PlaceHolderImages.find(i => i.id === 'voter-portrait')?.imageUrl;
  const photoUrl = formData.photoUrl || portraitPlaceholder;
  const downloadDate = new Date().toLocaleDateString('en-GB', {
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
        .card-row { margin: 17px auto 0; padding: 0 35px 0 38px; display: flex; gap: 47px; justify-content: center; }
        
        .card-wrapper { width: 492px; height: 310px; position: relative; margin-top: 31px; }
        .card-box { 
          width: 490px; 
          height: 308px; 
          position: absolute; 
          top: 1px; 
          left: 1px;
          border: 1px solid #000;
          overflow: hidden;
        }
        
        /* Front Card Specifics */
        .front-card { background: url('/images/bitmap.jpg') no-repeat; background-size: cover; padding: 19px 18px 1px; }
        .card-header-line { display: block; margin: 20px auto 0; width: 332px; height: 3px; background: #000; }
        .card-header-text { margin: 10px auto 0; width: 344px; text-align: center; line-height: 1.2; }
        .text-style-3 { font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: bold; }
        .text-style-4 { font-size: 16px; line-height: 1.5; }
        
        .epic-no-box { margin-top: 5px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 16px; font-weight: bold; padding-left: 6px; }
        .voter-main { display: flex; gap: 12px; margin-top: 7px; padding-left: 6px; }
        .portrait { width: 120px; height: 162px; border: 1px solid #000; position: relative; flex-shrink: 0; }
        .details-col { display: flex; flex-direction: column; gap: 4px; }
        .voter-name { font-family: 'Noto Sans', sans-serif; font-size: 13px; font-weight: bold; }
        .voter-name-en { font-family: Arial; font-size: 13px; font-weight: bold; }
        
        .e-electoral-banner { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 370px; text-align: center; font-size: 10px; font-weight: bold; }
        
        /* Back Card Specifics */
        .back-card { background: url('/images/bitmap_2.png') no-repeat; background-size: cover; padding: 15px 10px; }
        .back-row { display: flex; gap: 20px; }
        .qr-col { width: 142px; display: flex; flex-direction: column; align-items: center; }
        .qr-box { width: 117px; height: 117px; border: 1px solid #eee; position: relative; margin-top: 9px; }
        .address-col { flex: 1; font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: bold; line-height: 1.4; }
        
        .back-epic { position: absolute; bottom: 50px; left: 44px; font-family: 'Arial Rounded MT Bold', sans-serif; font-size: 14px; }
        .back-download-date { position: absolute; bottom: 58px; right: 20px; font-size: 14px; font-weight: bold; }
        .back-footer-links { position: absolute; bottom: 10px; left: 20px; right: 20px; display: flex; justify-content: space-between; font-size: 10px; align-items: center; }

        /* Info Sheet */
        .info-sheet-divider { height: 5px; background: #b04757; margin-top: 30px; display: flex; }
        .info-main { display: flex; padding: 41px 50px; gap: 40px; }
        .info-qr-col { width: 256px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .big-qr { width: 256px; height: 256px; border: 1px solid #eee; position: relative; }
        .info-details-col { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        .info-field-row { display: flex; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; font-size: 18px; }
        .info-label { width: 350px; }
        .info-value { font-weight: bold; flex: 1; text-align: right; }

        /* Instructions */
        .instructions-wrapper { border: 5px solid #b04757; margin: 20px 50px; padding: 25px; position: relative; min-height: 450px; }
        .instruction-header { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; font-size: 18px; font-weight: bold; color: #b04757; }
        .instruction-grid { display: grid; grid-template-cols: 1fr; gap: 20px; margin-top: 20px; }
        .instruction-hi { font-size: 14px; line-height: 1.6; }
        .instruction-en { font-size: 14px; line-height: 1.6; }
      `}</style>

      {/* Main Header */}
      <div className="l-constrained">
        <p className="text">
          <strong className="text-style">भारत निर्वाचन आयोग</strong><br />
          <span className="text-style-2">ELECTION COMMISSION OF INDIA</span>
        </p>
        <div className="path-2"></div>
      </div>

      <div className="path-8"></div>

      {/* Card Row */}
      <div className="card-row">
        {/* Front Card */}
        <div className="card-wrapper">
          <div className="card-box front-card">
            <div className="card-header-line"></div>
            <p className="card-header-text">
              <strong className="text-style-3">भारत निर्वाचन आयोग</strong><br />
              <span className="text-style-4">ELECTION COMMISSION OF INDIA</span>
            </p>
            <div className="epic-no-box">
              {formData.epicNo || 'UP/31/153/0000000'}
            </div>
            <div className="voter-main">
              <div className="portrait">
                {photoUrl && <Image src={photoUrl} alt="Voter" fill className="object-cover" />}
              </div>
              <div className="details-col">
                <div>
                  <p className="voter-name">नाम: {formData.nameLocal || '...'}</p>
                  <p className="voter-name-en">Name: {formData.name || '...'}</p>
                </div>
                <div className="mt-2">
                  <p className="voter-name">{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</p>
                  <p className="voter-name-en">{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                </div>
                <div className="mt-2">
                  <p className="voter-name">लिंग / Gender: {formData.gender === 'Female' ? 'महिला / Female' : 'पुरुष / Male'}</p>
                </div>
                <div className="mt-2">
                  <p className="voter-name">जन्म तिथि / आयु: Date of Birth / Age: {formData.age || '...'}</p>
                </div>
              </div>
            </div>
            <div className="e-electoral-banner">
              e-Electors Photo Identity Card - ई-निर्वाचक फोटो पहचान पत्र
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div className="card-wrapper">
          <div className="card-box back-card">
            <div className="back-row">
              <div className="qr-col">
                <Image src="/images/bitmap_9.png" alt="Gov" width={60} height={36} />
                <div className="qr-box">
                   <Image src="/images/path_52.png" alt="QR" fill className="object-contain" />
                </div>
                <p className="text-[9px] mt-1">Scan By VHA/BLO App</p>
              </div>
              <div className="address-col">
                <p>
                  पता: {formData.addressLocal || '...'}<br />
                  <span className="font-normal block mt-1">Address: {formData.address || '...'}</span>
                </p>
                <p className="mt-12">
                  निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}<br />
                  <span className="font-normal block mt-1">Electoral Registration Officer, {formData.assemblyConstituency || '...'}</span>
                </p>
              </div>
            </div>
            <p className="back-download-date">Download Date -: {downloadDate}</p>
            <p className="back-epic">{formData.epicNo}</p>
            <div className="back-footer-links">
               <div className="flex items-center gap-1">
                 <Image src="/images/bitmap_10.png" alt="1950" width={16} height={16} />
                 <span>1950</span>
               </div>
               <div className="flex items-center gap-1">
                 <Image src="/images/bitmap_11.png" alt="Web" width={17} height={16} />
                 <span>https://voters.eci.gov.in/</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="path-8 mt-8"></div>

      {/* Info Sheet */}
      <div className="info-sheet-divider"></div>
      
      <div className="info-main">
        <div className="info-qr-col">
          <div className="big-qr">
             <Image src="/images/path_9.png" alt="Big QR" fill className="object-contain" />
          </div>
          <p className="text-18">Scan By VHA/BLO App</p>
          <div className="text-center mt-4">
             <p className="font-bold">Download Date -: {downloadDate}</p>
             <p className="font-bold mt-2">मतदान की तारीख / Poll Date : N.A</p>
             <p className="mt-2">समय / Timings : N.A</p>
          </div>
        </div>

        <div className="info-details-col">
          <div className="info-field-row">
             <span className="info-label">ईपीआईसी संख्या / Epic no. :</span>
             <span className="info-value">{formData.epicNo}</span>
          </div>
          <div className="info-field-row">
             <span className="info-label">क्रम संख्या / Serial No. :</span>
             <span className="info-value">{formData.serialNo || '...'}</span>
          </div>
          <div className="info-field-row">
             <span className="info-label">विधानसभा निर्वाचन क्षेत्र संख्या और नाम :</span>
             <span className="info-value">{formData.assemblyConstituencyLocal}</span>
          </div>
          <div className="flex flex-col border-b border-f0f0f0 pb-2">
             <div className="flex justify-between text-[18px]">
               <span>Assembly Constituency No. and Name :</span>
               <span className="font-bold">{formData.assemblyConstituency}</span>
             </div>
          </div>
          <div className="info-field-row">
             <span className="info-label">भाग संख्या और नाम :</span>
             <span className="info-value">{formData.partNo} - {formData.partNameLocal}</span>
          </div>
          <div className="flex flex-col border-b border-f0f0f0 pb-2">
             <div className="flex justify-between text-[18px]">
               <span>Part No. and Name :</span>
               <span className="font-bold">{formData.partNo} - {formData.partName}</span>
             </div>
          </div>
          <div className="info-field-row">
             <span className="info-label">पोलिंग स्टेशन का पता :</span>
             <span className="info-value">{formData.addressLocal}</span>
          </div>
          <div className="flex flex-col">
             <div className="flex justify-between text-[18px]">
               <span>Polling Station Address :</span>
               <span className="font-bold">{formData.address}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Instructions Box */}
      <div className="instructions-wrapper">
        <div className="instruction-header">कृपया ध्यान दें कि / Kindly note that</div>
        <div className="instruction-grid">
           <div className="instruction-hi">
             <p>1. eEPIC एक चुनाव के उद्देश्य के लिए पहचान का एक प्रमाण है।</p>
             <p>2. केवल ईपीआईसी रखने से मतदाता सूची में नाम मौजूद होने की कोई गारंटी नहीं है। कृपया प्रत्येक चुनाव से पहले वर्तमान मतदाता सूची में अपना नाम देखें। कृपया www.voters.eci.gov.in का दौरा करें |</p>
             <p>3. इस कार्ड में उल्लिखित जन्म तिथि को मतदाता सूची में पंजीकरण के अलावा किसी अन्य उद्देश्य के लिए आयु या जन्म तिथि के प्रमाण के रूप में नहीं माना जाएगा।</p>
             <p>4. eEPIC पूरे देश में मान्य है, जब तक कि आप भारत में किसी भी निर्वाचन क्षेत्र के लिए मतदाता सूची में नामांकित नहीं हो जाते हैं।</p>
             <p>5. eEPIC प्रामाणिक और सुरक्षित QR कोड रीडर एप्लिकेशन का उपयोग करके सत्यापित किया जा सकता है।</p>
             <p>6. यह इलेक्ट्रॉनिक रूप से उत्पन्न दस्तावेज है।</p>
           </div>
           <div className="instruction-en italic border-t pt-4 mt-4">
             <p>1. eEPIC is a proof of identity for the purpose of an election.</p>
             <p>2. Mere possession of EPIC is no guarantee of name being present in electoral roll. Please check your name in the current electoral roll before every election. Kindly visit www.voters.eci.gov.in</p>
             <p>3. Date of birth mentioned in this card shall not be treated as proof of age or date of birth for any purpose other than registration in electoral roll.</p>
             <p>4. eEPIC is valid throughout the country, till you are enrolled in electoral roll for any constituency in India.</p>
             <p>5. eEPIC can be verified using authentic and secure QR code reader application.</p>
             <p>6. This is electronically generated document.</p>
           </div>
        </div>
      </div>

      {/* Footer Bitmaps */}
      <div className="flex justify-end gap-2 px-12 mt-4">
        <Image src="/images/bitmap_3.png" alt="B1" width={40} height={40} />
        <Image src="/images/bitmap_4.png" alt="B2" width={41} height={40} />
        <Image src="/images/bitmap_5.png" alt="B3" width={41} height={40} />
        <Image src="/images/bitmap_6.png" alt="B4" width={41} height={40} />
      </div>
    </div>
  );
}
