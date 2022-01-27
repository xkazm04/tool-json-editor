import React, { useRef, useState } from "react";
import { useBuddy } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";
import { Editable } from "./Editable";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

interface OwnProps {
  codeSnippet: BuddyBuilderType;
  closeEditSection: () => void;
}

export const CodeSnippetEditSection = ({
  codeSnippet: { description, children, id, label, value, chatbotID },
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
  });
  return (
    <div className="max-w-screen-lg m-auto min-h-[300px] bg-glass rounded-lg my-5 p-5 relative">
      <div>
        <Editable
          useCaseType={"input"}
          text={codeSnippet.label || "-"}
          label="Label for group of inputs"
          onUseCaseSave={() => {
            buddy?.editUseCaseValue({ label: labelValue }, id);
          }}
        >
          <Input
            ref={labelInputRef}
            labelText="Label for group of inputs"
            value={labelValue}
            onChange={(e) =>
              setLabelValue((e.target as HTMLInputElement).value)
            }
          />
        </Editable>
      </div>
      <div className="divider"></div>
      <div>
        <Editable
          useCaseType={"input"}
          text={description ? description : ""}
          label="Description"
          onUseCaseSave={() => {
            buddy?.editUseCaseValue(
              { description: codeSnippet.description },
              id
            );
          }}
        >
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
        </Editable>
      </div>
      <div>
        <Editable
          useCaseType={"input"}
          text={chatbotID ? chatbotID : ""}
          label="Charbot ID"
          onUseCaseSave={() => {
            buddy?.editUseCaseValue({ chatbotID: codeSnippet.chatbotID }, id);
          }}
        >
          <Input
            labelText="Chatbot ID"
            value={codeSnippet.chatbotID}
            onChange={(e) =>
              setCodeSnippet((prev) => ({
                ...prev,
                chatbotID: (e.target as HTMLInputElement).value,
              }))
            }
          />
        </Editable>
      </div>
      <div>
        <Editable
          useCaseType={"code snippet"}
          text={value}
          label="Code example"
          onUseCaseSave={() => {
            buddy?.editUseCaseValue({ value: codeSnippet.codeExample }, id);
          }}
        >
          <TextArea
            // labelText='Chatbot ID'
            value={codeSnippet.codeExample}
            onChange={(e) =>
              setCodeSnippet((prev) => ({
                ...prev,
                codeExample: (e.target as HTMLTextAreaElement).value,
              }))
            }
          />
        </Editable>
      </div>
    </div>
  );
};
