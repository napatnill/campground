import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      {/* Banner Image */}
      <div className="relative w-full h-96">
        <Image src="/images/banner.jpg" alt="Camping Banner" fill className="object-cover rounded-xl" />
      </div>
      {/* Tagline */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
          Discover the Best Camping Spots in Thailand
        </h2>
      </div>
    </div>
  );
}
