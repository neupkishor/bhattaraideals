'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Testimonial } from '../../../lib/types';
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
import { useToast } from '../../../core/hooks/use-toast';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '../../../lib/content';


export default function TestimonialsPage() {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({ title: 'Read-only mode', description: `Testimonial ${id} cannot be deleted without Firebase.` });
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
            {testimonials.map((testimonial) => (
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
                 <TableCell>{format(testimonial.createdAt, 'PPP')}</TableCell>
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
    </div>
  );
}
