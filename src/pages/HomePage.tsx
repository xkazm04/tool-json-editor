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
      <div className='w-full flex justify-evenly mb-6 '>
        <div className='flex justify-between items-center bg-blue-300 rounded-lg p-5'>
          <label className='font-mono font-bold text-[20px]'>Show schema</label>
          <input
            type='checkbox'
            checked={showSchema}
            className='toggle toggle-primary m-auto ml-5 '
            onChange={() => setShowSchema(!showSchema)}
          />
        </div>
        <div className='bg-blue-300 rounded-lg p-5'>
          <button
            className='btn'
            onClick={() =>
              saveSchema(buddy?.currentlyEditingSchema, buddy?.buddy)
            }
          >
            Save schema to CMS
          </button>
        </div>
        <div className='bg-blue-300 rounded-lg p-5'>
          {buddy?.schemas.map(({ id, attributes }, index) => {
            return (
              <button
                onClick={() => buddy.setActiveSchema(id)}
                className={`btn mx-5 ${
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
        {showSchema && <Schema />}
      </div>
    </>
  );
};
