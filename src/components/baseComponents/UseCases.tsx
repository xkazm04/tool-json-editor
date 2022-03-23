import React from 'react';
import { useBuddy } from '../../providers/Buddy';
import { CodeSnippetCard } from './cards/CodeSnippetCard';
import { OptionsCard } from './cards/OptionsCard';

export const UseCases = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className=" overflow-scroll no-scrollbar h-[95%]">
      {buddy?.inputs.map((input, index) => {
        if (
          input?.children.length > 0 &&
          input?.children[0]['useCaseType'] === 'code snippet'
        ) {
          return (
            <CodeSnippetCard
              key={index}
              inputIndex={index}
              codeSnippet={input?.children[0]}
            />
          );
        }
        return <OptionsCard key={index} inputIndex={index} input={input} />;
      })}
    </div>
  );
};
