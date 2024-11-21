import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import React from "react";
import Home from "@/app/page";

// Mock `getCampgrounds`
jest.mock("@/lib/campground/getCampgrounds", () => {
  return jest.fn(() => [
    { id: 1, name: "Khao yai" },
    { id: 2, name: "Phu Tub Berk" },
    { id: 3, name: "Kaeng Krachan" }
  ]);
});

// Mock `CampingCardPanel`
jest.mock("@/components/CampingCardPanel", () => (props: any) => {
  return (
    <div>
      {props.campgroundsJson.map((campground: any) => (
        <div key={campground.id} id={campground.name}>
          {campground.name}
        </div>
      ))}
    </div>
  );
});

// Mock `useSession`
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated"
  }))
}));

describe("Home Page", () => {
  it("renders campgrounds correctly", async () => {
    render(
      <MemoryRouterProvider>
        <SessionProvider>
          <Home />
        </SessionProvider>
      </MemoryRouterProvider>
    );

    // Assertions
    expect(await screen.findByText("Khao yai")).toBeInTheDocument();
    expect(await screen.findByText("Phu Tub Berk")).toBeInTheDocument();
    expect(await screen.findByText("Kaeng Krachan")).toBeInTheDocument();
  });
});
