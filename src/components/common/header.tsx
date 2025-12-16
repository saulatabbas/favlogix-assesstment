import { NavbarData } from "@/data/navbar";
import Image from "next/image";
import Link from "next/link";
import HeaderLinks from "./HeaderLinks";

const Header = ({selectedPolygon,handlePolygonClick,handlePreview}:{selectedPolygon?:string,handlePolygonClick:()=>void,handlePreview:()=>void}) => {
  const userName = "Box Pad";
  const userInitial = userName.charAt(0).toUpperCase();
  return (
    <>
    <nav className="bg-white shadow-sm border-b-2 border-gray-300  z-100 relative lg:border-0 rounded-xl flex justify-between items-center px-4 lg:px-[1%] py-2 lg:py-[0.8%] ">
      <div className="flex items-center gap-4 lg:gap-x-[4%] 2xl:gap-x-[6%] whitespace-nowrap">
        <Link href={"/"} className="lg:w-[18%] 2xl:size-full ">
          <Image src={NavbarData.logo} alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop Menu */}
        <HeaderLinks  handlePolygonClick={handlePolygonClick} selectedPolygon={selectedPolygon} />
      </div>
      <div className="flex items-center whitespace-nowrap gap-x-1  lg:w-[20%] justify-end">
        <Image
          height={18}
          width={18}
          src={NavbarData.settingsIcon}
          alt="settings icon"
          className="slow-spin mr-2 lg:mr-[2%]"
        />

        <p className="size-8 lg:size-[1.5vw]  2xl:size-6 flex items-center justify-center bg-[#FE3265] text-white rounded-full ">
          {userInitial}
        </p>

        {/* Desktop Username */}
        <span className="hidden lg:block font-medium text-gray-800">
          {userName}
        </span>
        {selectedPolygon==="Inbox" && ( 
        <button
  onClick={() => handlePreview()}
  className="ml-4 hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg 
             bg-[#007AEC] text-white text-sm font-semibold
             hover:bg-[#005bb5] transition-all"
>
  Preview Inbox Dashboard
</button>
)}


      </div>
    </nav>
{selectedPolygon === "Inbox" && (
  <button
    onClick={handlePreview}
    className="
      absolute top-[-4.1%] md:top-[-3.5%] left-1/2 -translate-x-1/2
      z-10  lg:hidden
      flex items-center gap-2 whitespace-nowrap
      px-4 py-2 rounded-t-lg
      bg-[#007AEC] text-white text-sm font-semibold
      hover:bg-[#005bb5] transition-all
    "
  >
    Preview Full Dashboard
  </button>
)}
    </>
  );
};

export default Header;
