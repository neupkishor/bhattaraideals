'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, ArrowLeft, User, Phone, Mail as MailIcon, HardDrive, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import { getRequestById } from '@/lib/content';

export default function RequestDetailPage() {
  const { id } = useParams();
  const request = id ? getRequestById(id as string) : null;
  const { toast } = useToast();

  const handleDelete = async () => {
    toast({ title: 'Read-only mode', description: 'Request deletion is disabled without Firebase.' });
  };

  if (!request) {
    return <div className="container p-8">Request not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link href="/manage/requests" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Requests
      </Link>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">Sell Request Details</CardTitle>
              <CardDescription>Request ID: {request.id}</CardDescription>
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
                    This will permanently delete this sell request.
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
        <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Date: <span className="font-medium">{format(request.requestDate, 'PPP p')}</span></span>
                </div>
                <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
                 <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>Name: <span className="font-medium">{request.name || 'Not provided'}</span></span>
                </div>
                 <div className="flex items-center gap-3">
                    <MailIcon className="h-5 w-5 text-muted-foreground" />
                    <span>Email: <span className="font-medium">{request.email || 'Not provided'}</span></span>
                </div>
                 <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>Phone: <span className="font-medium">{request.phone || 'Not provided'}</span></span>
                </div>

                <h3 className="font-semibold text-lg border-b pb-2 pt-4">Device Information</h3>
                 <div className="flex items-center gap-3">
                    <HardDrive className="h-5 w-5 text-muted-foreground" />
                    <span>Device: <span className="font-medium">{request.deviceType} - {request.deviceSubType}</span></span>
                </div>

                <Button className="mt-4">Create Product Listing</Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Device Photo</h3>
              <Image
                src={request.photoUrl}
                alt={`${request.deviceType} - ${request.deviceSubType}`}
                width={500}
                height={500}
                className="rounded-lg object-cover w-full aspect-square"
              />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
