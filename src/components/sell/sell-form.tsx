'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { submitForQuote } from '@/app/sell/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';

const deviceTypes = {
  phone: ['Android', 'iOS'],
  pc: ['PC', 'Laptop', 'Mac'],
  tablet: ['iPad', 'Android'],
  accessory: ['Charger', 'Cable', 'Case', 'Other'],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
        </>
      ) : (
        'Submit for Quote'
      )}
    </Button>
  );
}

export function SellForm() {
  const initialState = { message: null, isSuccess: false };
  const [state, formAction] = useFormState(submitForQuote, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedType, setSelectedType] = useState<keyof typeof deviceTypes | ''>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
        setPhotoPreview(null);
        setSelectedType('');
      } else {
        toast({
          title: 'Oops!',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };


  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 md:p-8">
        <form ref={formRef} action={formAction} className="space-y-6">
          <input type="hidden" name="photo" value={photoPreview || ''} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name (Optional)</Label>
              <Input id="name" name="name" placeholder="John Doe" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number or Email</Label>
              <Input id="phone" name="phone" placeholder="98XXXXXXXX" />
               <p className="text-xs text-muted-foreground">We need at least one contact method.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo-upload">Device Photo</Label>
             <div className="flex items-center gap-4">
              <label htmlFor="photo-upload" className="cursor-pointer flex-grow">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                  {photoPreview ? (
                     <Image src={photoPreview} alt="Device preview" width={128} height={128} className="h-full w-auto object-contain p-2" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8" />
                      <p>Click to upload a photo</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
            <Input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange}/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="deviceType">Device Type</Label>
              <Select name="deviceType" required onValueChange={(value) => setSelectedType(value as keyof typeof deviceTypes)}>
                <SelectTrigger id="deviceType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(deviceTypes).map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceSubType">Sub-Category</Label>
               <Select name="deviceSubType" required disabled={!selectedType}>
                <SelectTrigger id="deviceSubType" >
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent>
                  {selectedType && deviceTypes[selectedType].map((subType) => (
                    <SelectItem key={subType} value={subType}>{subType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
