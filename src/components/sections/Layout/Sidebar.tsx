import React, { useState } from 'react';
import { LightMode } from '../../../assets/icons/LightMode';
import { Logo } from '../../../assets/icons/Logo';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { useBuddy } from '../../../providers/Buddy';
import { ReactComponent as ChvronRight } from '../../../assets/icons/chevron-right.svg';

export const Sidebar = (): JSX.Element => {
  const buddy = useBuddy();
  const { darkMode, setDarkMode } = useDarkMode(false);
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={`h-full relative ${
        open ? 'w-[15%]' : 'w-[5%]'
      }  bg-dark-sidebar pl-4`}
    >
      <div
        onClick={() => setOpen(!open)}
        className="block h-8 w-8 absolute z-50 rounded-full bg-dark-main -right-4 bottom-14 cursor-pointer"
      >
        <ChvronRight
          className={`h-8 w-8 ${open ? 'rotate-180' : 'rotate-0'} `}
        />
      </div>
      <div className="sticky  h-screen top-0 pt-8 grid grid-rows-[10%_80%_10%]">
        <div>
          <Logo />
        </div>
        <ul className="flex flex-col">
          {open &&
            buddy?.schemas.map(({ id, attributes }, index) => {
              const activeSchema = buddy.currentlyEditingSchema === id;
              return (
                <li
                  className={`${
                    activeSchema ? ' text-white bg-violet' : 'text-dark-300'
                  } p-2 `}
                  key={index}
                  id={JSON.stringify(id)}
                  onClick={() => {
                    buddy.setActiveSchema(id);
                  }}
                >
                  {attributes.Title}
                </li>
              );
            })}
        </ul>
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center cursor-pointer"
        >
          <LightMode />
          {open && (
            <span className="text-[#FFFFFF99] font-normal ml-5">
              {darkMode ? 'Light mode' : 'Dark mode'}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
