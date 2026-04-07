import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const confidenceData = [
  {
    id: 'imei',
    question: 'How do you verify device IMEI?',
    answer:
      'Every device we receive undergoes a rigorous IMEI check using international databases. This ensures the device is not reported as lost, stolen, or blacklisted. We provide a certificate of this check with every purchase.',
  },
  {
    id: 'warranty',
    question: 'What is your warranty policy?',
    answer:
      "All our 'Brand New' and 'Like New' devices come with a 1-year comprehensive warranty covering all manufacturing defects. 'Certified Used' devices are covered by a 6-month warranty. Accidental damage is not covered.",
  },
  {
    id: 'returns',
    question: 'Can I return a device?',
    answer:
      "Yes, we offer a 14-day 'no questions asked' return policy. If you are not satisfied with your purchase for any reason, you can return it within 14 days for a full refund. The device must be in the same condition you received it in.",
  },
  {
    id: 'authenticity',
    question: 'Are your products authentic?',
    answer:
      "Absolutely. We only sell 100% genuine products. Our 'Certified Used' devices are sourced from trusted partners and go through a 70-point inspection by our certified technicians to ensure they meet original manufacturer standards.",
  },
  {
    id: 'grading',
    question: 'What do your condition grades mean?',
    answer: `
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Brand New:</strong> A device that is sealed in its original packaging, never opened or used.</li>
        <li><strong>Like New:</strong> A device in pristine condition with no visible signs of use. It has been fully tested and is 100% functional. It may come in a generic box with new accessories.</li>
        <li><strong>Certified Used:</strong> A device with minimal signs of wear, such as light scratches that are not visible from a distance. It has passed our 70-point inspection and is fully functional.</li>
      </ul>
    `,
  },
];

export default function ConfidencePage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              The Bhattarai Confidence Zone
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Shop with absolute peace of mind. Here's our promise to you.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {confidenceData.map((item) => (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
