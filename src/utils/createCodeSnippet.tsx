import { v4 as uuid } from "uuid";
import { FunctionParams } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";

// export const createCodeSnippet = (
//   value: string,
//   label: string = "",
//   description: string,
//   chatbotId: string
// ): BuddyBuilderType => {
//   const useCase: BuddyBuilderType = {
//     id: uuid(),
//     useCaseType: "code snippet",
//     label,
//     value,
//     description,
//     chatbotId,
//     children: [],
//   };
//   return useCase;
// };

export const createCodeSnippet = ({
  description,
  value,
  chatbotID,
  label,
}: FunctionParams["code snippet"]): BuddyBuilderType => {
  const useCase: BuddyBuilderType = {
    id: uuid(),
    useCaseType: "code snippet",
    label,
    value,
    description,
    chatbotID,
    children: [],
  };
  return useCase;
};
