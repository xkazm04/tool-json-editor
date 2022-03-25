import React, { HTMLProps } from 'react';

type OwnProps = {
  tabs: string[];
  activeTab: string;
  // eslint-disable-next-line no-unused-vars
  onTabClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & HTMLProps<HTMLDivElement>;

export const Tabs = ({ tabs, activeTab, onTabClick, className }: OwnProps) => {
  return (
    <div className={`flex items-center border-b-1 border-red-400 ${className}`}>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            id={tab}
            className={`${
              tab === activeTab
                ? ' text-white font-inter  transition duration-700  border-b-2 border-violet'
                : 'font-inter font-normal  text-dark-300 border-none transition duration-1000'
            }  px-4 py-2 text-center tranform translate-y-[2px]`}
            onClick={(e) => onTabClick(e)}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};
