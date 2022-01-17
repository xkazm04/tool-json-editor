import React, { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { BsFillTrashFill, BsFillXCircleFill } from "react-icons/bs";
import { useBuddy } from "../providers/Buddy";
import AltKey from "../assets/alt.png";
import PlusKey from "../assets/plus.png";
import MinusKey from "../assets/minus.png";

interface OwnProps {
  closeModal: () => void;
}

export const EditingModal = ({ closeModal }: OwnProps): JSX.Element => {
  const [labelValue, setLabelValue] = useState("");
  const [inputs, setInputs] = useState([{ value: "" }]);
  const buddy = useBuddy();
  const newOptionRef = useRef<HTMLInputElement | null>(null);
  const labelRef = useRef<HTMLInputElement | null>(null);
  const addOptionRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const keysPressed: { [key: string]: boolean } = {};

    const onKeyUp = (event: KeyboardEvent) => {
      keysPressed[event.key] = true;
    };
    const secondKeyUp = (event: KeyboardEvent) => {
      keysPressed[event.key] = true;
      if (keysPressed["Alt"] && event.key === "+") {
        addOptionRef.current?.click();
      }
      if (keysPressed["Alt"] && event.key === "-" && inputs.length > 1) {
        const copy = [...inputs];
        copy.pop();
        setInputs(copy);
      }
    };

    document.addEventListener("keydown", onKeyUp);
    document.removeEventListener("keyup", (event: KeyboardEvent) => {
      delete keysPressed[event.key];
    });
    document.addEventListener("keydown", secondKeyUp);
    console.log("keys", keysPressed);

    return () => {
      document.removeEventListener("keydown", onKeyUp);
      document.removeEventListener("keydown", secondKeyUp);
    };
  });

  useEffect(() => {
    labelRef.current?.focus();
  }, []);

  const validInputs = () => {
    const isInputsValid = inputs.every((input) => input.value !== "".trim());
    const isLabelValid = labelValue.trim();
    return isInputsValid && isLabelValid;
  };

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
        ref={labelRef}
        labelText={"Select label for group of options"}
        value={labelValue}
        onChange={(e) => setLabelValue((e.target as HTMLInputElement).value)}
      />
      <div className='divider'></div>
      {inputs.map((input, index) => {
        return (
          <div
            key={index}
            className='grid grid-cols-[1fr_30%] gap-x-4 items-center'
          >
            <Input
              ref={newOptionRef}
              labelText={`Option ${index + 1}`}
              value={input.value}
              onChange={(e) => handleInputChange(e, index)}
            />
            {index !== 0 && (
              <>
                <button
                  className='btn justify-self-end self-end'
                  onClick={() => handleInputRemove(index)}
                >
                  Delete{" "}
                  <div className='w-7 h-7 ml-1'>
                    <img src={AltKey} alt='' />
                  </div>
                  <span className='ml-2'>+</span>
                  <div className='w-6 h-6 ml-1'>
                    <img src={MinusKey} alt='' />
                  </div>
                </button>
              </>
            )}
          </div>
        );
      })}
      <div className='mt-4'>
        <button ref={addOptionRef} className='btn' onClick={handleInputAdd}>
          Add input
          <div className='w-7 h-7 ml-1'>
            <img src={AltKey} alt='' />
          </div>
          <span className='ml-2'>+</span>
          <div className='w-6 h-6 ml-1'>
            <img src={PlusKey} alt='' />
          </div>
        </button>
        <button
          disabled={!validInputs()}
          className='btn ml-5'
          onClick={() => addFirstUseCase()}
        >
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
