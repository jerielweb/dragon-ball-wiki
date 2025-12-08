import type { BTN_ARROW_L } from "@/types/types.ui"
export default function ArrowL({text, color, size}:BTN_ARROW_L) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height={size} viewBox="0 0 20 20" width={size} fill={color}
            className="group-hover:-translate-x-3 transition-all druration-300 ease-out object-contain"
            >
                <rect fill="none" height={size} width={size}/>
                <path d="M13.71,2.71L13.71,2.71c-0.39-0.39-1.02-0.39-1.41,0L5.71,9.29c-0.39,0.39-0.39,1.02,0,1.41l6.59,6.59 c0.39,0.39,1.02,0.39,1.41,0h0c0.39-0.39,0.39-1.02,0-1.41L7.83,10l5.88-5.88C14.1,3.73,14.1,3.1,13.71,2.71z"/>
            </svg>
        {
            text && (
                <span className="text-xl text-center text-[#3e3e3e] ml-3 transition-all duration-300 ease-out font-semibold overflow-hidden group-hover:-translate-x-2">Volver</span>
            )
        }
        </>
    )
}