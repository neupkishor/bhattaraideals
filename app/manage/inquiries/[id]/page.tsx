'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, ArrowLeft, User, Package, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import { useToast } from '../../../../core/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { getInquiryById } from '../../../../lib/content';

export default function InquiryDetailPage() {
  const { id } = useParams();
  const inquiry = id ? getInquiryById(id as string) : null;
  const { toast } = useToast();

  const handleDelete = async () => {
    toast({ title: 'Read-only mode', description: 'Inquiry deletion is disabled without Firebase.' });
  };

  if (!inquiry) {
    return <div className="container p-8">Inquiry not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link href="/manage/inquiries" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Inquiries
      </Link>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">Inquiry Details</CardTitle>
              <CardDescription>Inquiry ID: {inquiry.id}</CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the inquiry.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span>Product: <Link href={`/product/${inquiry.productId}`} className="font-medium text-blue-600 hover:underline">{inquiry.productName || inquiry.productId}</Link></span>
            </div>
             <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>From: <span className="font-medium">{inquiry.userEmail || `User ID: ${inquiry.userId}`}</span></span>
            </div>
             <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Date: <span className="font-medium">{format(inquiry.inquiryDate, 'PPP p')}</span></span>
            </div>
            <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>Offer Amount: <Badge className="text-base">NRS {inquiry.offerAmount}</Badge></span>
            </div>
            {inquiry.message && (
                 <div className="flex items-start gap-3 pt-4 border-t">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                        <h4 className="font-semibold">Message</h4>
                        <p className="text-muted-foreground bg-slate-50 p-3 rounded-md mt-1">{inquiry.message}</p>
                    </div>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
