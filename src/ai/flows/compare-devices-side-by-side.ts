'use server';
/**
 * @fileOverview Compares two devices side-by-side using AI to highlight key differences and relevant information.
 *
 * - compareDevices - A function that handles the device comparison process.
 * - CompareDevicesInput - The input type for the compareDevices function.
 * - CompareDevicesOutput - The return type for the compareDevices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareDevicesInputSchema = z.object({
  device1: z.string().describe('The name of the first device to compare (e.g., iPhone 14 Pro).'),
  device2: z.string().describe('The name of the second device to compare (e.g., iPhone 15).'),
});
export type CompareDevicesInput = z.infer<typeof CompareDevicesInputSchema>;

const CompareDevicesOutputSchema = z.object({
  comparison: z.string().describe('A detailed comparison of the two devices, highlighting key differences and relevant information to the user.'),
});
export type CompareDevicesOutput = z.infer<typeof CompareDevicesOutputSchema>;

export async function compareDevices(input: CompareDevicesInput): Promise<CompareDevicesOutput> {
  return compareDevicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareDevicesPrompt',
  input: {schema: CompareDevicesInputSchema},
  output: {schema: CompareDevicesOutputSchema},
  prompt: `You are a tech expert comparing two devices for a user to help them make a buying decision.

  Compare the following devices, highlighting the key differences in specs, camera, battery life, price, and condition.  If a characteristic would affect the user's buying decision, be sure to include that information in the comparison.

  Device 1: {{{device1}}}
  Device 2: {{{device2}}}
  `,
});

const compareDevicesFlow = ai.defineFlow(
  {
    name: 'compareDevicesFlow',
    inputSchema: CompareDevicesInputSchema,
    outputSchema: CompareDevicesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
