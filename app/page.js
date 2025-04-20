import ImageComponent from "@/components/ImageComponent";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-4 h-screen w-screen overflow-hidden flex flex-col justify-center items-center">
      <div className="my-2">
        <ImageComponent />
      </div>
      <Button variant="outline" className="cursor-pointer">
        Generate Image 💫
      </Button>
    </main>
  );
}
