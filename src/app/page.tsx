import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden">
          <Navbar title="Welcome to Campground Website" />
          <main className="flex-1 overflow-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Landing Page Content</h2>
            <p className="mb-4">
              Explore the ultimate destination for outdoor enthusiasts—discover top-rated campgrounds, plan your adventure, and experience nature like never before on Campground Website!
            </p>
          </main>
        </div>
    </AppLayout>
  );
}
