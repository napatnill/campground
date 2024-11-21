import getBookings from "@/lib/book/getBookings";

describe("getBookings", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return bookings for the user when the role is 'user'", async () => {
    const userToken = "user-token";
    const mockUserBookings = [
      { id: 1, user: "user1", details: "Booking details 1" },
      { id: 2, user: "user1", details: "Booking details 2" }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockUserBookings), { status: 200 });

    const result = await getBookings(userToken);

    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userToken}`
      }
    });

    expect(result).toEqual(mockUserBookings);
  });

  it("should return all bookings when the role is 'admin'", async () => {
    const adminToken = "admin-token";
    const mockAllBookings = [
      { id: 1, user: "user1", details: "Booking details 1" },
      { id: 2, user: "user2", details: "Booking details 2" },
      { id: 3, user: "user3", details: "Booking details 3" }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockAllBookings), { status: 200 });

    const result = await getBookings(adminToken);

    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${adminToken}`
      }
    });

    expect(result).toEqual(mockAllBookings);
  });

  it("should throw an error if the response is not successful", async () => {
    const invalidToken = "invalid-token";

    fetchMock.mockResponseOnce("", { status: 403 });

    await expect(getBookings(invalidToken)).rejects.toThrow("Cannot get user bookings");

    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${invalidToken}`
      }
    });
  });
});
