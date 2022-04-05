import React from 'react';
interface OwnProps extends React.HTMLProps<HTMLInputElement> {
  labelText?: string;
}

export const Input = React.forwardRef(
  (
    { labelText = '', placeholder = '', label, ...props }: OwnProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={`${props.className} form-control py-1`}>
        <label className="label label-text text-white">{label}</label>
        <input
          ref={ref}
          {...props}
          type="text"
          placeholder={placeholder}
          className="p-2 bg-input_bg outline-none text-light-400"
        />
      </div>
    );
  }
);
