import Image from "next/image";

export default function CampingCard({ campingName, imgSrc }: { campingName: string; imgSrc: string }) {
  return (
    <div className="w-96 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      {/* Card Image */}
      <div className="relative w-full h-48">
        <Image src={imgSrc} alt={campingName} fill className="object-cover rounded-t-lg" />
      </div>
      {/* Card Content */}
      <div className="p-4 bg-white dark:bg-primary-foreground">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{campingName}</h3>
      </div>
    </div>
  );
}
