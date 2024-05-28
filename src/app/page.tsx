import MyBanner from "@/components/myBanner.components"
import Offres from "@/components/offers.components"

export default function Home() {
  return (
    <div className="h-max mb-2 py-2 scroll-m-2">
      <MyBanner />
      <Offres />
    </div>
  );
}