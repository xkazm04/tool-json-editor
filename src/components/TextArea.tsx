import React, { useEffect, useRef } from "react";

export const TextArea = (props: React.HTMLProps<HTMLTextAreaElement>) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text text-white'>Code example</span>
      </label>
      <textarea
        ref={textAreaRef}
        {...props}
        className='textarea h-24 textarea-bordered text-green-600 bg-stone-700'
        placeholder='Insert your lovely code snippet'
      ></textarea>
    </div>
  );
};
