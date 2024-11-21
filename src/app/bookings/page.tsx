"use client";

import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CalendarIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import getBookings from "@/lib/book/getBookings";
import { BookingItem } from "../../../interfaces";
import { useToast } from "@/hooks/use-toast";
import deleteBooking from "@/lib/book/deleteBooking";
import updateBooking from "@/lib/book/updateBooking";
import Link from "next/link";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [newBookingDate, setNewBookingDate] = useState<string>("");
  const [newCheckoutDate, setNewCheckoutDate] = useState<string>("");

  const { data: session } = useSession();
  const { toast } = useToast();

  const handleFilterChange = (date: string) => {
    setFilterDate(date);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking || !session?.user.token) return;

    try {
      await deleteBooking(selectedBooking._id, session.user.token);
      setBookings(bookings.filter((booking) => booking._id !== selectedBooking._id));
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking || !session?.user.token) return;

    if (!newBookingDate || !newCheckoutDate) {
      toast({
        title: "Invalid Date Range",
        description: "Please select new booking and checkout dates.",
        variant: "destructive"
      });
    }

    const start = new Date(newBookingDate);
    const end = new Date(newCheckoutDate);
    const nights = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      toast({
        title: "Invalid Date Range",
        description: "Booking date cannot be in the past.",
        variant: "destructive"
      });
      return;
    }

    if (end <= start) {
      toast({
        title: "Invalid Date Range",
        description: "Checkout date must be after booking date.",
        variant: "destructive"
      });
      return;
    }

    if (nights > 3) {
      toast({
        title: "Invalid Date Range",
        description: "You can only book up to 3 nights.",
        variant: "destructive"
      });
      return;
    }

    try {
      const updatedBooking = await updateBooking(
        selectedBooking._id,
        { bookingDate: newBookingDate, checkoutDate: newCheckoutDate },
        session.user.token
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? {
                ...booking,
                bookingDate: new Date(updatedBooking.data.bookingDate),
                checkoutDate: new Date(updatedBooking.data.checkoutDate)
              }
            : booking
        )
      );
      toast({
        title: "Booking Updated",
        description: "Your booking dates have been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!session || !session?.user.token) {
      return;
    }

    getBookings(session?.user.token).then((data) => {
      setBookings(
        data.data.map((booking: any) => ({
          ...booking,
          bookingDate: new Date(booking.bookingDate),
          checkoutDate: new Date(booking.checkoutDate)
        }))
      );
    });
  }, [session]);

  const filteredBooking = useMemo(() => {
    if (!filterDate) {
      return bookings.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.bookingDate.getTime() - b.bookingDate.getTime();
        } else {
          return b.bookingDate.getTime() - a.bookingDate.getTime();
        }
      });
    }

    return bookings
      .filter((booking) => booking.bookingDate.toISOString().split("T")[0] >= filterDate)
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.bookingDate.getTime() - b.bookingDate.getTime();
        } else {
          return b.bookingDate.getTime() - a.bookingDate.getTime();
        }
      });
  }, [bookings, filterDate, sortOrder]);

  useEffect(() => {
    if (!selectedBooking) {
      setNewBookingDate("");
      setNewCheckoutDate("");
    }

    if (selectedBooking) {
      setNewBookingDate(selectedBooking.bookingDate.toISOString().split("T")[0]);
      setNewCheckoutDate(selectedBooking.checkoutDate.toISOString().split("T")[0]);
    }
  }, [selectedBooking]);

  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden bg-background">
        <Navbar title="My Bookings" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-auto">
                <Label htmlFor="filter-date" className="sr-only">
                  Filter by date
                </Label>
                <Input
                  id="filter-date"
                  type="date"
                  placeholder="Filter by date"
                  value={filterDate}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="sort-order" className="sr-only">
                  Sort order
                </Label>
                <Select onValueChange={(value: "asc" | "desc") => handleSortChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Oldest first</SelectItem>
                    <SelectItem value="desc">Newest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredBooking.length === 0 ? (
              session ? (
                <p className="text-center text-muted-foreground">No bookings found.</p>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-center text-muted-foreground">You need to be logged in to view your bookings.</p>
                  <Link href="/auth/login">
                    <Button>Sign In</Button>
                  </Link>
                </div>
              )
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredBooking.map((booking) => (
                  <Card key={booking._id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <Image
                        src={booking.campground.picture}
                        alt={booking.campground.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-xl mb-2">{booking.campground.name}</CardTitle>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {booking.bookingDate.toLocaleDateString()} - {booking.checkoutDate.toLocaleDateString()}
                        </p>
                        <p className="flex items-center">
                          <MapPinIcon className="mr-2 h-4 w-4" />
                          {booking.campground.address}, {booking.campground.district}, {booking.campground.province}
                        </p>
                        {booking.campground.tel && (
                          <p className="flex items-center">
                            <PhoneIcon className="mr-2 h-4 w-4" />
                            {booking.campground.tel}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedBooking(booking)}>
                            Change Date
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Change Booking Dates</DialogTitle>
                            <DialogDescription>
                              Update your booking dates for {selectedBooking?.campground.name}. Remember, you can only
                              book up to 3 nights.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="new-booking-date" className="text-right">
                                New Booking Date
                              </Label>
                              <Input
                                id="new-booking-date"
                                type="date"
                                className="col-span-3"
                                value={newBookingDate}
                                onChange={(e) => setNewBookingDate(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="new-checkout-date" className="text-right">
                                New Checkout Date
                              </Label>
                              <Input
                                id="new-checkout-date"
                                type="date"
                                className="col-span-3"
                                value={newCheckoutDate}
                                onChange={(e) => setNewCheckoutDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleUpdateBooking}>
                              Update Booking
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" onClick={() => setSelectedBooking(booking)}>
                            Cancel Booking
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Booking</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel your booking at {selectedBooking?.campground.name}? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                                No, Keep Booking
                              </Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={handleDeleteBooking}>
                              Yes, Cancel Booking
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
