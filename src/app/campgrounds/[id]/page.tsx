"use client";

import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import getCampground from "@/lib/campground/getCampground";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CampgroundItem } from "../../../../interfaces";
import addBooking from "@/lib/book/addBooking";
import { useSession } from "next-auth/react";

// Mock function to simulate API call
async function mockAddBooking(bookingData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  if (Math.random() > 0.2) {
    // 80% success rate
    return { success: true, data: { id: "booking-123", ...bookingData } };
  } else {
    throw new Error("Booking failed. Please try again.");
  }
}

export default function CampgroundDetailPage({ params }: { params: { id: string } }) {
  const [bookingDate, setBookingDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [campground, setCampground] = useState<CampgroundItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const { toast } = useToast();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate dates
      const start = new Date(bookingDate);
      const end = new Date(checkoutDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        throw new Error("Booking date cannot be in the past");
      }

      if (end <= start) {
        throw new Error("Checkout date must be after booking date");
      }

      const nights = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      if (nights > 3) {
        throw new Error("You can only book up to 3 nights");
      }

      if (!campground?._id) {
        throw new Error("Campground not found");
      }

      if (!session?.user || !session.user.token) {
        throw new Error("Please login to book this campground");
      }

      // Mock API call
      const result = await addBooking(campground._id, bookingDate, checkoutDate, session?.user.token as string);

      console.log("Booking result:", result);

      toast({
        title: "Booking Successful",
        description: `Your booking has been confirmed for ${nights} night(s).`
      });

      // Reset form
      setBookingDate("");
      setCheckoutDate("");
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!params.id) return;
    setIsDataLoading(true);
    getCampground(params.id)
      .then((data) => {
        setCampground(data.data);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, [params.id]);

  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden bg-background">
        <Navbar title="Campground Details" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
            {/* Title Section */}
            <div className="text-center mb-6">
              {isDataLoading ? (
                <>
                  <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{campground?.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Explore the beauty of {campground?.name} located in {campground?.district}.
                  </p>
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-64">
                {isDataLoading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <Image
                    src={campground?.picture || "/placeholder.svg"}
                    alt="Campground Picture"
                    fill={true}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 text-lg text-gray-700 dark:text-gray-300 space-y-3">
                <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4">
                  {isDataLoading ? (
                    <>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-6 w-1/3 mb-2" />
                      <Skeleton className="h-6 w-1/4" />
                    </>
                  ) : (
                    <>
                      <p>
                        <span className="font-semibold">Name:</span> {campground?.name}
                      </p>
                      <p>
                        <span className="font-semibold">Address:</span> {campground?.address}
                      </p>
                      <p>
                        <span className="font-semibold">District:</span> {campground?.district}
                      </p>
                      <p>
                        <span className="font-semibold">Province:</span> {campground?.province}
                      </p>
                      <p>
                        <span className="font-semibold">Postal Code:</span> {campground?.postalcode}
                      </p>
                      <p>
                        <span className="font-semibold">Tel:</span> {campground?.tel}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Book This Campground</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookingDate">Booking Date</Label>
                    <Input
                      id="bookingDate"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      disabled={isDataLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkoutDate">Checkout Date</Label>
                    <Input
                      id="checkoutDate"
                      type="date"
                      value={checkoutDate}
                      onChange={(e) => setCheckoutDate(e.target.value)}
                      required
                      disabled={isDataLoading}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || isDataLoading}>
                  {isLoading ? "Booking..." : "Book Now"}
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
