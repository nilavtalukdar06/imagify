import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-4 h-screen w-screen overflow-hidden flex justify-center items-center">
      <Button variant="outline" className="cursor-pointer">
        Generate Image 💫
      </Button>
    </main>
  );
}
