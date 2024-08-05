import React, { Dispatch, SetStateAction, useState } from "react";

interface InputItemProps {
  title: string;
  placeholder: string;
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>
}

const InputItem = ({ title, placeholder, data, setData }: InputItemProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setData((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  }

  const handleRemoveItem = (index: number) => {
    setData((prev) => prev.filter((_, i) => i  !== index));
  }

  return (
    <div className="mb-4">
      <h2 id="input-item-title" className="text-xl font-bold">
        {title}
      </h2>
      <div className="flex items-center mt-2">
        <input
          className="p-2 border border-gray-300 rounded mr-3 flex-grow"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}/>
        <button
          onClick={handleAddItem}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
      {/*  LIST OF DATA */}
      <ul>
        {data.map((item, index) => (
          <li key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputItem;
