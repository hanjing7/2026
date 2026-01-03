import svgPaths from "./svg-bnysc2jzzt";
import imgReplaceThis1 from "figma:asset/6ed7659788711b8b8956b62fa7d9d398a069feff.png";
import { imgReplaceThis } from "./svg-gymzr";

function InfoBlock() {
  return (
    <div className="absolute contents left-0 top-[720px]" data-name="Info block">
      <div className="absolute h-[280px] left-0 top-[720px] w-[900px]" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 900 280">
          <path d={svgPaths.p1d7eab00} fill="var(--fill-0, white)" id="Background" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Poppins:Light',sans-serif] justify-end leading-[0] left-[850px] not-italic text-[#0d0d0d] text-[24px] text-right top-[957px] translate-x-[-100%] translate-y-[-100%] w-[110px]">
        <p className="leading-[40px]">2022</p>
      </div>
      <div className="absolute flex flex-col font-['Poppins:Light',sans-serif] justify-end leading-[0] left-[50px] not-italic text-[#0d0d0d] text-[24px] top-[957px] translate-y-[-100%] w-[600px]">
        <p className="leading-[40px]">Development, Fintech</p>
      </div>
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[55px] left-[50px] not-italic text-[#0d0d0d] text-[36px] top-[763px] w-[800px]">Garet Shapes Technology</p>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Image">
      <div className="absolute h-[720px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[900px_720px] top-0 w-[900px]" data-name="Replace this" style={{ maskImage: `url('${imgReplaceThis}')` }}>
        <img alt="" className="block max-w-none size-full" height="720" src={imgReplaceThis1} width="900" />
      </div>
    </div>
  );
}

export default function Block() {
  return (
    <div className="relative size-full" data-name="Block 1">
      <InfoBlock />
      <Image />
    </div>
  );
}