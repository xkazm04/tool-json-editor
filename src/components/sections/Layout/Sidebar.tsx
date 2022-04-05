import React, { useState } from 'react';
import { Logo } from '../../../assets/icons/Logo';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { useBuddy } from '../../../providers/Buddy';
import { ReactComponent as ChvronRight } from '../../../assets/icons/chevron-right.svg';
import { Input } from '../../baseComponents/Input';
import { createUseCase } from '../../../utils/createUseCase';
import { List } from '../../baseComponents/List';

export const Sidebar = (): JSX.Element => {
  const buddy = useBuddy();
  const { darkMode, setDarkMode } = useDarkMode(false);
  const [open, setOpen] = useState(true);

  const [newEntryTitle, setNewEntryTitle] = useState('');

  const handleNewEntrySave = async () => {
    const useCase = createUseCase({ optionValue: '', label: '' });
    const postNewEntry = await fetch(
      'https://strapideploys.herokuapp.com/api/buddies',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            Title: newEntryTitle,
            tree: useCase,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const response = await postNewEntry.json();
    if (response.data) {
      buddy?.addNotification('success', 'New entry has been added');
      buddy?.loadSchemas();
      setNewEntryTitle('');
    }
    if (response.error) {
      buddy?.addNotification('error', 'Something went wrong');
    }
  };

  return (
    <aside
      className={`h-full relative ${
        open ? 'w-[20%]' : 'w-[5%]'
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
      <div className="sticky  h-screen top-0 pt-8 flex flex-col">
        <div className="flex justify-center">
          <Logo />
        </div>
        <ul className="flex flex-col w-full">
          {open &&
            buddy?.schemas.map(({ id, attributes }, index) => {
              const activeSchema = buddy.currentlyEditingSchema === id;
              return (
                <li
                  className={`${
                    activeSchema ? ' text-white bg-violet' : 'text-dark-300'
                  } p-2  `}
                  key={index}
                  id={JSON.stringify(id)}
                  onClick={() => {
                    buddy.setActiveSchema(id);
                    buddy.setActiveSchemaName(attributes.Title);
                  }}
                >
                  {attributes.Title}
                </li>
              );
            })}
          {open && (
            <li className="mt-4 border-t-1 border-white">
              <Input
                placeholder="Type new entry title"
                labelText="Title"
                value={newEntryTitle}
                onChange={(e) =>
                  setNewEntryTitle((e.target as HTMLInputElement).value)
                }
              />
              <button
                onClick={handleNewEntrySave}
                className="p-1 mt-2 bg-green text-white disabled:bg-slate-500"
                disabled={!newEntryTitle.trim()}
              >
                Add entry
              </button>
            </li>
          )}
        </ul>
        {open && (
          <ul className="block overflow-scroll fancy-scrollbar flex-1 mt-5">
            <p className={`flex items-center`}>
              <span className={`w-4 h-4 bg-[#562AD0] mr-2 `}></span>
              <span>{buddy?.activeSchemaName}</span>
            </p>
            <div className="ml-2">
              {buddy?.buddy?.children.map((child, index) => {
                if (!buddy.buddy) return null;
                const lastIndex = index === buddy?.buddy?.children.length - 1;
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
          </ul>
        )}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-center cursor-pointer"
        >
          {/* <LightMode />
          {open && (
            <span className="text-[#FFFFFF99] font-normal ml-5">
              {darkMode ? 'Light mode' : 'Dark mode'}
            </span>
          )} */}
        </div>
      </div>
    </aside>
  );
};
