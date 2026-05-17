"use client";

import React, { useState } from 'react';
import { VoterForm } from '@/components/VoterForm';
import { VoterCardPreview } from '@/components/VoterCardPreview';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Printer, FileDown, History, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    gender: 'Male',
    tahshil: '',
    district: '',
    state: '',
    houseNo: '',
    assemblyConstituency: '',
    assemblyConstituencyLocal: '',
    partNo: '',
    partName: '',
    partNameLocal: '',
    serialNo: '',
    address: '',
    addressLocal: '',
    targetLanguage: 'Hindi',
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
      {/* Header */}
      <header className="no-print bg-white border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <UserCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary">VoterFront</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Digital ID Management Studio</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {step === 'preview' && (
            <>
              <Button variant="outline" size="sm" onClick={goToEdit} className="items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Edit Details
              </Button>
              <Button onClick={handlePrint} className="items-center gap-2 bg-accent hover:bg-accent/90">
                <Printer className="w-4 h-4" />
                Print PVC Card
              </Button>
            </>
          )}
          {step === 'edit' && (
             <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 text-muted-foreground">
                <History className="w-4 h-4" />
                Recent Records
              </Button>
          )}
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="no-print container mx-auto px-4 mt-6">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
            step === 'edit' ? "bg-primary text-white shadow-md" : "text-muted-foreground bg-white border"
          )}>
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", step === 'edit' ? "bg-white text-primary" : "bg-muted text-muted-foreground")}>1</div>
            Voter Information
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
            step === 'preview' ? "bg-primary text-white shadow-md" : "text-muted-foreground bg-white border"
          )}>
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", step === 'preview' ? "bg-white text-primary" : "bg-muted text-muted-foreground")}>2</div>
            Card Preview & Print
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {step === 'edit' ? (
          <div className="max-w-4xl mx-auto no-print animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl bg-white overflow-hidden">
              <div className="bg-primary/5 px-8 py-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary">Step 1: Voter Details</h2>
                  <p className="text-sm text-muted-foreground">Enter manually or fetch from the ECI Gateway</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary uppercase tracking-widest text-[10px]">
                  Studio Entry Mode
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
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Preview Display */}
              <div className="lg:col-span-12 flex flex-col gap-8">
                <div className="no-print flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold">Ready for Printing</h2>
                  </div>
                </div>
                
                <div className="flex justify-center p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 print:p-0 print:bg-transparent print:shadow-none print:border-none">
                  <VoterCardPreview formData={formData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer Info */}
      <footer className="no-print container mx-auto px-4 mt-20 text-center text-muted-foreground/60 text-xs">
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Contact Support</span>
        </div>
        <p>&copy; 2024 VoterFront Digital ID Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
