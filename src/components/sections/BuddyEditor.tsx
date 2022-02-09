import React, { useState } from 'react';
import { BuddyEditorControllers } from './BuddyEditorControllers';
import { Schema } from './Schema';
import { UseCases } from '../baseComponents/UseCases';

export const BuddyEditor = () => {
  const [showSchema, setShowSchema] = useState(true);

  const makeSchemaVisible = () => setShowSchema(!showSchema);

  return (
    <div>
      <BuddyEditorControllers
        setShowSchema={makeSchemaVisible}
        schemaIsVisible={showSchema}
      />
      <div
        className={`grid  m-auto ${
          showSchema ? 'grid-cols-[47%_47%] gap-[6%]' : 'grid-cols-[100%]'
        }`}
      >
        <UseCases />
        <Schema showSchema={showSchema} />
      </div>
    </div>
  );
};
