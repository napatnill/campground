import Link from "next/link";
import CampingCard from "./CampingCard";

export default async function CampingCardPanel({campgroundsJson}: {campgroundsJson: Promise<CampgroundsJson>}) {

  const campgroundsJsonReady = await campgroundsJson;

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {
        campgroundsJsonReady.data.map( (campgroundItem: CampgroundItem) => {
          return (
            <Link key={campgroundItem.id} href={`/campgrounds/${campgroundItem.id}`}>
              <CampingCard campingName={campgroundItem.name} imgSrc={campgroundItem.picture} />
            </Link>
          );
        })
      }
    </div>
  );
}
