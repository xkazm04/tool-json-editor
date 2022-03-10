import React, { useState } from 'react';
import { useBuddy } from '../../../providers/Buddy';
import { BuddyBuilderType } from '../../../types';
import { CodeSnippet } from '../CodeSnippet';
import { CodeSnippetEditSection } from './CodeSnippetEditCard';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';

interface OwnProps {
  codeSnippet: BuddyBuilderType;
  inputIndex: number;
}

export const CodeSnippetCard = ({ inputIndex, codeSnippet }: OwnProps) => {
  const [openEditSection, setOpenEditSection] = useState(false);
  const { description, chatbotID, value, label, id, linkToDocs } = codeSnippet;
  const buddy = useBuddy();

  const closeEditSection = () => setOpenEditSection(false);

  const handleCodeSnippetDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete code snippet?'
    );
    if (!confirmed) return;
    buddy?.deleteUseCase(id);
  };

  // const codeSnippetValues = [
  //   { type: 'input', title: 'Label', value: label },
  //   { type: 'input', title: 'Description', value: description },
  //   { type: 'input', title: 'ChatbotID', value: chatbotID },
  //   { type: 'code snippet', title: 'Code example', value },
  //   { type: 'input', title: 'Link to docs', value },
  // ];

  return (
    <>
      <div className="max-w-screen-lg m-auto bg-[#FFFFFF08] p-5 grid grid-cols-[90%_10%] justify-center items-center my-5 w-full">
        <div>
          <div className="mb-5">
            <label className="font-bold text-white block my-1">Label</label>
            <p className="text-dark-300">{label || '-'}</p>
          </div>
          <div className="mb-5">
            <label className="font-bold text-white block my-1">
              Description
            </label>
            <p className="text-dark-300">{description}</p>
          </div>
          <div className="mb-5">
            <label className="font-bold text-white block my-1">ChatbotID</label>
            <span className="text-dark-300">{chatbotID}</span>
          </div>
          <div className="mb-5">
            <label className="font-bold text-white block mb-3">
              Code example
            </label>
            <CodeSnippet text={value} />
          </div>
          <div>
            <label className="font-bold text-white block mb-3">
              Link to docs
            </label>
            <p className="text-dark-300">{linkToDocs}</p>
          </div>
        </div>
        <div className="flex justify-end self-start">
          <EditIcon
            onClick={() => setOpenEditSection(!openEditSection)}
            className="cursor-pointer"
          />
          {/* {openEditSection ? (
            <button onClick={() => setOpenEditSection(false)} className="btn">
              Close
            </button>
          ) : (
            <>
              <button onClick={() => setOpenEditSection(true)} className="btn">
                Edit
              </button>
              <button
                onClick={() => handleCodeSnippetDelete(id)}
                className="btn ml-3"
              >
                Delete
              </button>
            </>
          )} */}
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
