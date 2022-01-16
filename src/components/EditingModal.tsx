import React, { useState } from "react";
import { Input } from "./Input";
import { BsFillTrashFill, BsFillXCircleFill } from "react-icons/bs";
import { useBuddy } from "../providers/Buddy";

interface OwnProps {
  closeModal: () => void;
}

export const EditingModal = ({ closeModal }: OwnProps): JSX.Element => {
  const [labelValue, setLabelValue] = useState("");
  const [inputs, setInputs] = useState([{ value: "" }]);
  const buddy = useBuddy();

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    inputIndex: number
  ) => {
    const value = (e.target as HTMLInputElement).value;
    const updatedInputs = [...inputs];
    updatedInputs[inputIndex]["value"] = value;
    setInputs(updatedInputs);
  };

  const handleInputRemove = (inputIndex: number) => {
    setInputs((prev) => prev.filter((_, idx) => idx !== inputIndex));
  };

  const handleInputAdd = () => {
    setInputs((prev) => [...prev, { value: "" }]);
  };

  const addFirstUseCase = () => {
    buddy?.addRootUseCase(labelValue, "input", inputs);
    closeModal();
  };

  return (
    <div className='w-full relative min-h-[300px] bg-red-400 rounded-lg my-5 p-5'>
      <Input
        labelText={"Select label for group of options"}
        value={labelValue}
        onChange={(e) => setLabelValue((e.target as HTMLInputElement).value)}
      />
      <div className='divider'></div>
      {inputs.map((input, index) => {
        return (
          <div key={index} className='grid grid-cols-[1fr_5%] items-center'>
            <Input
              labelText={`Option ${index + 1}`}
              value={input.value}
              onChange={(e) => handleInputChange(e, index)}
            />
            {index !== 0 && (
              <BsFillTrashFill
                className='self-center justify-self-center cursor-pointer'
                onClick={() => handleInputRemove(index)}
              />
            )}
          </div>
        );
      })}
      <div className='mt-4'>
        <button className='btn' onClick={handleInputAdd}>
          Add input
        </button>
        <button className='btn ml-5' onClick={() => addFirstUseCase()}>
          Add use case
        </button>
      </div>
      <BsFillXCircleFill
        onClick={closeModal}
        className='absolute top-4 right-4 scale-150 cursor-pointer'
      />
    </div>
  );
};
