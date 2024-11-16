import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import getCampground from "@/lib/getCampground";
import Image from "next/image";
import Link from "next/link";

export default async function CampgroundDetailPage({ params }: { params: { id: string } }) {
  const campground = await getCampground(params.id);

  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden bg-background">
        <Navbar title="Campground Details" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
            {/* Title Section */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{campground.data.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore the beauty of {campground.data.name} located in {campground.data.district}.
              </p>
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-64">
                <Image
                  src={campground.data.picture}
                  alt="Campground Picture"
                  fill={true}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="flex-1 text-lg text-gray-700 dark:text-gray-300 space-y-3">
                <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4">
                  <p>
                    <span className="font-semibold">Name:</span> {campground.data.name}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> {campground.data.address}
                  </p>
                  <p>
                    <span className="font-semibold">District:</span> {campground.data.district}
                  </p>
                  <p>
                    <span className="font-semibold">Province:</span> {campground.data.province}
                  </p>
                  <p>
                    <span className="font-semibold">Postal Code:</span> {campground.data.postalcode}
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span> {campground.data.tel}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 text-center">
              <Link href="/">
                <Button className="font-medium">Book This Campground</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
