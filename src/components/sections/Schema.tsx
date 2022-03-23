import React from 'react';
import { useBuddy } from '../../providers/Buddy';

/** JSON respresentation of buddy schema
 */
export const Schema = (): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className="bg-[#FFFFFF08] h-[93%] overflow-scroll no-scrollbar">
      {buddy?.buddy && (
        <pre className="py-5 px-3 ml-5 max-h-[95vh] fancy-scrollbar overflow-x-auto overflow-y-auto text-white text-sm">
          {JSON.stringify(buddy.buddy, null, 2)}
        </pre>
      )}
    </div>
  );
};
