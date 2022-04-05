import React from 'react';
import { useBuddy } from '../../providers/Buddy';
import { BuddyBuilderType } from '../../types';
import { CodeSnippetCard } from '../baseComponents/cards/CodeSnippetCard';
import { EditOptionsCard } from '../baseComponents/cards/EditOptionsCard';

export const EditSection = () => {
  const buddy = useBuddy();

  const closeEditSection = () => {
    buddy?.setCurrentlyEditing(null);
  };
  
  if (!buddy?.currentlyEditing) return null;

  return (
    <div className="overflow-scroll h-[93%] no-scrollbar">
      {buddy.currentlyEditing.useCaseType === 'input' ? (
        <EditOptionsCard
          closeEditSection={closeEditSection}
          input={buddy.currentlyEditing}
        />
      ) : (
        <CodeSnippetCard
          codeSnippet={buddy?.currentlyEditing as BuddyBuilderType}
        />
      )}
    </div>
  );
};
