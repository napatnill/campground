import Banner from "@/components/Banner";
import CampingCardPanel from "@/components/CampingCardPanel";
import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/layout/navbar";
import SkeletonCardFallback from "@/components/SkeletonCardFallback";

import getCampgrounds from "@/lib/campground/getCampgrounds";
import { Suspense } from "react";

export default function Home() {
  const campgrounds = getCampgrounds();

  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Navbar title="Welcome to JoJo Campground Website!" />
        <main className="flex-1 overflow-auto p-6">
          <Banner />
          <Suspense fallback={<SkeletonCardFallback count={6} />}> {/* Set a default count */}
            <CampingCardPanel campgroundsJson={campgrounds} />
          </Suspense>
        </main>
      </div>
    </AppLayout>
  );
}
