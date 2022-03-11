import React from 'react';
import { useBuddy } from '../../../providers/Buddy';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { CodeSnippetFields } from './AddUseCaseCard';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { BuddyBuilderType } from '../../../types';

interface AddCodeSnippetCardProps {
  codeSnippet: BuddyBuilderType;
  setCodeSnippet: React.Dispatch<React.SetStateAction<CodeSnippetFields>>;
  handleCodeSnippetChange: (key: keyof BuddyBuilderType, value: any) => void;
}

export const AddCodeSnippetCard = ({
  codeSnippet,
  setCodeSnippet,
  handleCodeSnippetChange,
}: AddCodeSnippetCardProps): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className="grid grid-cols-[70%_20%] gap-x-10">
      <div>
        <TextArea
          value={codeSnippet.description}
          onChange={(e) =>
            handleCodeSnippetChange(
              'description',
              (e.target as HTMLInputElement).value
            )
          }
          label="Description"
        />
        <TextArea
          onChange={(e) =>
            handleCodeSnippetChange(
              'chatbotID',
              (e.target as HTMLInputElement).value
            )
          }
          value={codeSnippet.chatbotID}
          label="Chatbot ID"
        />
        <TextArea
          value={codeSnippet.value}
          onChange={(e) =>
            handleCodeSnippetChange(
              'value',
              (e.target as HTMLInputElement).value
            )
          }
          label="Code example"
        />
        <Input
          value={codeSnippet.linkToDocs}
          onChange={(e) =>
            handleCodeSnippetChange(
              'linkToDocs',
              (e.target as HTMLInputElement).value
            )
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
