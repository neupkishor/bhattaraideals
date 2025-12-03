'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const schema = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
    phone: z.string().min(7, 'Please enter a valid phone number.').optional(),
    deviceType: z.string().min(1, 'Please select a device type.'),
    deviceSubType: z.string().min(1, 'Please select a sub-category.'),
    originalFilename: z.string().optional(),
  })
  .refine((data) => !!data.email || !!data.phone, {
    message: 'Either email or phone number is required.',
    path: ['phone'],
  });

export async function submitForQuote(prevState: any, formData: FormData) {
  const { firestore } = initializeFirebase();

  const file = formData.get('photo') as File | null;

  if (!file) {
     return {
      message: 'A photo is required.',
      isSuccess: false,
    };
  }

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    deviceType: formData.get('deviceType'),
    deviceSubType: formData.get('deviceSubType'),
    originalFilename: file.name,
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(errorMessages).flat()[0];
    
    return {
      message: firstError ?? 'Invalid data provided. Please check the form.',
      isSuccess: false,
    };
  }
  
  const uploadApiForm = new FormData();
  uploadApiForm.append('file', file);
  uploadApiForm.append('platform', 'p3_bhattaraideals');
  uploadApiForm.append('name', validatedFields.data.originalFilename || 'upload');


  try {
    const uploadResponse = await fetch('https://neupgroup.com/content/bridge/api/upload', {
      method: 'POST',
      body: uploadApiForm,
    });
    
    if (!uploadResponse.ok) {
       const errorBody = await uploadResponse.text();
       console.error('Upload API Error:', errorBody);
       throw new Error(`Upload failed with status: ${uploadResponse.status}`);
    }

    const uploadResult = await uploadResponse.json();

    if (!uploadResult.success) {
        throw new Error(uploadResult.message || 'The upload API returned an error.');
    }

    // Save the details to the 'requests' collection in Firestore
    await addDoc(collection(firestore, 'requests'), {
      ...validatedFields.data,
      photoUrl: uploadResult.url,
      requestDate: serverTimestamp(),
    });

    return {
      message: 'Thank you! Your quote request has been submitted successfully. We will get back to you soon.',
      isSuccess: true,
    };

  } catch (error) {
    console.error('Error submitting quote request:', error);
     return {
      message: 'An error occurred while submitting your request. Please try again.',
      isSuccess: false,
    };
  }
}
