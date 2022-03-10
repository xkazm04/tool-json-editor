import React from 'react';
import { LightMode } from '../../../assets/icons/LightMode';
import { Logo } from '../../../assets/icons/Logo';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { useBuddy } from '../../../providers/Buddy';

export const Sidebar = () => {
  const buddy = useBuddy();
  const { darkMode, setDarkMode } = useDarkMode(false);
  return (
    <aside className="h-full  bg-[#FFFFFF08] pl-4 ">
      <div className="sticky  h-screen top-0 py-4 grid grid-rows-[10%_80%_10%]">
        <div>
          <Logo />
        </div>
        <ul className="flex flex-col">
          {buddy?.schemas.map(({ id, attributes }, index) => {
            const activeSchema = buddy.currentlyEditingSchema === id;
            return (
              <li
                className={`${
                  activeSchema ? ' text-white bg-violet' : 'text-dark-300'
                } p-2 `}
                key={index}
                id={JSON.stringify(id)}
                onClick={() => buddy.setActiveSchema(id)}
              >
                {attributes.Title}
              </li>
            );
          })}
        </ul>
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center"
        >
          <LightMode />
          <span className="text-[#FFFFFF99] font-normal">
            {darkMode ? 'Light mode' : 'Dark mode'}
          </span>
        </div>
      </div>
    </aside>
  );
};
