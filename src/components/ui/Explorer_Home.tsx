import Image from "next/image";
import HomeData from '@/lib/home'
import { ARROW_R } from "..";

export default function HomeExplorer() {
    return(
        <>
            {HomeData.map((btr) => (
                <div key={btr.id}
                className="relative h-auto shadow-lg shadow-black overflow-hidden
                flex-1 flex-col justify-center
                items-center cursor-pointer bg-black
                rounded-2xl group md:max-w-sm mx-5 md:mx-0">
                    <a href={btr.route}
                    className="flex flex-col mask-y-to-neutral-900">
                        <Image
                        src={btr.imageSrc}
                        alt={btr.name}
                        className="aspect-video object-fit group-hover:scale-107 transition-all duration-300 ease-out
                        mask-t-from-60% mask-t-to-95% pointer-events-none
                        "
                        />
                        <h2
                        className="absolute top-1 left-3 text-stone-100 font-black
                        transition-all duration-300 ease-out
                        text-2xl text-normal group-hover:text-[25px]"
                        >{btr.name}</h2>
                        <div className="absolute bottom-0 left-0 w-full flex flex-row
                        transition-all duration-300 ease-out justify-between z-10">
                        <p
                        className="relative left-2.5 -bottom-2 transition-all duration-300 ease-out text-stone-100 font-bold text-md text-normal md:group-hover:-translate-y-1 md:group-hover:opacity-100 md:opacity-0 max-w-[225px]"
                        >{btr.text}</p>
                        <span
                        className="relative size-17 flex right-0 items-center justify-center border
                        bg-stone-800/30
                        -translate-x-2 group-active:translate-x-0 scale-60 transition-all duration-100 ease-out
                        rounded-full backdrop-blur-xs
                        ">
                            <ARROW_R
                            text={false}
                            />
                        </span>
                        <span id="overlay"
                            className="absolute w-80 h-20 inset-0 bg-black top-8 -z-1
                            blur-xl scale-150 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 ease-out
                            "
                            ></span>
                        </div>
                    </a>
                </div>
            ))}
        </>
    )
}