import type { NavBar } from '@/types/types.ui.ts'
import { ARROW_L, ARROW_R } from '..';
import Image from 'next/image'
import { MAIN_LOGO } from "@/assets";
import Link from 'next/link';
export default function NavBarComponent({ linkP, link, showLogo, showNavLinks, showtitle, title, showHome, path }: NavBar) {
    return (
        <nav className="flex items-center justify-between p-4 bg-amber-500 text-white h-15 fixed w-full top-0 left-0 z-50 shadow-md">
            {showLogo && (
                <Link className="text-lg font-bold" href='/'>
                    <Image src={MAIN_LOGO} alt="Logo" width={500} height={500} className='w-30' />
                </Link>
            )}
            {
                showtitle && (
                    <h1 className="text-2xl font-semibold text-center text-gray-800 hidden sm:block">
                        {title}
                    </h1>
                )
            }
            <div className='flex flex-row w-fit h-full gap-5 items-center justify-center w-20'>
                {
                    showHome && path &&
                    (
                        <Link href={path} className="flex items-center justify-center h-10 w-fit px-2 border border-[#3f3f3f] rounded-full hover:bg-amber-600 active:bg-amber-600">
                            <p className="size-fit text-[#3f3f3f] font-semibold">
                                Volver
                            </p>
                        </Link>
                    )
                }
            {showNavLinks && (
                <div className='flex flex-row gap-2 w-24 h-full items-center justify-center'>
                    <a href={linkP} className="flex items-center justify-center size-10 border border-[#3f3f3f] rounded-full hover:bg-amber-600 active:bg-amber-600">
                    <div className="size-fit">
                        <ARROW_L text={false} color="#3f3f3f" size={40} />
                    </div>
                    </a>
                    <a href={link} className="flex items-center justify-center size-10 border border-[#3f3f3f] rounded-full hover:bg-amber-600 active:bg-amber-600">
                        <div className="size-fit">
                        <ARROW_R text={false} color="#3f3f3f" size={40}/>
                    </div>
                    </a>
                </div>
            )}
            </div>
        </nav>
    )
}
