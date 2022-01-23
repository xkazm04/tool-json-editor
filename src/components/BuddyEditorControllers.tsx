import React from "react";
import { useBuddy } from "../providers/Buddy";
import { saveSchema } from "../utils/schemaAPI";

interface OwnProps {
  setShowSchema: () => void;
  schemaIsVisible: boolean;
}

export const BuddyEditorControllers = ({
  setShowSchema,
  schemaIsVisible,
}: OwnProps): JSX.Element => {
  const buddy = useBuddy();
  return (
    <div className='w-full flex items-center justify-evenly mt-10 mb-6 '>
      <div className='bg-glass rounded-md p-3 items-center'>
        {buddy?.schemas.map(({ id, attributes }, index) => {
          return (
            <button
              onClick={() => buddy.setActiveSchema(id)}
              className={`btn  mx-2 ${
                buddy.currentlyEditingSchema === id
                  ? "bg-[#FF00FF] border-[#FF00FF]"
                  : ""
              }`}
              key={index}
              id={JSON.stringify(id)}
            >
              {attributes.Title}
            </button>
          );
        })}
      </div>
      <div className='bg-glass rounded-md p-3'>
        <button
          className='btn'
          onClick={() =>
            saveSchema(
              buddy?.currentlyEditingSchema,
              buddy?.buddy,
              () =>
                buddy?.addNotification(
                  "success",
                  "Schema is successfully updated"
                ),
              () =>
                buddy?.addNotification(
                  "error",
                  "Something went wrong. Schema is not saved. Go to fukku"
                )
            )
          }
        >
          Save schema to CMS
        </button>
      </div>
      <div className='flex justify-between items-center bg-glass rounded-md p-3'>
        <label className='font-mono font-bold text-[20px] text-white'>
          Show JSON schema
        </label>
        <input
          type='checkbox'
          checked={schemaIsVisible}
          className='toggle toggle-secondary m-auto ml-5 '
          onChange={() => setShowSchema()}
        />
      </div>
    </div>
  );
};
