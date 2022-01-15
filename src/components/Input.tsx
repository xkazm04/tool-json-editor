import React from "react";
interface OwnProps extends React.HTMLProps<HTMLInputElement> {
  labelText?: string;
}

export const Input = React.forwardRef(
  (
    { labelText = "", placeholder = "", ...props }: OwnProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className='form-control my-2'>
        <label className='label'>
          <span className='label-text text-white'>{labelText}</span>
        </label>
        <input
          ref={ref}
          {...props}
          type='text'
          placeholder={placeholder}
          className='input input-bordered'
        />
      </div>
    );
  }
);
