import React from 'react';
import { useBuddy } from '../../providers/Buddy';
import { OptionsCard } from './cards/OptionsCard';

export const UseCases = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className=" overflow-scroll no-scrollbar h-[93%]">
      {buddy?.inputs.map((input, index) => {
        const lastInput = index === buddy.inputs.length - 1;
        if (
          input?.children.length > 0 &&
          input?.children[0]['useCaseType'] === 'code snippet'
        ) {
          return null;
        }
        return (
          <OptionsCard
            lastInput={lastInput}
            key={index}
            inputIndex={index}
            input={input}
          />
        );
      })}
    </div>
  );
};
