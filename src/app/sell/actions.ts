'use server';

import { z } from 'zod';

const schema = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
    phone: z.string().min(7, 'Please enter a valid phone number.').optional(),
    deviceType: z.string().min(1, 'Please select a device type.'),
    deviceSubType: z.string().min(1, 'Please select a sub-category.'),
    photo: z.any().optional(), // We will handle file validation separately if needed
  })
  .refine((data) => !!data.email || !!data.phone, {
    message: 'Either email or phone number is required.',
    path: ['phone'],
  });

export async function submitForQuote(prevState: any, formData: FormData) {
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

  // In a real application, you would process this data:
  // 1. Upload the photo to a storage service (e.g., Firebase Storage)
  // 2. Save the details to a database
  // 3. Trigger a notification to the admin
  console.log('Quote Request Submitted:', validatedFields.data);

  return {
    message: 'Thank you! Your quote request has been submitted successfully. We will get back to you soon.',
    isSuccess: true,
  };
}
