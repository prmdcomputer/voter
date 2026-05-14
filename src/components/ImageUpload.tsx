
"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
}

export function ImageUpload({ currentUrl, onUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onUpload('');
  };

  return (
    <div className="relative group">
      <div className="w-full h-48 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/20 flex flex-col items-center justify-center transition-all group-hover:bg-muted/30 group-hover:border-primary/30 overflow-hidden">
        {currentUrl ? (
          <div className="relative w-full h-full">
            <Image 
              src={currentUrl} 
              alt="Uploaded Portrait" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
               <Button size="icon" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                 <Upload className="w-4 h-4" />
               </Button>
               <Button size="icon" variant="destructive" onClick={handleRemove}>
                 <X className="w-4 h-4" />
               </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground p-6 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Camera className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm font-semibold">Click to Upload</p>
            <p className="text-xs">Portrait Photo (PNG, JPG)</p>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
    </div>
  );
}
