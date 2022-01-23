import React, { useState } from "react";
import { BuddyBuilderType } from "../types";
import { CodeSnippet } from "./CodeSnippet";
import { CodeSnippetEditSection } from "./CodeSnippetEditSection";

interface OwnProps {
  codeSnippet: BuddyBuilderType;
  inputIndex: number;
}

export const CodeSnippetCard = ({ inputIndex, codeSnippet }: OwnProps) => {
  const [openEditSection, setOpenEditSection] = useState(false);
  const { description, chatbotID, value, label } = codeSnippet;

  const closeEditSection = () => setOpenEditSection(false);

  return (
    <>
      <div className='max-w-screen-lg m-auto bg-glass rounded-lg p-5  grid grid-cols-[50%_50%] justify-center items-center my-5 w-full'>
        <div>
          <div className='mb-5'>
            <label className='font-bold text-white block my-1'>Label</label>
            <p>{label || "-"}</p>
          </div>
          <div className='mb-5'>
            <label className='font-bold text-white block my-1'>
              Description
            </label>
            <p>{description}</p>
          </div>
          <div className='mb-5'>
            <label className='font-bold text-white block my-1'>ChatbotID</label>
            <span>{chatbotID}</span>
          </div>
          <div>
            <label className='font-bold text-white block mb-3'>
              Code example
            </label>
            <CodeSnippet text={value} />
          </div>
        </div>
        <div className='flex justify-end self-start'>
          {openEditSection ? (
            <button onClick={() => setOpenEditSection(false)} className='btn'>
              Close
            </button>
          ) : (
            <button onClick={() => setOpenEditSection(true)} className='btn'>
              Edit
            </button>
          )}
        </div>
      </div>
      {openEditSection && (
        <CodeSnippetEditSection
          closeEditSection={closeEditSection}
          codeSnippet={codeSnippet}
        />
      )}
    </>
  );
};
