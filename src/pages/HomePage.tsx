import React, { useEffect, useState } from "react";
import { EditingModal } from "../components/EditingModal";
import { UseCases } from "../components/UseCases";
import { useBuddy } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState<BuddyBuilderType[] | []>([]);
  const buddy = useBuddy()?.buddy;

  const closeModal = () => setShowModal(false);

  const updateInputs = (inputs: BuddyBuilderType[]) => {
    if (buddy && inputs.length === 0) {
      setInputs([buddy]);
    } else {
      const updatedInputs = inputs.map((input, index) => {
        let matchedInput = null;
        const current = buddy;
        const queue = [];
        queue.push(current);

        while (queue.length > 0) {
          const last = queue.shift();
          if (last?.id === input.id) {
            matchedInput = last;
          } else {
            last?.children.forEach((child) => queue.push(child));
          }
        }
        return matchedInput;
      });
      const res = updatedInputs;
      setInputs(res as BuddyBuilderType[]);
    }
  };

  useEffect(() => {
    if (!buddy) return;
    updateInputs(inputs);
  }, [buddy]);

  return (
    <div className='grid grid-cols-[50%_50%]'>
      <div>
        <button className='btn' onClick={() => setShowModal(true)}>
          Add use case
        </button>
        {showModal && <EditingModal closeModal={closeModal} />}
        <UseCases inputs={inputs} />
      </div>
      <pre className='p-3'>{buddy && JSON.stringify(buddy, null, 2)}</pre>
    </div>
  );
};
