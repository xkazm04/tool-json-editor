import React, { useEffect, useRef } from 'react';

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({
  label,
  className,
  ...props
}: TextAreaProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <textarea
        ref={textAreaRef}
        {...props}
        className={`${className} p-2 bg-[#FFFFFF0F] outline-none text-green-600 bg-stone-700`}
        placeholder="Insert your lovely code snippet"
      ></textarea>
    </div>
  );
};
