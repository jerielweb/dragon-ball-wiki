import type { LoaderIconProps } from "@/types/types.ui";

export default function LoadingICON({PendingDots, PendingCircle}: LoaderIconProps) {
  return (
    <>
      {PendingDots && (
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.56em" viewBox="0 0 24 24">
            <circle cx={4} cy={12} r={3} fill="#fff">
                <animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate>
            </circle>
            <circle cx={12} cy={12} r={3} fill="#fff">
                <animate attributeName="cy" begin="SVGKiXXedfO.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate>
            </circle>
            <circle cx={20} cy={12} r={3} fill="#fff">
                <animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate>
            </circle>
        </svg>
      )}

      {PendingCircle && (
        <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24">
            <g stroke="#3e3e3e90" strokeWidth={2}>
                <circle cx={12} cy={12} r={9.5} fill="none" strokeLinecap="round" strokeWidth={3.9}>
                    <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"></animate>
                    <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"></animate>
                </circle>
                <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
            </g>
        </svg>
      )}
    </>
  );
}
