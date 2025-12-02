'use client';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Inquiry } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function InquiriesPage() {
  const firestore = useFirestore();
  const inquiriesCollection = useMemoFirebase(() => collection(firestore, 'inquiries'), [firestore]);
  const { data: inquiries, isLoading } = useCollection<Inquiry>(inquiriesCollection);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Inquiries</h1>
      
      {isLoading ? (
        <p>Loading inquiries...</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Offer (NRS)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries?.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>{format(inquiry.inquiryDate.toDate(), 'PPP')}</TableCell>
                  <TableCell className="font-medium">
                    {inquiry.productName || inquiry.productId}
                  </TableCell>
                  <TableCell>{inquiry.userEmail || inquiry.userId}</TableCell>
                  <TableCell>
                    <Badge>{inquiry.offerAmount}</Badge>
                  </TableCell>
                  <TableCell>
                     <Link href={`/manage/inquiries/${inquiry.id}`} className="text-blue-600 hover:underline">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
