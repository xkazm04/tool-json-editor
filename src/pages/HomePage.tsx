import React, { useState } from "react";
// import { EditingModal } from "../components/EditingModal";
import { Schema } from "../components/Schema";
import { UseCases } from "../components/UseCases";
import { useBuddy } from "../providers/Buddy";
import { saveSchema } from "../utils/schemaAPI";

export const HomePage = () => {
  // const [showModal, setShowModal] = useState(false);
  const [showSchema, setShowSchema] = useState(true);
  const buddy = useBuddy();

  // const closeModal = () => setShowModal(false);

  if (buddy?.loadingSchema) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className='w-full flex items-center justify-evenly mt-10 mb-6 '>
        <div className='bg-blue-400 rounded-lg p-3 items-center'>
          {buddy?.schemas.map(({ id, attributes }, index) => {
            return (
              <button
                onClick={() => buddy.setActiveSchema(id)}
                className={`btn mx-2 ${
                  buddy.currentlyEditingSchema === id ? "bg-red-400" : ""
                }`}
                key={index}
                id={JSON.stringify(id)}
              >
                {attributes.Title}
              </button>
            );
          })}
        </div>
        <div className='bg-blue-400 rounded-lg p-3'>
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

        <div className='flex justify-between items-center bg-blue-400 rounded-lg p-3'>
          <label className='font-mono font-bold text-[20px]'>Show schema</label>
          <input
            type='checkbox'
            checked={showSchema}
            className='toggle toggle-primary m-auto ml-5 '
            onChange={() => setShowSchema(!showSchema)}
          />
        </div>
      </div>
      <div
        className={`grid  m-auto ${
          showSchema ? "grid-cols-[50%_50%]" : "grid-cols-[100%]"
        }`}
      >
        <div>
          <div className='max-w-screen-lg m-auto'>
            {/* {(!buddy?.buddy || buddy.schemas.length === 0) && (
              <button className='btn' onClick={() => setShowModal(!showModal)}>
                {showModal ? "Close" : "Add use case"}
              </button>
            )} */}
          </div>
          {/* {showModal && <EditingModal closeModal={closeModal} />} */}
          <UseCases />
        </div>
        <div className=''>{showSchema && <Schema />}</div>
      </div>
    </>
  );
};
