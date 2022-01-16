import React, { useState } from "react";
import { BuddyBuilderType } from "../types";
import { BsFillPencilFill } from "react-icons/bs";
import { UseCaseEditSection } from "./UseCaseEditSection";
import { useBuddy } from "../providers/Buddy";

interface OwnProps {
  input: BuddyBuilderType;
  inputIndex: number;
}

export const UseCaseCard = ({ input, inputIndex }: OwnProps): JSX.Element => {
  const [openEditSection, setOpenEditSection] = useState(false);
  const buddy = useBuddy();

  const closeEditSection = () => setOpenEditSection(false);

  return (
    <>
      <div className='bg-cyan-300 rounded-lg p-5  grid grid-cols-[50%_50%] justify-center items-center my-5 w-full'>
        <div>
          <label className='block'>{input.label}</label>
          <select
            onChange={(e) => buddy?.selectOption(e.target.value, inputIndex)}
            className='select select-bordered w-full max-w-xs my-1'
          >
            <option selected={true} disabled value=''></option>
            {input.children.map(({ value, id }, index) => {
              return <option value={id}>{value}</option>;
            })}
          </select>
        </div>
        <div className='flex justify-end'>
          <BsFillPencilFill onClick={() => setOpenEditSection(true)} />
        </div>
      </div>
      {openEditSection && (
        <UseCaseEditSection closeEditSection={closeEditSection} input={input} />
      )}
    </>
  );
};
