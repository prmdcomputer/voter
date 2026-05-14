
"use client";

import React, { useState, useEffect } from 'react';
import { VoterForm } from '@/components/VoterForm';
import { VoterCardPreview } from '@/components/VoterCardPreview';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Printer, FileDown, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VoterFrontPage() {
  const [formData, setFormData] = useState({
    epicNo: 'UAF3824331',
    name: 'POOJA DEVI',
    nameLocal: 'पूजा देवी',
    fatherHusbandName: 'VINOD KUMAR',
    fatherHusbandNameLocal: 'विनोद कुमार',
    relation: 'Husband',
    age: '26',
    dob: '01/01/1998',
    gender: 'Female',
    tahshil: 'PAYAGPUR',
    district: 'BAHRAICH',
    state: 'UTTAR PRADESH',
    houseNo: '124',
    assemblyConstituency: '286- BAHRAICH',
    assemblyConstituencyLocal: '286- बहराइच',
    partNo: '372',
    partName: 'HARAIYYA',
    partNameLocal: 'हर्रैया',
    address: 'HARAIYYA PAYAGPUR BAHRAICH UTTAR PRADESH 271870',
    addressLocal: 'हर्रैया पयागपुर बहराइच उत्तर प्रदेश 271870',
    targetLanguage: 'Hindi',
    photoUrl: 'https://picsum.photos/seed/voter1/200/250'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* Header */}
      <header className="no-print bg-white border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <UserCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary">VoterFront</h1>
            <p className="text-xs text-muted-foreground font-medium">Digital ID Management Studio</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
            <History className="w-4 h-4" />
            Voter Records
          </Button>
          <Button variant="outline" size="sm" className="items-center gap-2">
            <FileDown className="w-4 h-4" />
            Export Data
          </Button>
          <Button onClick={handlePrint} className="items-center gap-2 bg-accent hover:bg-accent/90">
            <Printer className="w-4 h-4" />
            Print Cards
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Section */}
          <div className="lg:col-span-7 no-print">
            <Card className="border-none shadow-xl bg-white overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
                    <UserCheck className="w-5 h-5" />
                    Fetch & Edit Voter Details
                  </h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    Draft v1.2
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <VoterForm formData={formData} setFormData={setFormData} />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="flex flex-col gap-8">
              <div className="no-print flex items-center justify-between">
                <h2 className="text-lg font-semibold text-muted-foreground">Live Card Preview</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Front & Back</Badge>
                </div>
              </div>
              
              <VoterCardPreview formData={formData} />
              
              <Card className="no-print bg-accent/5 border-accent/20">
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Printer className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Print Layout Ready</h4>
                    <p className="text-xs text-muted-foreground">This preview is exactly what will appear on the printed PVC card. Ensure all regional text is accurate.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Info */}
      <footer className="no-print container mx-auto px-4 mt-12 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 VoterFront App. Authorized access only.</p>
      </footer>
    </div>
  );
}
