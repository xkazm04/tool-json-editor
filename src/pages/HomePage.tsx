import React, { useState } from "react";
import { EditingModal } from "../components/EditingModal";
import { UseCases } from "../components/UseCases";
import { useBuddy } from "../providers/Buddy";

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const buddy = useBuddy()?.buddy;
  const [showSchema, setShowSchema] = useState(true);

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className='w-full flex justify-center mb-6 '>
        <div className='flex justify-between items-center'>
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
            <button className='btn' onClick={() => setShowModal(!showModal)}>
              {showModal ? "Close" : "Add use case"}
            </button>
          </div>
          {showModal && <EditingModal closeModal={closeModal} />}
          <UseCases />
        </div>
        {showSchema && (
          <div>
            <pre className='p-3'>{buddy && JSON.stringify(buddy, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};
