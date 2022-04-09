import React from 'react';

export type HandleChangeType = (
  e: React.ChangeEvent<HTMLInputElement>,
  name: string | undefined
) => void | undefined;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: HandleChangeType;
  styleCss?: string;
}
export const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
  styleCss,
  step
}) => (
  <input
    placeholder={placeholder}
    type={type}
    step={step}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className={`my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism ${styleCss}`}
  />
);
