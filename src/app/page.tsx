import Image from "next/image";
import { MAIN_LOGO } from "@/assets";
import { SEARCH_BAR, EXPLORER } from "@/components"


export default function Home() {
  return (
    <main id="home" className="flex min-h-screen h-full flex-col items-center justify-between">
          <Image src={MAIN_LOGO} alt="logo"
          className="w-full h-auto mt-2 max-w-[750px]"
          />
          <div className="w-full max-w-3xl h-full flex justify-center items-center">
            <SEARCH_BAR />
          </div>
        <div className="flex flex-col h-full justify-between py-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-10">
            <EXPLORER />
          </div>
        </div>
    </main>
  );
}
