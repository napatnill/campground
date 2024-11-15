import CampingCard from "./CampingCard";

export default function CampingCardPanel() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      <CampingCard campingName="Khao Yai" imgSrc="/images/khao-yai.jpg" />
      <CampingCard campingName="Khao Laem Ya" imgSrc="/images/khao-laem-ya.jpg" />
      <CampingCard campingName="Doi Samer Dao" imgSrc="/images/doi-samer-dao.jpg" />
      <CampingCard campingName="Kaeng Krachan" imgSrc="/images/kaeng-krachan.jpg" />
      <CampingCard campingName="Phu Tub Berk" imgSrc="/images/phu-tub-berk.jpg" />
      <CampingCard campingName="Doi Ang Khang" imgSrc="/images/doi-ang-khang.jpg" />
    </div>
  );
}
