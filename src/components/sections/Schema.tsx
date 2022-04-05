import React from 'react';
import { useBuddy } from '../../providers/Buddy';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

interface ShchemaProps {
  closeSchema: () => void;
}

/** JSON respresentation of buddy schema
 */
export const Schema = ({ closeSchema }: ShchemaProps): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className="bg-[#2E2F35] h-screen overflow-scroll no-scrollbar relative">
      {buddy?.buddy && (
        <pre className="py-5 px-3 ml-5  fancy-scrollbar overflow-x-auto overflow-y-auto text-white text-sm">
          {JSON.stringify(buddy.buddy, null, 2)}
        </pre>
      )}
      <CloseIcon
        onClick={closeSchema}
        className="cursor-pointer right-5 top-5 fixed"
      />
    </div>
  );
};
