import React, { useState } from "react";
import { EditingModal } from "../components/EditingModal";
import { BuddyBuilderType } from "../types";
import { createUseCase } from "../utils/createUseCase";

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [buddy, setBuddy] = useState<BuddyBuilderType | {}>({});

  const closeModal = () => setShowModal(false);

  const addUseCase = (
    value: string,
    useCaseType: BuddyBuilderType["useCaseType"],
    useCaseOptions: { value: string }[]
  ) => {
    const useCase = createUseCase(useCaseType, value, undefined);
    setBuddy(buddy);

    const options = useCaseOptions.map((option) =>
      createUseCase(useCaseType, option.value)
    );
    useCase.children = options;

    setBuddy(useCase);
  };

  return (
    <div className='grid grid-cols-[50%_50%]'>
      <div>
        <button className='btn' onClick={() => setShowModal(true)}>
          Add use case
        </button>
        {showModal && (
          <EditingModal addUseCase={addUseCase} closeModal={closeModal} />
        )}
      </div>
      <pre>{JSON.stringify(buddy, null, 2)}</pre>
    </div>
  );
};
