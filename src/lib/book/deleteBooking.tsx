export default async function deleteBooking(bookingId: string, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Include the token for authentication
      }
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to delete booking");
    }

    return await response.json(); // Return success response
  } catch (error: any) {
    console.error("Error deleting booking:", error.message || error);
    throw new Error(error.message || "Unable to delete booking at this time");
  }
}
