import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Mail, GitPullRequest, Star } from "lucide-react";

export default function ManageDashboard() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Management Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package />
              Products
            </CardTitle>
            <CardDescription>
              Add, edit, and manage your product listings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/manage/products">Manage Products</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail />
              Inquiries
            </CardTitle>
            <CardDescription>
              View and respond to customer inquiries and offers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/manage/inquiries">View Inquiries</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest />
              Sell Requests
            </CardTitle>
            <CardDescription>
              Review requests from users wanting to sell their devices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/manage/requests">Review Requests</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star />
              Testimonials
            </CardTitle>
            <CardDescription>
              Manage customer testimonials shown on the homepage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/manage/testimonials">Manage Testimonials</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
