
"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ImageUpload';
import { Separator } from '@/components/ui/separator';
import { fetchVoterFromECI } from '@/app/actions/eci-api';
import { Loader2, Search, Calendar, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VoterFormProps {
  formData: any;
  setFormData: (data: any | ((prev: any) => any)) => void;
}

export function VoterForm({ formData, setFormData }: VoterFormProps) {
  const { toast } = useToast();
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFetchVoterDetails = async () => {
    setIsFetching(true);
    
    try {
      const response = await fetchVoterFromECI();

      if (response.error) {
        toast({
          title: "ECI Fetch Error",
          description: response.message,
          variant: "destructive"
        });
        return;
      }

      if (response.data && response.data.content) {
        const data = response.data.content;
        const relationMap: Record<string, string> = {
          'FTHR': 'Father',
          'HUSB': 'Husband',
          'MTHR': 'Mother',
          'OTHR': 'Other'
        };

        setFormData((prev: any) => ({
          ...prev,
          epicNo: data.epicNumber || prev.epicNo || '',
          name: `${data.applicantFirstName} ${data.applicantLastName}`.toUpperCase(),
          nameLocal: data.fullNameL1 || '',
          fatherHusbandName: `${data.relationName} ${data.relationLName}`.toUpperCase(),
          fatherHusbandNameLocal: data.relativeFullNameL1 || '',
          relation: relationMap[data.relationType] || 'Father',
          age: data.age?.toString() || '',
          gender: data.gender === 'F' ? 'Female' : 'Male',
          acNumber: data.acNumber || '',
          asmblyName: data.asmblyName?.toUpperCase() || '',
          asmblyNameLocal: data.asmblyNameL1 || '',
          address: `${data.psbuildingName}, ${data.districtValue}, ${data.stateName}`.toUpperCase(),
          addressLocal: `${data.psBuildingNameL1}, ${data.districtValueL1}, ${data.stateNameL1}`
        }));

        toast({
          title: "Voter Record Fetched",
          description: `Data for ${data.epicNumber} retrieved from ECI Gateway.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Client Error",
        description: "Failed to communicate with Server Action.",
        variant: "destructive"
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-semibold flex items-center gap-2">
            Voter Photograph <span className="text-destructive">*</span>
          </Label>
          <ImageUpload 
            currentUrl={formData.photoUrl || ''} 
            onUpload={(url) => setFormData((prev: any) => ({ ...prev, photoUrl: url }))} 
          />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="epicNo" className="flex items-center gap-2">
              Epic Number <span className="text-destructive">*</span>
              <span className="text-[10px] text-muted-foreground font-normal tracking-wide">(Direct Gateway Fetch)</span>
            </Label>
            <div className="flex gap-2">
              <Input 
                id="epicNo" 
                name="epicNo" 
                value={formData.epicNo || ''} 
                onChange={handleChange}
                placeholder="EPIC NO."
                className="uppercase font-bold tracking-widest border-primary/20 flex-1"
                required
              />
              <Button 
                variant="secondary" 
                onClick={handleFetchVoterDetails} 
                disabled={isFetching}
                className="shrink-0 gap-2 font-bold px-6"
                type="button"
              >
                {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                FETCH
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Age / DOB Input Mode <span className="text-destructive">*</span></Label>
              <Tabs 
                value={formData.inputMode || 'age'} 
                onValueChange={(val) => setFormData((prev: any) => ({ ...prev, inputMode: val }))}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="age" className="gap-2">
                    <Hash className="w-4 h-4" />
                    Enter Age
                  </TabsTrigger>
                  <TabsTrigger value="dob" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Enter DOB
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {formData.inputMode === 'dob' ? (
              <div className="space-y-2 col-span-2">
                <Label htmlFor="dob">Date of Birth <span className="text-destructive">*</span></Label>
                <Input 
                  id="dob" 
                  name="dob" 
                  type="date" 
                  value={formData.dob || ''} 
                  onChange={handleChange} 
                  required
                />
              </div>
            ) : (
              <div className="space-y-2 col-span-2">
                <Label htmlFor="age">Age <span className="text-destructive">*</span></Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  value={formData.age || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. 26"
                  required
                />
              </div>
            )}

            <div className="space-y-2 col-span-2">
              <Label htmlFor="gender">Gender <span className="text-destructive">*</span></Label>
              <Select onValueChange={(val) => setFormData((prev: any) => ({ ...prev, gender: val }))} value={formData.gender || 'Male'}>
                <SelectTrigger id="gender">
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
          <Label htmlFor="name">Full Name (English) <span className="text-destructive">*</span></Label>
          <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} placeholder="JOHN DOE" className="uppercase font-medium" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameLocal">Name (Regional Script) <span className="text-destructive">*</span></Label>
          <Input id="nameLocal" name="nameLocal" value={formData.nameLocal || ''} onChange={handleChange} placeholder="क्षेत्रीय लिपि में नाम" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="relation">Relation <span className="text-destructive">*</span></Label>
          <Select onValueChange={(val) => setFormData((prev: any) => ({ ...prev, relation: val }))} value={formData.relation || 'Father'}>
            <SelectTrigger id="relation">
              <SelectValue placeholder="Relation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Father">Father</SelectItem>
              <SelectItem value="Husband">Husband</SelectItem>
              <SelectItem value="Mother">Mother</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherHusbandName">Relative Name (English) <span className="text-destructive">*</span></Label>
          <Input id="fatherHusbandName" name="fatherHusbandName" value={formData.fatherHusbandName || ''} onChange={handleChange} className="uppercase font-medium" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherHusbandNameLocal">Relative Name (Regional) <span className="text-destructive">*</span></Label>
          <Input id="fatherHusbandNameLocal" name="fatherHusbandNameLocal" value={formData.fatherHusbandNameLocal || ''} onChange={handleChange} required />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="acNumber">Assembly No <span className="text-destructive">*</span></Label>
          <Input id="acNumber" name="acNumber" value={formData.acNumber || ''} onChange={handleChange} placeholder="286" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="asmblyName">Assembly Name (English) <span className="text-destructive">*</span></Label>
          <Input id="asmblyName" name="asmblyName" value={formData.asmblyName || ''} onChange={handleChange} placeholder="BAHRAICH" className="uppercase" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="asmblyNameLocal">Assembly Name (Regional) <span className="text-destructive">*</span></Label>
          <Input id="asmblyNameLocal" name="asmblyNameLocal" value={formData.asmblyNameLocal || ''} onChange={handleChange} placeholder="बहराइच" required />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">Address (English) <span className="text-destructive">*</span></Label>
          <Textarea 
            id="address" 
            name="address" 
            value={formData.address || ''} 
            onChange={handleChange} 
            rows={2}
            className="uppercase"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLocal">Address (Regional Script) <span className="text-destructive">*</span></Label>
          <Textarea 
            id="addressLocal" 
            name="addressLocal" 
            value={formData.addressLocal || ''} 
            onChange={handleChange} 
            rows={2}
            required
          />
        </div>
      </div>
    </div>
  );
}
