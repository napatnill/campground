import userRegister from "@/lib/user/userRegister";

import fetchMock from "jest-fetch-mock";
fetchMock.disableMocks();

describe("userRegister with actual backend", () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in .env.local");
  }

  it("should register a user successfully", async () => {
    const userName = "Test User";
    const userEmail = `test${Date.now()}@example.com`; // Unique email for testing
    const userPassword = "password123";
    const userTel = "0123456789";

    const result = await userRegister(userName, userEmail, userPassword, userTel);

    expect(result).toHaveProperty("_id");
    expect(result).toHaveProperty("name", userName);
    expect(result).toHaveProperty("email", userEmail);
  });

  it("should throw an error when trying to register with the same email", async () => {
    const userName = "Test User";
    const userEmail = "test@example.com"; // Use a known duplicate email
    const userPassword = "password123";
    const userTel = "0123456789";

    // First registration to ensure the email exists
    await userRegister(userName, userEmail, userPassword, userTel).catch(() => {});

    // Attempting to register with the same email
    await expect(userRegister(userName, userEmail, userPassword, userTel)).rejects.toThrow(
      "Email is already registered"
    );
  });
});
