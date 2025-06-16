import React from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  required: boolean;
  label:string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  name,
  required,
  id,
  label,
  value,
  onChange
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border mb-3 border-primary text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={label}
        required={required}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
