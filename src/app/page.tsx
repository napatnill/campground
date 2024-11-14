import AppLayout from "@/components/layout/app-layout";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Welcome to Campground Website</h1>
            </div>
          </header>
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
