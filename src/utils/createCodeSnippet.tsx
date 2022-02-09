import { v4 as uuid } from 'uuid';
import { FunctionParams } from '../providers/Buddy';
import { BuddyBuilderType } from '../types';

export const createCodeSnippet = ({
  description,
  value,
  chatbotID,
  label,
  linkToDocs,
}: FunctionParams['code snippet']): BuddyBuilderType => {
  const useCase: BuddyBuilderType = {
    id: uuid(),
    useCaseType: 'code snippet',
    label,
    value,
    description,
    chatbotID,
    linkToDocs,
    children: [],
  };
  return useCase;
};
