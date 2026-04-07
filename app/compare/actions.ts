'use server';

import { z } from 'zod';
import { products } from '../../lib/products';

function buildComparison(device1: (typeof products)[number], device2: (typeof products)[number]) {
  const firstSpecs = device1.specs ?? {};
  const secondSpecs = device2.specs ?? {};
  const allKeys = Array.from(new Set([...Object.keys(firstSpecs), ...Object.keys(secondSpecs)]));

  const lines = [
    `${device1.name} (${device1.condition}) vs ${device2.name} (${device2.condition})`,
    '',
    `Price: NRS ${device1.price} vs NRS ${device2.price}`,
    `Availability: ${device1.availability} vs ${device2.availability}`,
    '',
    'Specs',
  ];

  for (const key of allKeys) {
    const a = firstSpecs[key] ?? 'N/A';
    const b = secondSpecs[key] ?? 'N/A';
    lines.push(`- ${key}: ${a} | ${b}`);
  }

  return lines.join('\n');
}

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

  try {
    return {
      message: 'Comparison generated.',
      comparison: buildComparison(device1, device2),
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        'An error occurred while generating the comparison. Please try again.',
      comparison: null,
    };
  }
}
