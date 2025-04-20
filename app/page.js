import ImageComponent from "@/components/ImageComponent";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="p-4 min-h-screen max-w-screen overflow-x-hidden flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-transparent">
      <Navbar />
      <div className="my-2">
        <ImageComponent />
      </div>
    </main>
  );
}
