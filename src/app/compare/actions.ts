'use server';

import { compareDevices } from '@/ai/flows/compare-devices-side-by-side';
import { z } from 'zod';
import { products } from '@/lib/products';

const schema = z.object({
  device1Id: z.string().min(1, 'Please select the first device.'),
  device2Id: z.string().min(1, 'Please select the second device.'),
});

export async function getComparison(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    device1Id: formData.get('device1'),
    device2Id: formData.get('device2'),
  });

  if (!validatedFields.success) {
    return {
      message:
        validatedFields.error.errors[0]?.message ??
        'Invalid selection. Please select two devices.',
      comparison: null,
    };
  }

  const { device1Id, device2Id } = validatedFields.data;

  if (device1Id === device2Id) {
    return {
      message: 'Please select two different devices to compare.',
      comparison: null,
    };
  }

  const device1 = products.find((p) => p.id === device1Id);
  const device2 = products.find((p) => p.id === device2Id);

  if (!device1 || !device2) {
    return {
      message: 'One or more selected devices could not be found.',
      comparison: null,
    };
  }

  const device1Name = `${device1.name} (${device1.condition})`;
  const device2Name = `${device2.name} (${device2.condition})`;

  try {
    const result = await compareDevices({
      device1: device1Name,
      device2: device2Name,
    });
    return { message: 'Comparison generated.', comparison: result.comparison };
  } catch (error) {
    console.error(error);
    return {
      message:
        'An error occurred while generating the comparison. Please try again.',
      comparison: null,
    };
  }
}
