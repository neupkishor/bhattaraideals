'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import type { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function TestimonialsPage() {
  const firestore = useFirestore();
  const testimonialsCollection = useMemoFirebase(() => query(collection(firestore, 'testimonials'), orderBy('createdAt', 'desc')), [firestore]);
  const { data: testimonials, isLoading } = useCollection<Testimonial>(testimonialsCollection);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteDoc(doc(firestore, 'testimonials', id));
        toast({ title: 'Testimonial deleted successfully.' });
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast({
          title: 'Error deleting testimonial.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button asChild>
          <Link href="/manage/testimonials/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Testimonial
          </Link>
        </Button>
      </div>
      
      {isLoading ? (
        <p>Loading testimonials...</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials?.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                     {testimonial.name}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.quote}</TableCell>
                   <TableCell>{format(testimonial.createdAt.toDate(), 'PPP')}</TableCell>
                  <TableCell className="flex gap-2">
                     <Button variant="outline" size="icon" asChild>
                      <Link href={`/manage/testimonials/${testimonial.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
