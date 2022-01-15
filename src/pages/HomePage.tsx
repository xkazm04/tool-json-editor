import React, { useState } from "react";
import { EditingModal } from "../components/EditingModal";

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <button className='btn' onClick={() => setShowModal(true)}>
        Add use case
      </button>
      {showModal && <EditingModal closeModal={closeModal} />}
    </div>
  );
};
