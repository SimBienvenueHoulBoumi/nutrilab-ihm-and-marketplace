import MyBanner from "@/components/myBanner.components"
import Offres from "@/components/offers.components"
import RandomElement from "@/components/randomElement.components"

export default function Home() {
  return (
    <div className="h-max scroll-m-2">
      <MyBanner />
      <div className="bg-[#8cafa4]">
        <Offres />
      </div>
      <RandomElement />
    </div>
  );
}