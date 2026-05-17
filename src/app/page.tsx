
"use client";

import React, { useState, useEffect } from 'react';
import { VoterForm } from '@/components/VoterForm';
import { VoterCardPreview } from '@/components/VoterCardPreview';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, ChevronRight, Download, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { verifyPassword } from '@/app/actions/auth';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function VoterFrontPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [step, setStep] = useState<'edit' | 'preview'>('edit');
  const [isDownloading, setIsDownloading] = useState(false);
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
    address: '',
    addressLocal: '',
    photoUrl: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const isValid = await verifyPassword(passwordInput);
      if (isValid) {
        setIsAuthenticated(true);
        toast({ title: "Access Granted", description: "Welcome back." });
      } else {
        toast({ 
          title: "Access Denied", 
          description: "Incorrect password. Please try again.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      toast({ title: "Error", description: "Verification failed.", variant: "destructive" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('voter-card-background');
    if (!element) return;

    setIsDownloading(true);
    toast({
      title: "Preparing PDF",
      description: "Generating high-quality voter ID card...",
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('voter-card-background');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`voter-card-${formData.epicNo || 'preview'}.pdf`);

      toast({
        title: "Download Complete",
        description: "Your voter ID card has been saved.",
      });
    } catch (error) {
      console.error('PDF Generation Error:', error);
      toast({
        title: "Download Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const goToPreview = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStep('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToEdit = () => {
    setStep('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Toaster />
        <Card className="w-full max-w-md shadow-2xl border-none">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Secure Access</CardTitle>
            <CardDescription>Enter password to access the voter card generator</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="py-6 text-lg"
                required
              />
              <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={isVerifying}>
                {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Unlock System"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-foreground pb-12 pt-8">
      <Toaster />
      <main className="container mx-auto px-4">
        {step === 'edit' ? (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={goToPreview}>
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  <VoterForm formData={formData} setFormData={setFormData} />
                  <div className="mt-12 flex justify-end border-t pt-8">
                    <Button 
                      type="submit"
                      size="lg" 
                      className="px-12 py-6 text-lg font-bold gap-3 shadow-lg hover:shadow-xl transition-all"
                    >
                      Generate Preview
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-bold text-slate-800">Review ID Card</h2>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" onClick={goToEdit} className="flex-1 sm:flex-none gap-2 bg-white">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Edit
                  </Button>
                  <Button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-1 sm:flex-none gap-2 bg-primary text-white">
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    Download PDF
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center py-10 overflow-x-auto bg-slate-200/50 rounded-2xl border-2 border-dashed border-slate-300">
                <VoterCardPreview formData={formData} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
