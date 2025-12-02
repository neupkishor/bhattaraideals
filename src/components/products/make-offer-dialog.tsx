'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

export function MakeOfferDialog({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number | ''>('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleMakeOffer = async () => {
    if (!user) {
      initiateAnonymousSignIn(auth);
      toast({
        title: 'Please sign in',
        description:
          'You need to be signed in to make an offer. We have signed you in anonymously. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    if (!offerAmount || offerAmount <= 0) {
      toast({
        title: 'Invalid offer',
        description: 'Please enter a valid offer amount.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const inquiriesRef = collection(firestore, 'inquiries');
      await addDoc(inquiriesRef, {
        productId: product.id,
        productName: product.name,
        userId: user.uid,
        userEmail: user.email || 'Anonymous',
        offerAmount: Number(offerAmount),
        message: message,
        inquiryDate: new Date(),
      });
      toast({
        title: 'Offer Sent!',
        description: 'We have received your offer and will get back to you soon.',
      });
      setOpen(false);
      setMessage('');
      setOfferAmount('');
    } catch (error) {
      console.error('Error sending offer:', error);
      toast({
        title: 'Error',
        description: 'There was a problem sending your offer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="flex-1">
          Make an Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make an Offer on {product.name}</DialogTitle>
          <DialogDescription>
            The listed price is NRS {product.price}. Your offer will be sent to the admin for review.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="offerAmount" className="text-right">
              Offer (NRS)
            </Label>
            <Input
              id="offerAmount"
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="col-span-3"
              placeholder={`e.g., ${product.price * 0.9}`}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              placeholder="Any questions or comments? (Optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleMakeOffer} disabled={isLoading || isUserLoading}>
            {isLoading ? 'Sending...' : 'Send Offer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
