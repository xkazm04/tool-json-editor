import React, { useState } from 'react';
import { BuddyBuilderType } from '../../../types';
import { UseCaseEditSection } from './AddUseCaseCard';
import { useBuddy } from '../../../providers/Buddy';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';

interface OwnProps {
  input: BuddyBuilderType;
  inputIndex: number;
}

export const UseCaseCard = ({ input, inputIndex }: OwnProps): JSX.Element => {
  const [openEditSection, setOpenEditSection] = useState(false);
  const buddy = useBuddy();

  const closeEditSection = () => setOpenEditSection(false);
  console.log('input', input);
  return (
    <>
      <div className="max-w-screen-lg m-auto bg-[#FFFFFF08]  p-5  grid grid-cols-[1fr_10%] justify-between items-center my-5 w-full">
        <div>
          <label className="block">{input.label || 'Select option'}</label>
          <select
            onChange={(e) => buddy?.selectOption(e.target.value, inputIndex)}
            className="bg-[#FFFFFF0F] outline-none p-2 w-full  mt-2"
          >
            <option selected={true} disabled value=""></option>
            {input?.children
              .sort((a, b) => {
                if (a.value < b.value) {
                  return -1;
                }
                if (a.value > b.value) {
                  return 1;
                }
                return 0;
              })
              .map(({ value, id }, index) => {
                return (
                  <option key={index} value={id}>
                    {value}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex justify-end self-end pb-2">
          <EditIcon
            onClick={() => setOpenEditSection(true)}
            className="cursor-pointer"
          />
        </div>
      </div>
      {openEditSection && (
        <UseCaseEditSection closeEditSection={closeEditSection} input={input} />
      )}
    </>
  );
};
