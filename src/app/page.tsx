
"use client";

import React, { useState } from 'react';
import { VoterForm } from '@/components/VoterForm';
import { VoterCardPreview } from '@/components/VoterCardPreview';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Printer, ArrowLeft, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export default function VoterFrontPage() {
  const [step, setStep] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState({
    epicNo: '',
    name: '',
    nameLocal: '',
    fatherHusbandName: '',
    fatherHusbandNameLocal: '',
    relation: 'Father',
    age: '',
    dob: '',
    inputMode: 'age',
    gender: 'Male',
    acNumber: '',
    asmblyName: '',
    asmblyNameLocal: '',
    partNo: '',
    partName: '',
    partNameLocal: '',
    address: '',
    addressLocal: '',
    photoUrl: ''
  });

  const handlePrint = () => {
    window.print();
  };

  const goToPreview = () => {
    setStep('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToEdit = () => {
    setStep('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-foreground pb-12">
      <Toaster />
      
      <div className="no-print container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 mb-8">
           <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <UserCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary">VoterFront</h1>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Digital ID Management Studio</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
              step === 'edit' ? "bg-primary text-white shadow-md" : "text-muted-foreground bg-white border"
            )}>
              <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", step === 'edit' ? "bg-white text-primary" : "bg-muted text-muted-foreground")}>1</div>
              Information
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
              step === 'preview' ? "bg-primary text-white shadow-md" : "text-muted-foreground bg-white border"
            )}>
              <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", step === 'preview' ? "bg-white text-primary" : "bg-muted text-muted-foreground")}>2</div>
              Review & Export
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {step === 'edit' ? (
          <div className="max-w-4xl mx-auto no-print animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl bg-white overflow-hidden">
              <div className="bg-primary/5 px-8 py-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary">Voter Details</h2>
                  <p className="text-sm text-muted-foreground">Enter voter information to generate the card</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary uppercase tracking-widest text-[10px]">
                  Studio Entry
                </Badge>
              </div>
              <CardContent className="p-8">
                <VoterForm formData={formData} setFormData={setFormData} />
                
                <div className="mt-12 flex justify-end border-t pt-8">
                  <Button 
                    size="lg" 
                    onClick={goToPreview} 
                    className="px-12 py-6 text-lg font-bold gap-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    Generate Preview
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="flex flex-col gap-8">
              <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-bold text-slate-800">Final Card Design</h2>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" onClick={goToEdit} className="flex-1 sm:flex-none gap-2 bg-white">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Edit
                  </Button>
                  <Button variant="secondary" onClick={handlePrint} className="flex-1 sm:flex-none gap-2 bg-white border">
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                  <Button onClick={handlePrint} className="flex-1 sm:flex-none gap-2 bg-primary text-white">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center items-center py-10 overflow-x-auto print:p-0">
                <VoterCardPreview formData={formData} />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="no-print container mx-auto px-4 mt-20 text-center text-muted-foreground/60 text-xs">
        <p>&copy; 2024 VoterFront Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
