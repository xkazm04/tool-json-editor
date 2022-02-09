import React from 'react';
import { useBuddy } from '../providers/Buddy';
import { saveSchema } from '../utils/schemaAPI';

interface BuddyEditorControllersProps {
  setShowSchema: () => void;
  schemaIsVisible: boolean;
}

/** Main controllers to handle schemas such as save to schema, show schema, switch between schemas
 *
 * @param
 * @returns JSX.Element
 */
export const BuddyEditorControllers = ({
  setShowSchema,
  schemaIsVisible,
}: BuddyEditorControllersProps): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className="w-full flex items-center justify-evenly mt-10 mb-6 ">
      {/** Schema switcher between REST, SDK and GRAPHQL etc. */}
      <div className="bg-glass rounded-md p-3 items-center">
        {buddy?.schemas.map(({ id, attributes }, index) => {
          return (
            <button
              onClick={() => buddy.setActiveSchema(id)}
              className={`btn w-36 mx-2 ${
                buddy.currentlyEditingSchema === id
                  ? 'bg-[#FF00FF] border-[#FF00FF]'
                  : ''
              }`}
              key={index}
              id={JSON.stringify(id)}
            >
              {attributes.Title}
            </button>
          );
        })}
      </div>
      {/** Save to schema button */}
      <div className="bg-glass rounded-md p-3">
        <button
          className="btn"
          onClick={() =>
            saveSchema(
              buddy?.currentlyEditingSchema,
              buddy?.buddy,
              () =>
                buddy?.addNotification(
                  'success',
                  'Schema is successfully updated'
                ),
              () =>
                buddy?.addNotification(
                  'error',
                  'Something went wrong. Schema is not saved. Go to fukku'
                )
            )
          }
        >
          Save schema to CMS
        </button>
      </div>
      {/** Show schema toggler */}
      <div className="flex justify-between items-center bg-glass rounded-md p-3">
        <label className="font-mono font-bold text-[20px] text-white">
          Show JSON schema
        </label>
        <input
          type="checkbox"
          checked={schemaIsVisible}
          className="toggle toggle-secondary m-auto ml-5 "
          onChange={() => setShowSchema()}
        />
      </div>
    </div>
  );
};
