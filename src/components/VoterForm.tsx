
"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ImageUpload';
import { Separator } from '@/components/ui/separator';
import { translateVoterDetailsToLocalLanguage } from '@/ai/flows/translate-voter-details-to-local-language';
import { Languages, Wand2, Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoterFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function VoterForm({ formData, setFormData }: VoterFormProps) {
  const { toast } = useToast();
  const [isTranslating, setIsTranslating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (val: string) => {
    const langMap: Record<string, string> = {
      'HI': 'Hindi',
      'PA': 'Punjabi',
      'GU': 'Gujarati',
      'MR': 'Marathi',
      'TA': 'Tamil',
      'KN': 'Kannada',
      'BN': 'Bengali',
      'TE': 'Telugu',
      'SD': 'Sindhi',
      'OR': 'Oriya'
    };
    setFormData((prev: any) => ({ ...prev, targetLanguage: langMap[val] || 'Hindi' }));
  };

  const handleAutoTranslate = async () => {
    if (!formData.name || !formData.fatherHusbandName || !formData.address) {
      toast({
        title: "Incomplete Details",
        description: "Please fill Name, Father/Husband Name, and Address before translating.",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    try {
      const result = await translateVoterDetailsToLocalLanguage({
        name: formData.name,
        fatherHusbandName: formData.fatherHusbandName,
        address: formData.address,
        targetLanguage: formData.targetLanguage
      });

      setFormData((prev: any) => ({
        ...prev,
        nameLocal: result.nameLocal,
        fatherHusbandNameLocal: result.fatherHusbandNameLocal,
        addressLocal: result.addressLocal
      }));
      
      toast({
        title: "Translation Complete",
        description: `Successfully translated details into ${formData.targetLanguage}.`,
      });
    } catch (error) {
      toast({
        title: "Translation Error",
        description: "Failed to translate details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-semibold flex items-center gap-2">
            Voter Photograph
          </Label>
          <ImageUpload 
            currentUrl={formData.photoUrl} 
            onUpload={(url) => setFormData((prev: any) => ({ ...prev, photoUrl: url }))} 
          />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="epicNo">Epic Number</Label>
            <Input 
              id="epicNo" 
              name="epicNo" 
              value={formData.epicNo} 
              onChange={handleChange}
              placeholder="e.g. UAF3824331"
              className="uppercase font-bold tracking-widest border-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(val) => setFormData((prev: any) => ({ ...prev, gender: val }))} defaultValue={formData.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name (English)</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameLocal">Name (Regional Script)</Label>
          <Input id="nameLocal" name="nameLocal" value={formData.nameLocal} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="relation">Relation</Label>
          <Select onValueChange={(val) => setFormData((prev: any) => ({ ...prev, relation: val }))} defaultValue={formData.relation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Relation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Father">Father</SelectItem>
              <SelectItem value="Husband">Husband</SelectItem>
              <SelectItem value="Mother">Mother</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherHusbandName">Relative Name (English)</Label>
          <Input id="fatherHusbandName" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherHusbandNameLocal">Relative Name (Regional)</Label>
          <Input id="fatherHusbandNameLocal" name="fatherHusbandNameLocal" value={formData.fatherHusbandNameLocal} onChange={handleChange} />
        </div>
      </div>

      <Separator />

      <div className="bg-muted/30 p-4 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Regional Translation Tool</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-2 bg-white"
            onClick={handleAutoTranslate}
            disabled={isTranslating}
          >
            {isTranslating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3 text-accent" />}
            {isTranslating ? 'Translating...' : 'Auto-Translate All'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lang1">Select Target Language</Label>
            <Select onValueChange={handleLanguageChange}>
              <SelectTrigger id="lang1">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HI">Hindi</SelectItem>
                <SelectItem value="PA">Punjabi</SelectItem>
                <SelectItem value="GU">Gujarati</SelectItem>
                <SelectItem value="MR">Marathi</SelectItem>
                <SelectItem value="TA">Tamil</SelectItem>
                <SelectItem value="KN">Kannada</SelectItem>
                <SelectItem value="BN">Bengali</SelectItem>
                <SelectItem value="TE">Telugu</SelectItem>
                <SelectItem value="SD">Sindhi</SelectItem>
                <SelectItem value="OR">Oriya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded text-[11px] text-blue-700">
            <Info className="w-4 h-4 flex-shrink-0" />
            Translating Name, Father Name, and Address fields using advanced AI.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">Voter Address (English)</Label>
          <Textarea 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLocal">Address (Regional Script)</Label>
          <Textarea 
            id="addressLocal" 
            name="addressLocal" 
            value={formData.addressLocal} 
            onChange={handleChange} 
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tahshil">Tahshil</Label>
          <Input id="tahshil" name="tahshil" value={formData.tahshil} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" name="district" value={formData.district} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partNo">Part No</Label>
          <Input id="partNo" name="partNo" value={formData.partNo} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partName">Part Name</Label>
          <Input id="partName" name="partName" value={formData.partName} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
