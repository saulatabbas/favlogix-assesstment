import { polygonData, PolygonItem } from "@/components/icons/hexagonicons";
import clsx from "clsx";
import { cloneElement, isValidElement } from "react";

interface BottomNavProps {
  openInboxPreview?: boolean;
  selectedPolygon?: string; // polygon id
  handlePolygonClick: (item: PolygonItem) => void;
}

export default function BottomNav({
  openInboxPreview,
  selectedPolygon,
  handlePolygonClick,
}: BottomNavProps) {
  return (
    <div
      className={clsx(
        "w-full grid sticky grid-cols-5 bg-white border-t-2 mt-[0.5rem] border-gray-300 shadow-md px-1 py-3 lg:hidden",
        openInboxPreview ? "bottom-[-1%]" : "bottom-0",
        selectedPolygon !== "inbox" ? "rounded-2xl" : "rounded-none"
      )}
    >
      {polygonData.slice(0, 5).map((item) => {
        const isActive = selectedPolygon === item.label;

           const renderSelectedIcon = (item: PolygonItem) => {
                  if (!item.icon) return null;
        
                  if (isValidElement(item.icon)) {
                    return cloneElement(item.icon, {
                      className: clsx(
                            isActive ? "text-[#007AEC]" : "text-gray-500",
                "size-6"
                      ),
                    });
                  }
        
                  return item.icon;
                };
        
        return (
          <div
            key={item.id}
            onClick={() => handlePolygonClick(item)}
            className="text-center cursor-pointer"
          >
            <div className="flex justify-center">
              {renderSelectedIcon(item)}
            </div>

            <h6
              className={clsx(
                "body1 mt-1",
                isActive
                  ? "text-[#007AEC] font-medium"
                  : "text-gray-500"
              )}
            >
              {item.label}
            </h6>
          </div>
        );
      })}
    </div>
  );
}
