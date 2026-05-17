
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const qrPlaceholder = PlaceHolderImages.find(i => i.id === 'qr-code-placeholder')?.imageUrl;
  const signPlaceholder = PlaceHolderImages.find(i => i.id === 'signature-placeholder')?.imageUrl;
  const portraitPlaceholder = PlaceHolderImages.find(i => i.id === 'voter-portrait')?.imageUrl;

  const photoUrl = formData.photoUrl || portraitPlaceholder;

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white p-4 sm:p-8 shadow-2xl print:shadow-none print:p-0 font-sans text-black border border-gray-100">
      {/* Document Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold leading-tight">भारत निर्वाचन आयोग</h1>
        <h2 className="text-xl font-medium tracking-wide uppercase">ELECTION COMMISSION OF INDIA</h2>
        <div className="h-1 bg-black w-full mt-2 max-w-[600px] mx-auto"></div>
      </div>

      {/* Main Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start justify-items-center">
        {/* Card Front */}
        <div className="relative w-[340px] h-[520px] bg-[#f0f9ff] border-2 border-black rounded-lg overflow-hidden flex flex-col p-4 shadow-lg print:shadow-none">
          {/* Card Header */}
          <div className="text-center border-b border-black/20 pb-2 mb-4">
             <div className="text-[14px] font-bold">भारत निर्वाचन आयोग</div>
             <div className="text-[10px] font-bold uppercase">Election Commission of India</div>
          </div>

          <div className="text-[12px] font-bold mb-4 px-2">
            {formData.epicNo || 'UP/31/153/0000000'}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-[140px] h-[180px] border border-black mb-6 overflow-hidden bg-white">
              {photoUrl && (
                <Image 
                  src={photoUrl} 
                  alt="Voter Portrait" 
                  fill 
                  className="object-cover"
                  data-ai-hint="voter portrait"
                />
              )}
            </div>

            <div className="w-full space-y-4 text-left px-2">
              <div>
                <p className="text-[13px] font-bold">नाम: {formData.nameLocal || '...'}</p>
                <p className="text-[11px] font-bold">Name: {formData.name || '...'}</p>
              </div>
              <div>
                <p className="text-[13px] font-bold">{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</p>
                <p className="text-[11px] font-bold">{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
              </div>
              <div className="flex justify-between items-start">
                 <div>
                    <p className="text-[11px] font-bold">लिंग / Gender:</p>
                    <p className="text-[12px] font-bold">{formData.gender === 'Female' ? 'महिला / Female' : 'पुरुष / Male'}</p>
                 </div>
                 <div>
                    <p className="text-[11px] font-bold">आयु / Age:</p>
                    <p className="text-[12px] font-bold">{formData.age || '...'}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 text-center">
             <p className="text-[10px] font-bold tracking-tighter">e-Electors Photo Identity Card - ई-निर्वाचक फोटो पहचान पत्र</p>
          </div>
        </div>

        {/* Card Back */}
        <div className="relative w-[340px] h-[520px] bg-[#f0f9ff] border-2 border-black rounded-lg overflow-hidden flex flex-col p-4 shadow-lg print:shadow-none">
          <div className="flex gap-4 mb-4">
             <div className="w-[100px] h-[100px] relative border border-black/10 bg-white p-1">
                {qrPlaceholder && (
                  <Image src={qrPlaceholder} alt="QR" fill className="object-contain" />
                )}
             </div>
             <div className="flex-1 space-y-2">
                <p className="text-[11px] font-bold leading-tight">
                  <span className="block mb-1">पता: {formData.addressLocal || '...'}</span>
                  <span className="block italic">Address: {formData.address || '...'}</span>
                </p>
             </div>
          </div>

          <div className="mt-auto space-y-6">
            <div className="text-right">
              <div className="relative w-24 h-12 ml-auto mb-1">
                 {signPlaceholder && (
                   <Image src={signPlaceholder} alt="Sign" fill className="object-contain" />
                 )}
              </div>
              <p className="text-[10px] font-bold">निर्वाचक रजिस्ट्रीकरण अधिकारी</p>
              <p className="text-[10px] font-bold uppercase leading-none">Electoral Registration Officer</p>
              <p className="text-[10px] font-bold text-primary mt-1">{formData.assemblyConstituencyLocal || '...'}</p>
            </div>

            <div className="border-t border-black/20 pt-4 flex justify-between items-end">
               <div className="text-[9px] font-bold text-gray-600">
                 Download Date -: {new Date().toLocaleDateString('en-IN')}
               </div>
               <div className="text-[10px] font-bold tracking-widest">
                 {formData.epicNo || 'UP/31/153/0000000'}
               </div>
            </div>

            <div className="flex justify-between items-center bg-white/50 p-2 rounded">
              <div className="flex items-center gap-1">
                 <span className="text-[10px] font-bold">1950</span>
              </div>
              <div className="text-[9px] font-bold lowercase text-blue-600">
                https://voters.eci.gov.in/
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sheet Section */}
      <div className="mt-8 border-t-2 border-[#b04757] pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48 border-4 border-[#90fd90] p-2 bg-white">
               {qrPlaceholder && (
                  <Image src={qrPlaceholder} alt="Big QR" fill className="object-contain" />
               )}
            </div>
            <p className="text-[12px] font-bold mt-2">Scan By VHA/BLO App</p>
            <div className="mt-4 text-center">
              <p className="text-[11px] font-bold text-gray-500">Download Date -: {new Date().toLocaleDateString('en-IN')}</p>
              <p className="text-[11px] font-bold">मतदान की तारीख / Poll Date : N.A</p>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-4">
             <div className="flex justify-between border-b pb-1">
                <span className="text-[14px] font-bold">ईपीआईसी संख्या / Epic no. :</span>
                <span className="text-[14px] font-bold">{formData.epicNo || '...'}</span>
             </div>
             <div className="flex justify-between border-b pb-1">
                <span className="text-[14px] font-bold">भाग संख्या और नाम / Part No. and Name :</span>
                <div className="text-right">
                   <p className="text-[13px] font-bold">{formData.partNo || '...'} - {formData.partNameLocal || '...'}</p>
                   <p className="text-[12px] font-bold text-gray-600 uppercase italic">{formData.partName || '...'}</p>
                </div>
             </div>
             <div className="flex justify-between border-b pb-1">
                <span className="text-[14px] font-bold">विधानसभा निर्वाचन क्षेत्र संख्या और नाम / AC No. and Name :</span>
                <div className="text-right">
                  <p className="text-[13px] font-bold">{formData.assemblyConstituencyLocal || '...'}</p>
                  <p className="text-[12px] font-bold text-gray-600 uppercase italic">{formData.assemblyConstituency || '...'}</p>
                </div>
             </div>
             <div className="flex justify-between border-b pb-1">
                <span className="text-[14px] font-bold">पोलिंग स्टेशन का पता / Polling Station Address :</span>
                <p className="text-[12px] font-bold text-right">{formData.addressLocal || '...'}</p>
             </div>
          </div>
        </div>

        {/* Detailed Instructions */}
        <div className="mt-8 border-2 border-[#b04757] p-6 bg-[#fffcfc] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
            <h4 className="text-[14px] font-black uppercase text-[#b04757]">कृपया ध्यान दें कि / Kindly note that</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
            <div className="space-y-3 text-[11px] font-medium leading-relaxed">
              <p>1. eEPIC एक चुनाव के उद्देश्य के लिए पहचान का एक प्रमाण है।</p>
              <p>2. केवल ईपीआईसी रखने से मतदाता सूची में नाम मौजूद होने की कोई गारंटी नहीं है। कृपया प्रत्येक चुनाव से पहले वर्तमान मतदाता सूची में अपना नाम देखें। कृपया www.voters.eci.gov.in का दौरा करें।</p>
              <p>3. इस कार्ड में उल्लिखित जन्म तिथि को मतदाता सूची में पंजीकरण के अलावा किसी अन्य उद्देश्य के लिए आयु या जन्म तिथि के प्रमाण के रूप में नहीं माना जाएगा।</p>
              <p>4. eEPIC पूरे देश में मान्य है, जब तक कि आप भारत में किसी भी निर्वाचन क्षेत्र के लिए मतदाता सूची में नामांकित नहीं हो जाते हैं।</p>
              <p>5. eEPIC प्रामाणिक और सुरक्षित QR कोड रीडर एप्लिकेशन का उपयोग करके सत्यापित किया जा सकता है।</p>
              <p>6. यह इलेक्ट्रॉनिक रूप से उत्पन्न दस्तावेज है।</p>
            </div>
            <div className="space-y-3 text-[11px] font-medium leading-relaxed italic">
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
    </div>
  );
}
