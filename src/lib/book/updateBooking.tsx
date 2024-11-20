export default async function updateBooking(
  bookingId: string,
  updates: { bookingDate?: string; checkoutDate?: string },
  token: string
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Include the token for authentication
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update booking");
    }

    return await response.json(); // Return updated booking data on success
  } catch (error: any) {
    console.error("Error updating booking:", error.message || error);
    throw new Error(error.message || "Unable to update booking at this time");
  }
}
