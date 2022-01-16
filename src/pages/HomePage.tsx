import React, { useEffect, useState } from "react";
import { EditingModal } from "../components/EditingModal";
import { UseCases } from "../components/UseCases";
import { useBuddy } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const buddy = useBuddy()?.buddy;

  const closeModal = () => setShowModal(false);

  

  return (
    <div className='grid grid-cols-[50%_50%]'>
      <div>
        <button className='btn' onClick={() => setShowModal(true)}>
          Add use case
        </button>
        {showModal && <EditingModal closeModal={closeModal} />}
        <UseCases />
      </div>
      <pre className='p-3'>{buddy && JSON.stringify(buddy, null, 2)}</pre>
    </div>
  );
};
