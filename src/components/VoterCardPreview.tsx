
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

interface VoterCardPreviewProps {
  formData: any;
}

export function VoterCardPreview({ formData }: VoterCardPreviewProps) {
  const qrPlaceholder = PlaceHolderImages.find(i => i.id === 'qr-code-placeholder')?.imageUrl;
  const signPlaceholder = PlaceHolderImages.find(i => i.id === 'signature-placeholder')?.imageUrl;
  const portraitPlaceholder = PlaceHolderImages.find(i => i.id === 'voter-portrait')?.imageUrl;

  const photoUrl = formData.photoUrl || portraitPlaceholder;

  return (
    <div className="space-y-8 print:space-y-0 print:block">
      {/* Front Card */}
      <div className="relative w-[340px] h-[520px] mx-auto bg-white border border-gray-300 shadow-2xl rounded-[15px] overflow-hidden flex flex-col items-center p-4 card-front print:shadow-none print:border-black/10">
        <div className="w-full text-center border-b border-gray-100 pb-2 mb-4">
          <div className="text-[14px] font-bold text-primary tracking-tight">भारत निर्वाचन आयोग</div>
          <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-widest">Election Commission of India</div>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="relative w-[120px] h-[150px] border-2 border-primary/20 rounded-md overflow-hidden bg-gray-50 mb-4">
            {photoUrl ? (
              <Image 
                src={photoUrl} 
                alt="Voter Portrait" 
                fill 
                className="object-cover"
                data-ai-hint="voter portrait"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                No Photo
              </div>
            )}
          </div>
          
          <div className="bg-primary text-white px-4 py-1 rounded-full text-[13px] font-bold tracking-widest mb-4">
            {formData.epicNo || 'UAF0000000'}
          </div>

          <div className="w-full space-y-3 mt-2 px-2">
            <div className="border-b border-gray-50 pb-1">
              <p className="text-[13px] font-bold text-gray-900">{formData.nameLocal || '...'}</p>
              <p className="text-[11px] font-medium text-gray-500 uppercase">Name: {formData.name || '...'}</p>
            </div>
            
            <div className="border-b border-gray-50 pb-1">
              <p className="text-[12px] font-bold text-gray-900">{formData.relation === 'Husband' ? 'पति' : 'पिता'} का नाम: {formData.fatherHusbandNameLocal || '...'}</p>
              <p className="text-[11px] font-medium text-gray-500 uppercase">{formData.relation}&apos;s Name: {formData.fatherHusbandName || '...'}</p>
            </div>

            <div className="flex justify-between w-full">
              <div>
                <p className="text-[11px] font-semibold text-gray-500">सेक्स / Sex</p>
                <p className="text-[12px] font-bold">{formData.gender === 'Female' ? 'महिला / Female' : 'पुरुष / Male'}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-500">आयु / Age</p>
                <p className="text-[12px] font-bold">{formData.age || '...'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto w-full flex justify-between items-end">
          <div className="relative w-16 h-16 opacity-80">
            {qrPlaceholder && (
              <Image 
                src={qrPlaceholder} 
                alt="QR Code" 
                fill 
                className="object-contain"
              />
            )}
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="relative w-20 h-10 -mb-2">
               {signPlaceholder && (
                 <Image 
                  src={signPlaceholder} 
                  alt="Signature" 
                  fill 
                  className="object-contain"
                />
               )}
            </div>
            <p className="text-[9px] font-bold text-primary">निर्वाचक रजिस्ट्रीकरण अधिकारी</p>
            <p className="text-[8px] font-semibold text-gray-400 uppercase">Electoral Registration Officer</p>
          </div>
        </div>
      </div>

      {/* Back Card */}
      <div className="relative w-[340px] h-[520px] mx-auto bg-white border border-gray-300 shadow-2xl rounded-[15px] overflow-hidden flex flex-col p-5 card-back print:shadow-none print:border-black/10">
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-1">
             <div className="flex items-center gap-2 mb-1">
              <div className="h-[2px] w-4 bg-primary/30"></div>
              <p className="text-[11px] font-bold text-gray-500">ADDRESS / पता</p>
            </div>
            <p className="text-[12px] font-semibold leading-relaxed text-gray-900">{formData.addressLocal || '...'}</p>
            <p className="text-[11px] font-medium leading-tight text-gray-600 uppercase mt-1">{formData.address || '...'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">District / जिला</p>
              <p className="text-[12px] font-bold">{formData.district || '...'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">State / राज्य</p>
              <p className="text-[12px] font-bold">{formData.state || '...'}</p>
            </div>
          </div>

          <Separator className="my-2" />

          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Assembly Constituency / निर्वाचन क्षेत्र</p>
              <p className="text-[12px] font-bold text-primary">{formData.assemblyConstituencyLocal || '...'}</p>
              <p className="text-[11px] font-semibold text-gray-600">{formData.assemblyConstituency || '...'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Part No / भाग संख्या</p>
                <p className="text-[12px] font-bold">{formData.partNo || '...'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Part Name / भाग नाम</p>
                <p className="text-[11px] font-bold truncate">{formData.partName || '...'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
            <p className="text-[9px] font-medium text-gray-500 italic">This card is a digital generation for official verification. Any alteration or misuse is punishable by law.</p>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
             <div className="flex flex-col">
               <span>DATE: {new Date().toLocaleDateString('en-IN')}</span>
               <span className="text-[8px] uppercase">Generated via VoterFront</span>
             </div>
             <div className="w-12 h-12 relative opacity-50 grayscale">
               {qrPlaceholder && (
                 <Image 
                  src={qrPlaceholder} 
                  alt="Barcode" 
                  fill 
                  className="object-contain"
                />
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
