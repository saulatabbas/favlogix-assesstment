"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { cloneElement, isValidElement, useState } from "react";

import { Polygon } from "./Polygon";
import { Spotlight } from "./Spotlight";
import loaderGif from "@/assets/Bannerloader.gif";
import { polygonData, PolygonItem } from "../icons/hexagonicons";
import { usePolygonStore } from "@/global/usePolygonStore";

import Sidebar from "../sidebar/Sidebar";
import Header from "../common/header";
import BottomNav from "../common/MobileBottomBar";
import ChatBot from "../ChatBox";
import SingleChatPage from "../SIngleChatPage/SingleChatPage";
import DetailsPanel from "../ChatDetailPanel";

// ------------------- Skeleton Component -------------------
const ContentSkeleton = () => (
  <div className="h-[40vh] bg-white rounded-xl flex items-center flex-col justify-center border-2 border-white/10 mt-[1%] animate-pulse">
    <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
    <div className="h-6 w-32 bg-gray-200 rounded mb-3" />
    <div className="h-4 w-64 bg-gray-200 rounded" />
  </div>
);
const renderSelectedIcon = (selectedPolygon: PolygonItem) => {
  if (!selectedPolygon.icon) return null;

  if (isValidElement(selectedPolygon.icon)) {
    return cloneElement(selectedPolygon.icon, {
      className: "text-[#007AEC] size-10 lg:size-[4vw] 2xl:size-16",

    });
  }

  return selectedPolygon.icon;
};

// ------------------- Banner Component -------------------
const Banner = () => {
  const { stage, setStage } = usePolygonStore();
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonItem | null>(null);
  const [openInboxPreview, setOpenInboxPreview] = useState(false);
  const [loadedPolygons, setLoadedPolygons] = useState<Record<string, boolean>>({});

  // Render polygon icon with custom class

  // Polygon click handler
  const handlePolygonClick = (polygon: PolygonItem) => {
    if (selectedPolygon?.id === polygon.id) return;

    setSelectedPolygon(polygon);
    if (loadedPolygons[polygon.id]) {
      setStage("loaded");
      return;
    }
    setStage("loading");

    setTimeout(() => {
      setLoadedPolygons((prev) => ({
        ...prev,
        [polygon.id]: true,
      }));
      setStage("loaded");
    }, 3000);
  };


  // Inbox preview open
  const handlePreviewOpen = () => setOpenInboxPreview(true);

  // ------------------- Animation Variants -------------------
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const pageOverlay = {
    hidden: { opacity: 0, scale: 0.96, y: 40, },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };
  const bottomSectionKey =
    selectedPolygon?.id === "inbox"
      ? `${selectedPolygon.id}-${stage}` // 🔁 inbox: always re-animate
      : selectedPolygon?.id;              // ✅ others: animate once

  return (
    <section
      className={clsx(
        "relative w-full min-h-screen bg-[#05070C] overflow-hidden flex justify-center",
        selectedPolygon ? "items-start" : "items-center"
      )}
    >
      {/* Left Glow */}
      <Image
        src="/Loading Skeleton.png"
        alt=""
        fill={false}
        width={2000}
        height={2000}
        className="fixed inset-0 transform pointer-events-none translate-y-full lg:translate-none"
      />

      {/* Spotlight lights */}
      {stage !== "idle" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
          <Spotlight fill="#007AEC" className="absolute" />
          <Spotlight fill="#007AEC" className="absolute rotate-115" />
          <Spotlight fill="#007AEC" className="absolute rotate-310" />
          <Spotlight fill="#007AEC" className="absolute rotate-160" />
        </div>
      )}

      {/* Glass Container */}
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
        <div className={`w-[96%] lg:w-[98%] h-[95svh]  rounded-2xl border-2 border-white/10 ${stage === "loading" ? "bg-black " : "bg-white/4"} md:bg-white/4 px-6 pt-6 pb-20 backdrop-blur-[30px] sm:rounded-3xl`} />
      </div>

      {/* Polygons & Center Content */}
      <div className="hidden lg:flex flex-col lg:flex-row items-center lg:justify-between w-full">
        {/* Desktop Polygons */}
        <div className="hidden lg:block">
          {polygonData.map((item, index) => (
            <Polygon
              key={index}
              className={clsx(
                "lg:absolute cursor-pointer z-10 transition-all duration-500 ease-in-out",
                item.position,
                item.size,
                selectedPolygon?.id === item?.id ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"
              )}
              onClick={() => handlePolygonClick(item)}
            >
              {item.icon}
            </Polygon>
          ))}
        </div>


        {/* Center Content */}
        <motion.div key={stage + (selectedPolygon?.id ?? "")} initial="hidden" animate="visible" variants={fadeUp} className="mix-blend-screen  lg:transform  text-center w-full">
          {selectedPolygon ? (
            <SelectedPolygonContent
              selectedPolygon={selectedPolygon} stage={stage} />
          ) : (
            <IdleCircle />
          )}
        </motion.div>
      </div>
      {/* Mobile Polygons */}
      <div className="flex flex-col w-full lg:hidden ">
        <div className="hidden mx-auto md:flex">
          {selectedPolygon ? (
            <SelectedPolygonContent openInboxPreview={openInboxPreview} selectedPolygon={selectedPolygon} stage={stage} />
          ) : (
            <IdleCircle />
          )}
        </div>
        <div className={`${selectedPolygon ? "grid grid-cols-2  mt-[3rem]" : "flex md:grid md:grid-cols-5 flex-wrap"} w-[87%]   gap-4  z-10 mx-auto   justify-between lg:hidden pointer-events-auto`}>
          {polygonData
            .slice(0, selectedPolygon ? 5 : 2)
            .filter((item) => item.id !== selectedPolygon?.id)
            .map((item, index) => (
              <div
                key={item.id}
                className={clsx(
                  index % 2 === 0 ? "justify-self-start" : "justify-self-end"
                )}
              >
                <Polygon
                  onClick={() => handlePolygonClick(item)}
                  className={clsx(
                    item.size,
                    item.position,
                    "cursor-pointer transition-all duration-500 ease-in-out pointer-events-auto"
                  )}
                >
                  <div className="flex flex-col items-center justify-center">
                    {item.icon}
                    <div className="border-b-2 mt-2 w-full border-white" />
                    <p className="font-bold text-white text-xs">{item.label}</p>
                  </div>
                </Polygon>
              </div>
            ))}
          <div className="flex mx-auto md:hidden">
            {selectedPolygon ? (
              <SelectedPolygonContent selectedPolygon={selectedPolygon} stage={stage} />
            ) : (
              <IdleCircle />
            )}
          </div>
          {!selectedPolygon &&
            polygonData
              .slice(3)
              .filter((item) => item.id !== selectedPolygon?.id)
              .map((item, index) => (
                <div
                  key={item.id}
                  className={clsx(
                    index % 2 === 0 ? "justify-self-start" : "justify-self-end"
                  )}
                >
                  <Polygon
                    onClick={() => handlePolygonClick(item)}
                    className={clsx(
                      item.size,
                      item.position,
                      "cursor-pointer transition-all duration-500 ease-in-out pointer-events-auto"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center">
                      {item.icon}
                      <div className="border-b-2 mt-2 w-full border-white" />
                      <p className="font-bold text-white text-xs">{item.label}</p>
                    </div>
                  </Polygon>
                </div>
              ))
          }
        </div>

      </div>


      {/* Footer / Bottom */}
      <AnimatePresence mode="wait">
        {stage !== "idle" && (
          <motion.div
            key={bottomSectionKey}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <BottomSection
              selectedPolygon={selectedPolygon}
              stage={stage} bottomSectionKey={bottomSectionKey}
              handlePolygonClick={handlePolygonClick}
              setOpenInboxPreview={setOpenInboxPreview}
              handlePreviewOpen={handlePreviewOpen}
              openInboxPreview={openInboxPreview}
              pageOverlay={pageOverlay}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ------------------- Sub Components -------------------

// Idle state circle
const IdleCircle = () => (
  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className={`size-[16rem]  md:mb-[0.5rem] mb-0 lg:mb-0 lg:size-[16vw] mx-auto rounded-full flex items-center justify-center relative transform `}>
    <div className="absolute inset-0 rounded-full p-1 slow-spin bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,_hsla(210,100%,70%,0.18)_0%,_hsla(210,100%,49%,0.08)_50%,_hsla(210,100%,45%,0)_80%)] border-4 border-[#007AEC]" />
    <div className="w-full h-full bg-[#05070C]/10 rounded-full flex items-center justify-center">
      <h1 className="text-white text-lg lg:text-xl w-[60%] text-center leading-tight">Select a module to load data</h1>
    </div>
  </motion.div>
);

// Selected Polygon Content
const SelectedPolygonContent = ({ openInboxPreview, selectedPolygon, stage, }: any) => (
  <>
    <div className={`lg:relative   mt-[3%]`}>
      {stage === "loading" ? (
        <motion.div
          key={selectedPolygon?.id + stage}   // 👈 IMPORTANT
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >        <Image src={loaderGif} alt={`Loading ${selectedPolygon.label} data`} className="mix-blend-screen absolute inset-0 top-[4.2%] lg:top-0 lg:relative lg:left-0 pointer-events-none object-cover size-[14rem] md:size-[18rem] mx-auto lg:size-[16vw] lg:mb-[-3%]" />
        </motion.div>) : (
        <div
          className="
    absolute lg:relative inset-0
    size-40 md:size-56 lg:size-[12vw]
    mx-auto top-[8%]  md:top-[6%] 
    rounded-full
    flex items-center justify-center
  "
        >
          <div className="absolute inset-0 rounded-full p-1 slow-spin bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,_hsla(210,100%,70%,0.18)_0%,_hsla(210,100%,49%,0.08)_50%,_hsla(210,100%,45%,0)_80%)] border-4 border-[#007AEC]" />
          <div className="w-full h-full bg-[#05070C] rounded-full flex items-center justify-center" />
        </div>

      )}
      <div
        className={`
    ${openInboxPreview ? " z-20" : " z-80"}  absolute left-[0%] ${stage === "loading" ? "top-[13%] md:top-[14.5%] lg:top-[34.5%]" : "top-[13%] md:top-[13%] lg:top-[24%]"}
    flex items-center justify-center w-full
    pointer-events-none
  `}
      >

        <Polygon
          active={true}
          className=" size-20 lg:size-[5vw] 2xl:size-20 flex items-center justify-center"
        >
          {selectedPolygon.icon}
        </Polygon>
      </div>




      <motion.h1 className="text-white  hidden lg:block relative z-10 my-[1%]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        {stage === "idle" ? "Select a module to load data" : stage === "loading" ? `Extracting ${selectedPolygon.label}...` : stage === "loaded" ? (selectedPolygon.label === "Inbox" ? "Inbox data successfully extracted" : `${selectedPolygon.label} data is being prepared`) : ""}
      </motion.h1>

      <motion.p className="roz-text hidden lg:block  text-white font-light mx-auto text-[1rem] lg:text-[1vw] 2xl:text-[1.125rem]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        {stage === "idle"
          ? "Please select a module to load data."
          : stage === "loading"
            ? `Retrieving and processing your ${selectedPolygon.label} data. Please wait...`
            : stage === "loaded"
              ? selectedPolygon.label === "Inbox"
                ? "Inbox data successfully extracted."
                : `Data for ${selectedPolygon.label} is being prepared. We are working on it.`
              : ""}
      </motion.p>
    </div>
    <div className="hidden min-[400px]:block absolute left-[5%] md:top-[30%] text-center w-[90%] lg:hidden">
      <motion.h1 className="text-white   relative z-10 my-[1%]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        {stage === "idle" ? "Select a module to load data" : stage === "loading" ? `Extracting ${selectedPolygon.label}...` : stage === "loaded" ? (selectedPolygon.label === "Inbox" ? "Inbox data successfully extracted" : `${selectedPolygon.label} data is being prepared`) : ""}
      </motion.h1>

      <motion.p className="roz-text   text-white font-light mx-auto text-[0.85rem] lg:text-[1vw] 2xl:text-[1.125rem]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        {stage === "idle"
          ? "Please select a module to load data."
          : stage === "loading"
            ? `Retrieving and processing your ${selectedPolygon.label} data. Please wait...`
            : stage === "loaded"
              ? selectedPolygon.label === "Inbox"
                ? "Inbox data successfully extracted."
                : `Data for ${selectedPolygon.label} is being prepared. We are working on it.`
              : ""}
      </motion.p>
    </div>
  </>

);

const BottomSection = ({ setOpenInboxPreview, selectedPolygon, stage, handlePolygonClick, handlePreviewOpen, openInboxPreview, pageOverlay }: any) => (
  <div className={`absolute w-[90%] overflow-hidden bottom-0 left-0 right-0 z-20 mx-auto`}>
    {/* Header */}
    <motion.div variants={pageOverlay} initial="hidden" animate="visible" >
      <Header handlePreview={handlePreviewOpen} selectedPolygon={selectedPolygon?.label} handlePolygonClick={handlePolygonClick} />
    </motion.div>

    {/* Inbox or other polygon content */}
    {selectedPolygon?.id === "inbox" ? (
      <motion.div key="inbox-view" variants={pageOverlay} initial="hidden" animate="visible" className="h-[44vh] lg:h-[40vh]  flex lg:mt-[0.5%] md:gap-x-2 lg:gap-x-[0.5%]">
        <Sidebar openSidebar={false} />
        <ChatBot />
        <SingleChatPage />
        <DetailsPanel open={false} />
      </motion.div>
    ) : stage === "loading" ? (
      <motion.div variants={pageOverlay} initial="hidden" animate="visible">
        <ContentSkeleton />
      </motion.div>) : selectedPolygon ? (
        <motion.div variants={pageOverlay} initial="hidden" animate="visible" className="h-[40vh] bg-white rounded-xl flex items-center flex-col justify-center border-2 border-white/10 mt-2 text-center  lg:mt-[1%]">
          {renderSelectedIcon(selectedPolygon)}
          <h1 className="text-[#007AEC]">{selectedPolygon.label}</h1>
          <p className="text-[1rem] lg:text-[1vw] 2xl:text-[1.125rem] text-gray-600 mt-[0.5%] opacity-80">
            Click on <span className="text-[#007aec]">Inbox</span> to see the full dashboard demo.
          </p>
        </motion.div>
      ) : null}

    {/* Bottom Nav */}
    <BottomNav selectedPolygon={selectedPolygon?.label} handlePolygonClick={handlePolygonClick} />

    {/* Inbox Modal Preview */}
    <AnimatePresence>
      {selectedPolygon?.id === "inbox" && openInboxPreview && (
        <motion.div className="fixed inset-0 z-4000 bg-black/40 backdrop-blur-md flex justify-center items-center" initial="hidden" animate="visible" exit="exit" variants={pageOverlay}>
          <motion.div className="w-[95%] h-[90%] md:h-[97%] bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center px-4 lg:px-6 py-4 border-b">
              <h1 className="font-semibold text-lg text-[#007AEC]">Inbox Dashboard Preview</h1>
              <button onClick={() => setOpenInboxPreview(false)} className="text-gray-500 hover:text-black text-xl">✕</button>
            </div>
            {/* Dashboard Content */}
            <div className="flex h-full p-[0.5%] gap-x-[0.5%]">
              <Sidebar openSidebar={false} />
              <ChatBot />
              <SingleChatPage />
              <DetailsPanel open={false} />
            </div>
            <BottomNav
              openInboxPreview={openInboxPreview}
              selectedPolygon={selectedPolygon?.label}
              handlePolygonClick={handlePolygonClick}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Banner;
