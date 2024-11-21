import userRegister from "@/lib/user/userRegister";

describe("userRegister", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should register a user successfully", async () => {
    const mockResponse = {
      id: "12345",
      name: "Test User",
      email: "test@example.com",
      tel: "123456789"
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const result = await userRegister("Test User", "test@example.com", "password123", "123456789");

    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        tel: "123456789"
      })
    });

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when trying to register with the same email", async () => {
    const mockErrorResponse = {
      message: "User with this email already exists"
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 400 });

    await expect(userRegister("Test User", "test@example.com", "password123", "123456789")).rejects.toThrow(
      "User with this email already exists"
    );

    expect(fetchMock).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        tel: "123456789"
      })
    });
  });
});
