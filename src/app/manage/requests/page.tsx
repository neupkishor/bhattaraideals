'use client';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { SellRequest } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import Image from 'next/image';

export default function SellRequestsPage() {
  const firestore = useFirestore();
  const requestsCollection = useMemoFirebase(() => collection(firestore, 'requests'), [firestore]);
  const { data: requests, isLoading } = useCollection<SellRequest>(requestsCollection);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Sell Requests</h1>
      
      {isLoading ? (
        <p>Loading sell requests...</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests?.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{format(request.requestDate.toDate(), 'PPP')}</TableCell>
                   <TableCell>
                    <Image
                      src={request.photoUrl}
                      alt={`${request.deviceType} - ${request.deviceSubType}`}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {request.deviceType} - {request.deviceSubType}
                  </TableCell>
                  <TableCell>{request.email || request.phone}</TableCell>
                  <TableCell>
                     <Link href={`/manage/requests/${request.id}`} className="text-blue-600 hover:underline">
                      View Details
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
