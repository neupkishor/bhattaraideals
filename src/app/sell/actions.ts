'use server';

import { z } from 'zod';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const schema = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
    phone: z.string().min(7, 'Please enter a valid phone number.').optional(),
    deviceType: z.string().min(1, 'Please select a device type.'),
    deviceSubType: z.string().min(1, 'Please select a sub-category.'),
    photo: z.string().min(1, 'A photo is required.'), 
  })
  .refine((data) => !!data.email || !!data.phone, {
    message: 'Either email or phone number is required.',
    path: ['phone'],
  });

export async function submitForQuote(prevState: any, formData: FormData) {
  const { firestore } = initializeFirebase();
  const storage = getStorage();

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    deviceType: formData.get('deviceType'),
    deviceSubType: formData.get('deviceSubType'),
    photo: formData.get('photo'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(errorMessages).flat()[0];
    
    return {
      message: firstError ?? 'Invalid data provided. Please check the form.',
      isSuccess: false,
    };
  }

  const { photo, ...requestData } = validatedFields.data;

  try {
    // 1. Upload the photo to Firebase Storage
    const storageRef = ref(storage, `sell-requests/${Date.now()}-${Math.random().toString(36).substring(7)}`);
    const uploadResult = await uploadString(storageRef, photo, 'data_url');
    const photoUrl = await getDownloadURL(uploadResult.ref);

    // 2. Save the details to the 'requests' collection in Firestore
    await addDoc(collection(firestore, 'requests'), {
      ...requestData,
      photoUrl,
      requestDate: new Date(),
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
