import MyBanner from "@/components/myBanner.components"

export default function Home() {
  return (
    <>
      <div className="fixed inset-x-0 p-4">
        <MyBanner />
      </div>
    </>
  );
}