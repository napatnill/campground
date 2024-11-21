import getBookings from "@/lib/book/getBookings";
import userLogIn from "@/lib/user/userLogIn";

import fetchMock from "jest-fetch-mock";
fetchMock.disableMocks();

describe("getBookings with actual backend", () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in .env.local");
  }

  it("should return bookings for the user when the role is 'user'", async () => {
    const userData = await userLogIn("tony@gmail.com", "tony1234");

    const userToken = userData.token;
    const response = await getBookings(userToken);
    const result = response.data;

    // Add expectations based on your backend response structure
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0); // Adjust based on expected data
    expect(result[0]).toHaveProperty("_id");
    expect(result[0]).toHaveProperty("user");
    expect(result[0]).toHaveProperty("bookingDate");
  });

  it("should return all bookings when the role is 'admin'", async () => {
    const userData = await userLogIn("admin@gmail.com", "admin1234");

    const adminToken = userData.token;
    const response = await getBookings(adminToken);
    const result = response.data;

    // Add expectations based on your backend response structure
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0); // Adjust based on expected data

    // check if tony booking is in the list by checking 'user' == '6738de6f866c9c86cbae9bbd'
    const tonyBooking = result.find((booking: any) => booking.user === "6738de6f866c9c86cbae9bbd");

    expect(tonyBooking).toBeDefined();
    expect(tonyBooking).toHaveProperty("_id");
    expect(tonyBooking).toHaveProperty("user");
    expect(tonyBooking).toHaveProperty("bookingDate");
  });

  it("should throw an error if the response is not successful", async () => {
    const invalidToken = "invalid-token"; // Use a deliberately invalid token

    await expect(getBookings(invalidToken)).rejects.toThrow("Cannot get user bookings");

    console.log("Invalid token test passed.");
  });
});
