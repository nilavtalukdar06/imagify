import ImageComponent from "@/components/ImageComponent";

export default function Home() {
  return (
    <main className="p-4 h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-transparent">
      <div className="my-2">
        <ImageComponent />
      </div>
    </main>
  );
}
