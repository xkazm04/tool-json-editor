import React from "react";

type OwnProps = {
  tabs: string[];
  activeTab: string;
  // eslint-disable-next-line no-unused-vars
  onTabClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Tabs = ({ tabs, activeTab, onTabClick }: OwnProps) => {
  return (
    <div className='flex bg-glass rounded-t-lg justify-evenly items-center w-full  mb-5'>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            id={tab}
            className={`${
              tab === activeTab
                ? " text-white font-inter   transition duration-700 font-semibold text-[20px] border-b-2 border-[#FF00FF]"
                : "font-inter font-normal text-[20px] text-white border-white border-b-2 transition duration-1000"
            }  px-4 py-2 w-full text-center tranform translate-y-[2px]`}
            onClick={(e) => onTabClick(e)}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};
