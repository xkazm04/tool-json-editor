import React from 'react';
import { useBuddy } from '../../providers/Buddy';
import { saveSchema } from '../../utils/schemaAPI';

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
