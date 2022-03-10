import React from 'react';
import { useBuddy } from '../../../providers/Buddy';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { CodeSnippetFields } from './AddUseCaseCard';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

interface AddCodeSnippetCardProps {
  codeSnippet: CodeSnippetFields;
  setCodeSnippet: React.Dispatch<React.SetStateAction<CodeSnippetFields>>;
}

export const AddCodeSnippetCard = ({
  codeSnippet,
  setCodeSnippet,
}: AddCodeSnippetCardProps): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className="grid grid-cols-[70%_20%] gap-x-10">
      <div>
        <TextArea
          value={codeSnippet.description}
          onChange={(e) =>
            setCodeSnippet((prev) => ({
              ...prev,
              description: (e.target as HTMLInputElement).value,
            }))
          }
          label="Description"
        />
        <TextArea
          onChange={(e) =>
            setCodeSnippet((prev) => ({
              ...prev,
              chatbotId: (e.target as HTMLInputElement).value,
            }))
          }
          value={codeSnippet.chatbotId}
          label="Chatbot ID"
        />
        <TextArea
          value={codeSnippet.codeExample}
          onChange={(e) =>
            setCodeSnippet((prev) => ({
              ...prev,
              codeExample: (e.target as HTMLTextAreaElement).value,
            }))
          }
          label="Code example"
        />
        <Input
          value={codeSnippet.linkToDocs}
          onChange={(e) =>
            setCodeSnippet((prev) => ({
              ...prev,
              linkToDocs: (e.target as HTMLInputElement).value,
            }))
          }
          labelText="Link to documentation"
        />
      </div>
      <div className="justify-self-center self-center">
        <DeleteIcon
          onClick={() =>
            setCodeSnippet((prev) => ({ ...prev, visible: false }))
          }
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
