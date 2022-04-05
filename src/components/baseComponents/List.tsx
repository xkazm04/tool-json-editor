import React, { useState } from 'react';
import { BuddyBuilderType } from '../../types';

interface ListProps {
  title: string;
  children: BuddyBuilderType[];
  lastIndex: boolean;
}

export const List = ({
  title,
  children,
  lastIndex,
}: ListProps): JSX.Element => {
  const [showNested, setShowNested] = useState(false);

  return (
    <div>
      <p
        className={`flex items-center `}
        onClick={() => setShowNested(!showNested)}
      >
        <span
          className={`${
            lastIndex ? 'h-3' : 'h-10'
          } self-start block w-[1px] bg-[#562AD0]`}
        ></span>
        <span className="w-2 h-[1px] bg-[#562AD0] inline-block"></span>
        <span className={`w-4 h-4 bg-[#562AD0] mx-2 `}>
          {showNested && (
            <span className="w-2 h-2 bg-red-500 block translate-x-1/2 translate-y-1/2"></span>
          )}
        </span>
        <span
          className={`${showNested ? 'text-white' : 'text-[#8A90A3]'} text-sm `}
        >
          {title}
        </span>
      </p>
      <div className="pl-6">
        {showNested &&
          children &&
          children.map((child, index) => {
            const lastIndex = children.length - 1 === index;
            return (
              <List
                lastIndex={lastIndex}
                key={index}
                title={child.value}
                children={child.children}
              />
            );
          })}
      </div>
    </div>
  );
};
