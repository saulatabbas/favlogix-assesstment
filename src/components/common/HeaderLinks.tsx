import { polygonData, PolygonItem } from "../icons/hexagonicons";
import { cloneElement, isValidElement } from "react";
import clsx from "clsx";

interface HeaderLinksProps {
  selectedPolygon?: string; // should be polygon id
  handlePolygonClick: (item: PolygonItem) => void;
}

const HeaderLinks = ({ selectedPolygon, handlePolygonClick }: HeaderLinksProps) => {
  return (
    <div className="hidden lg:flex items-center gap-x-[2%]">
      {polygonData.map((item) => {
        const isActive = selectedPolygon === item.label;

        const renderSelectedIcon = (item: PolygonItem) => {
          if (!item.icon) return null;

          if (isValidElement(item.icon)) {
            return cloneElement(item.icon, {
              className: clsx(
                isActive ? "text-black" : "text-gray-500",
                item.id === "inbox"
                  ? "size-4 2xl:size-4 lg:size-[0.3vw]"
                  : "size-6 2xl:size-6 lg:size-[0.5vw]"
              ),
            });
          }

          return item.icon;
        };

        return (
          <button
            key={item.id}
            onClick={() => handlePolygonClick(item)}
            className={clsx(
              "flex items-center gap-x-[10%] px-[2%] py-[0.5%] lg:rounded-[0.45vw] transition-all hover:bg-[#EFF2F2]",
              isActive
                ? item.id === "inbox"
                  ? "px-[3%] py-[1.5%] bg-[#EFF2F2]"
                  : "bg-[#EFF2F2]"
                : "bg-white"
            )}
          >
            {renderSelectedIcon(item)}
            <h6 className="font-bold">{item.label}</h6>
          </button>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
