import React, { useRef, useState } from 'react';
import { useBuddy } from '../../../providers/Buddy';
import { BuddyBuilderType } from '../../../types';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { deepClone } from '../../../utils/deepClone';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

interface OwnProps {
  codeSnippet: BuddyBuilderType;
  closeEditSection: () => void;
}

export const CodeSnippetEditSection = ({
  codeSnippet: {
    description,
    children,
    id,
    label,
    value,
    chatbotID,
    linkToDocs,
  },
  closeEditSection,
}: OwnProps): JSX.Element => {
  const buddy = useBuddy();
  const labelInputRef = useRef<HTMLInputElement | null>(null);
  const [labelValue, setLabelValue] = useState(label);
  const [codeSnippet, setCodeSnippet] = useState({
    description,
    label,
    chatbotID,
    codeExample: value,
    linkToDocs,
  });

  const handleCodeSnippetEdit = (id: string) => {
    if (!buddy?.buddy) return;
    const current = deepClone(buddy?.buddy);

    const queue = [];
    queue.push(current);

    while (queue.length > 0) {
      const first = queue.shift();

      if (first?.id === id) {
        Object.keys(codeSnippet).forEach((key, index) => {
          const newValue = codeSnippet[key as keyof typeof codeSnippet];

          first[key as keyof typeof first] = newValue as string &
            ('input' | 'code snippet') &
            (BuddyBuilderType[] | []);
        });
      } else {
        first?.children.forEach((child) => queue.push(child));
      }
    }
    buddy.setBuddy(current);
  };

  return (
    <div className="max-w-screen-lg m-auto min-h-[300px] bg-[#FFFFFF08] my-5 p-5 relative">
      <div className="grid grid-cols-[70%_20%] gap-x-10">
        <div>
          <div>
            <Input
              ref={labelInputRef}
              labelText="Label for group of inputs"
              value={codeSnippet.label}
              onChange={(e) =>
                setCodeSnippet((prev) => ({
                  ...prev,
                  label: (e.target as HTMLInputElement).value,
                }))
              }
            />
          </div>
          <div className="divider"></div>
          <div>
            <Input
              labelText="Description"
              value={codeSnippet.description}
              onChange={(e) =>
                setCodeSnippet((prev) => ({
                  ...prev,
                  description: (e.target as HTMLInputElement).value,
                }))
              }
            />
          </div>
          <div>
            <TextArea
              label="Chatbot ID"
              value={codeSnippet.chatbotID}
              onChange={(e) =>
                setCodeSnippet((prev) => ({
                  ...prev,
                  chatbotID: (e.target as HTMLInputElement).value,
                }))
              }
            />
          </div>
          <div>
            <TextArea
              label="Code example"
              value={codeSnippet.codeExample}
              onChange={(e) =>
                setCodeSnippet((prev) => ({
                  ...prev,
                  codeExample: (e.target as HTMLTextAreaElement).value,
                }))
              }
            />
          </div>
          <div>
            <TextArea
              label="Link to docs"
              value={codeSnippet.linkToDocs}
              onChange={(e) =>
                setCodeSnippet((prev) => ({
                  ...prev,
                  linkToDocs: (e.target as HTMLTextAreaElement).value,
                }))
              }
            />
          </div>
        </div>
        <div className="justify-self-center self-center">
          <DeleteIcon
            onClick={() => buddy?.deleteUseCase(id)}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn rounded-none hover:bg-transparent  text-[#FFFFFF66] bg-transparent border-none uppercase p-2 self-start cursor-pointer">
          Cancel
        </button>
        <button
          onClick={() => handleCodeSnippetEdit(id)}
          // disabled={!inputsAreValid() && codeSnippet.visible}
          className="btn border-none  rounded-none hover:bg-green hover:text-[#2F3152] text-[#2F3152] uppercase p-2 bg-green self-start cursor-pointer"
        >
          Save changes
        </button>
      </div>
      <CloseIcon
        onClick={closeEditSection}
        className="absolute top-4 right-4 scale-150 cursor-pointer"
      />
    </div>
  );
};
