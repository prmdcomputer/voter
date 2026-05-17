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
          district: data.districtValue?.toUpperCase() || '',
          state: data.stateName?.toUpperCase() || '',
          assemblyConstituency: `${data.acNumber}- ${data.asmblyName}`.toUpperCase(),
          assemblyConstituencyLocal: `${data.acNumber}- ${data.asmblyNameL1}`,
          partNo: data.partNumber || '',
          partName: data.psbuildingName?.toUpperCase() || '',
          partNameLocal: data.psBuildingNameL1 || '',
          serialNo: data.partSerialNumber?.toString() || '',
          address: `${data.partName}, ${data.districtValue}, ${data.stateName}`.toUpperCase(),
          addressLocal: `${data.partNameL1}, ${data.districtValueL1}, ${data.stateNameL1}`
        }));

        toast({
          title: "Voter Record Fetched",
          description: `Data for ${data.epicNumber} retrieved from ECI Gateway.`,
        });
      } else {
        toast({
          title: "No Data Found",
          description: "The API returned an empty response.",
          variant: "destructive"
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
            Voter Photograph
          </Label>
          <ImageUpload 
            currentUrl={formData.photoUrl || ''} 
            onUpload={(url) => setFormData((prev: any) => ({ ...prev, photoUrl: url }))} 
          />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="epicNo" className="flex items-center gap-2">
              Epic Number 
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
              />
              <Button 
                variant="secondary" 
                onClick={handleFetchVoterDetails} 
                disabled={isFetching}
                className="shrink-0 gap-2 font-bold px-6"
              >
                {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                FETCH
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Age / DOB Input Mode</Label>
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
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  name="dob" 
                  type="date" 
                  value={formData.dob || ''} 
                  onChange={handleChange} 
                />
              </div>
            ) : (
              <div className="space-y-2 col-span-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  value={formData.age || ''} 
                  onChange={handleChange} 
                  placeholder="e.g. 26"
                />
              </div>
            )}

            <div className="space-y-2 col-span-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(val) => setFormData((prev: any) => ({ ...prev, gender: val }))} value={formData.gender || 'Male'}>
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
          <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} placeholder="JOHN DOE" className="uppercase font-medium" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameLocal">Name (Regional Script)</Label>
          <Input id="nameLocal" name="nameLocal" value={formData.nameLocal || ''} onChange={handleChange} placeholder="क्षेत्रीय लिपि में नाम" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="relation">Relation</Label>
          <Select onValueChange={(val) => setFormData((prev: any) => ({ ...prev, relation: val }))} value={formData.relation || 'Father'}>
            <SelectTrigger>
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
          <Label htmlFor="fatherHusbandName">Relative Name (English)</Label>
          <Input id="fatherHusbandName" name="fatherHusbandName" value={formData.fatherHusbandName || ''} onChange={handleChange} className="uppercase font-medium" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherHusbandNameLocal">Relative Name (Regional)</Label>
          <Input id="fatherHusbandNameLocal" name="fatherHusbandNameLocal" value={formData.fatherHusbandNameLocal || ''} onChange={handleChange} />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="assemblyConstituency">Assembly No & Name (English)</Label>
          <Input id="assemblyConstituency" name="assemblyConstituency" value={formData.assemblyConstituency || ''} onChange={handleChange} placeholder="286-Bahraich" className="uppercase" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="assemblyConstituencyLocal">Assembly No & Name (Regional Script)</Label>
          <Input id="assemblyConstituencyLocal" name="assemblyConstituencyLocal" value={formData.assemblyConstituencyLocal || ''} onChange={handleChange} placeholder="286 - बहराइच" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="partNo">Part No & Name (English)</Label>
          <div className="flex gap-2">
            <Input id="partNo" name="partNo" value={formData.partNo || ''} onChange={handleChange} placeholder="321" className="w-20" />
            <Input id="partName" name="partName" value={formData.partName || ''} onChange={handleChange} placeholder="PRIMARY SCHOOL" className="flex-1 uppercase" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="partNameLocal">Part No & Name (Regional Script)</Label>
          <Input id="partNameLocal" name="partNameLocal" value={formData.partNameLocal || ''} onChange={handleChange} placeholder="भाग संख्या और नाम क्षेत्रीय में" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">Address (English)</Label>
          <Textarea 
            id="address" 
            name="address" 
            value={formData.address || ''} 
            onChange={handleChange} 
            rows={2}
            className="uppercase"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLocal">Address (Regional Script)</Label>
          <Textarea 
            id="addressLocal" 
            name="addressLocal" 
            value={formData.addressLocal || ''} 
            onChange={handleChange} 
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" name="district" value={formData.district || ''} onChange={handleChange} className="uppercase" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" value={formData.state || ''} onChange={handleChange} className="uppercase" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNo">Serial No</Label>
          <Input id="serialNo" name="serialNo" value={formData.serialNo || ''} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
