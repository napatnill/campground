import Banner from "@/components/Banner";
import CampingCardPanel from "@/components/CampingCardPanel";
import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Navbar title="Welcome to Campground Website!" />
        <main className="flex-1 overflow-auto p-6">
          <Banner />
          <CampingCardPanel />
        </main>
      </div>
    </AppLayout>
  );
}
