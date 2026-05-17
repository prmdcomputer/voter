
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const qrPlaceholder = PlaceHolderImages.find(i => i.id === 'qr-code-placeholder')?.imageUrl;
  const portraitPlaceholder = PlaceHolderImages.find(i => i.id === 'voter-portrait')?.imageUrl;
  const photoUrl = formData.photoUrl || portraitPlaceholder;

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
          padding-bottom: 40px;
        }
        .l-constrained { margin: 0 auto; position: relative; width: 1155px; }
        .header-text { margin: 0 auto; width: 458px; font-size: 24px; font-weight: bold; text-align: center; }
        .path-2 { display: block; height: 4px; margin: 13px auto 0; width: 600px; background-color: #000; }
        .path-8 { height: 1px; margin: 24px auto 0; width: 100%; border-bottom: 1px dashed #ccc; }
        .card-row { margin: 17px auto 0; padding: 0 35px 0 38px; display: flex; gap: 47px; justify-content: center; }
        
        /* Card Styles */
        .card-wrapper { width: 490px; height: 310px; position: relative; border: 1px solid #000; overflow: hidden; background: #fff; }
        .card-inner { padding: 15px; height: 100%; display: flex; flex-col; position: relative; }
        
        .card-header-line { width: 332px; height: 3px; background: #000; margin: 0 auto 5px; }
        .card-header-text { text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 10px; line-height: 1.2; }
        
        .epic-no { font-weight: bold; font-size: 14px; margin-bottom: 10px; }
        
        .card-main-content { display: flex; gap: 15px; }
        .portrait-box { width: 120px; height: 162px; border: 1px solid #000; position: relative; flex-shrink: 0; }
        .voter-details { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
        .voter-details p { line-height: 1.4; }
        
        .footer-banner { position: absolute; bottom: 10px; left: 0; width: 100%; text-align: center; font-size: 10px; font-weight: bold; border-top: 1px solid #eee; padding-top: 5px; }
        
        /* Back Card specific */
        .back-row { display: flex; gap: 15px; height: 100%; }
        .qr-section { width: 142px; display: flex; flex-direction: column; align-items: center; }
        .qr-box { width: 117px; height: 117px; border: 1px solid #eee; position: relative; margin-bottom: 5px; }
        .address-section { flex: 1; font-size: 12px; line-height: 1.4; }
        
        /* Info Sheet */
        .info-sheet-divider { height: 5px; background: #b04757; margin-top: 30px; }
        .info-main { display: flex; padding: 40px; gap: 40px; }
        .info-qr-col { width: 256px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .big-qr-box { width: 256px; height: 256px; border: 1px solid #ccc; position: relative; }
        .info-details-col { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        .info-row { display: flex; border-bottom: 1px solid #eee; padding-bottom: 8px; font-size: 16px; }
        .info-label { width: 300px; font-weight: normal; }
        .info-value { font-weight: bold; flex: 1; text-align: right; }
        
        .instructions-box { border: 5px solid #b04757; padding: 25px; margin: 20px 40px; position: relative; }
        .instruction-header { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; color: #b04757; font-weight: bold; font-size: 18px; }
        .instruction-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 30px; font-size: 13px; line-height: 1.6; }
      `}</style>

      {/* Main Header */}
      <div className="l-constrained pt-10">
        <div className="header-text">
          <strong>भारत निर्वाचन आयोग</strong><br />
          <span className="text-[18px]">ELECTION COMMISSION OF INDIA</span>
        </div>
        <div className="path-2"></div>
      </div>

      <div className="path-8"></div>

      {/* PVC Card Row */}
      <div className="card-row">
        {/* Front Card */}
        <div className="card-wrapper">
          <div className="card-inner">
            <div className="card-header-line"></div>
            <div className="card-header-text">
              <strong>भारत निर्वाचन आयोग</strong><br />
              <span className="text-[12px]">ELECTION COMMISSION OF INDIA</span>
            </div>
            <div className="epic-no px-2">{formData.epicNo || 'UP/31/153/0000000'}</div>
            <div className="card-main-content px-2">
              <div className="portrait-box">
                <Image src={photoUrl} alt="Voter" fill className="object-cover" />
              </div>
              <div className="voter-details">
                <div>
                  <p><strong>नाम: {formData.nameLocal || '...'}</strong></p>
                  <p>Name: {formData.name || '...'}</p>
                </div>
                <div>
                  <p><strong>{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</strong></p>
                  <p>{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
                </div>
                <div>
                  <p><strong>लिंग / Gender: {formData.gender === 'Female' ? 'महिला / Female' : 'पुरुष / Male'}</strong></p>
                </div>
                <div>
                  <p><strong>आयु / Age: {formData.age || '...'}</strong></p>
                </div>
              </div>
            </div>
            <div className="footer-banner">
              e-Electors Photo Identity Card - ई-निर्वाचक फोटो पहचान पत्र
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div className="card-wrapper">
          <div className="card-inner">
            <div className="back-row">
              <div className="qr-section">
                <div className="qr-box">
                  {qrPlaceholder && <Image src={qrPlaceholder} alt="QR" fill className="object-contain" />}
                </div>
                <div className="text-[8px] font-bold">Scan By VHA/BLO App</div>
              </div>
              <div className="address-section">
                <p className="mb-4">
                  <strong>पता: {formData.addressLocal || '...'}</strong><br />
                  <span className="italic">Address: {formData.address || '...'}</span>
                </p>
                <p className="mt-8 text-[11px]">
                  <strong>निर्वाचक रजिस्ट्रीकरण अधिकारी, {formData.assemblyConstituencyLocal || '...'}</strong><br />
                  <span>Electoral Registration Officer, {formData.assemblyConstituency || '...'}</span>
                </p>
              </div>
            </div>
            <div className="absolute bottom-10 right-4 text-[10px] font-bold">
              Download Date -: {new Date().toLocaleDateString('en-IN')}
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-bold">
              {formData.epicNo}
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px]">
              <span className="font-bold">1950</span>
              <span className="text-blue-600">https://voters.eci.gov.in/</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-sheet-divider"></div>

      {/* Info Sheet Section */}
      <div className="info-main">
        <div className="info-qr-col">
          <div className="big-qr-box">
             {qrPlaceholder && <Image src={qrPlaceholder} alt="Big QR" fill className="object-contain" />}
          </div>
          <div className="text-center">
            <p className="text-[14px] font-bold">Scan By VHA/BLO App</p>
            <p className="text-[12px] mt-4">Download Date -: {new Date().toLocaleDateString('en-IN')}</p>
            <p className="text-[12px] font-bold">मतदान की तारीख / Poll Date : N.A</p>
          </div>
        </div>

        <div className="info-details-col">
          <div className="info-row">
            <span className="info-label">ईपीआईसी संख्या / Epic no. :</span>
            <span className="info-value">{formData.epicNo}</span>
          </div>
          <div className="info-row">
            <span className="info-label">क्रम संख्या / Serial No. :</span>
            <span className="info-value">{formData.serialNo || '...'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">विधानसभा निर्वाचन क्षेत्र :</span>
            <span className="info-value">{formData.assemblyConstituencyLocal} ({formData.assemblyConstituency})</span>
          </div>
          <div className="info-row">
            <span className="info-label">भाग संख्या और नाम / Part :</span>
            <span className="info-value">{formData.partNo} - {formData.partNameLocal} ({formData.partName})</span>
          </div>
          <div className="info-row">
            <span className="info-label">पोलिंग स्टेशन का पता :</span>
            <span className="info-value">{formData.addressLocal}</span>
          </div>
        </div>
      </div>

      {/* Bilingual Instructions */}
      <div className="instructions-box">
        <div className="instruction-header">कृपया ध्यान दें कि / Kindly note that</div>
        <div className="instruction-grid">
          <div className="space-y-3">
            <p>1. eEPIC एक चुनाव के उद्देश्य के लिए पहचान का एक प्रमाण है।</p>
            <p>2. केवल ईपीआईसी रखने से मतदाता सूची में नाम मौजूद होने की कोई गारंटी नहीं है। कृपया प्रत्येक चुनाव से पहले वर्तमान मतदाता सूची में अपना नाम देखें। कृपया www.voters.eci.gov.in का दौरा करें।</p>
            <p>3. इस कार्ड में उल्लिखित जन्म तिथि को मतदाता सूची में पंजीकरण के अलावा किसी अन्य उद्देश्य के लिए आयु या जन्म तिथि के प्रमाण के रूप में नहीं माना जाएगा।</p>
            <p>4. eEPIC पूरे देश में मान्य है, जब तक कि आप भारत में किसी भी निर्वाचन क्षेत्र के लिए मतदाता सूची में नामांकित नहीं हो जाते हैं।</p>
            <p>5. eEPIC प्रामाणिक और सुरक्षित QR कोड रीडर एप्लिकेशन का उपयोग करके सत्यापित किया जा सकता है।</p>
            <p>6. यह इलेक्ट्रॉनिक रूप से उत्पन्न दस्तावेज है।</p>
          </div>
          <div className="space-y-3 italic">
            <p>1. eEPIC is a proof of identity for the purpose of an election.</p>
            <p>2. Mere possession of EPIC is no guarantee of name being present in electoral roll. Please check your name in the current electoral roll before every election. Kindly visit www.voters.eci.gov.in</p>
            <p>3. Date of birth mentioned in this card shall not be treated as proof of age or date of birth for any purpose other than registration in electoral roll.</p>
            <p>4. eEPIC is valid throughout the country, till you are enrolled in electoral roll for any constituency in India.</p>
            <p>5. eEPIC can be verified using authentic and secure QR code reader application.</p>
            <p>6. This is electronically generated document.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
