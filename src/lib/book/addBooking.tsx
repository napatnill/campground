export default async function addBooking(
  campgroundId: string,
  bookingDate: string,
  checkoutDate: string,
  token: string
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${campgroundId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Use the access token
      },
      body: JSON.stringify({
        bookingDate,
        checkoutDate
      })
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to add booking");
    }

    return await response.json(); // Return the booking data on success
  } catch (error: any) {
    console.error("Error adding booking:", error.message || error);
    throw new Error(error.message || "Unable to process booking at this time");
  }
}
