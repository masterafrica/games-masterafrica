'use client';

import { User } from 'lucide-react';
import React from 'react';
// import Image from 'next/image';

interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  [key: string]: any;
}

interface InputFieldData {
  name: string;
  lefticon: React.ReactNode;
  props: {
    placeholder: string;
  };
}

interface Slide1Props {
  setdata_: (data: DataType) => void;
  data_: DataType;
}

const inputFields: InputFieldData[] = [
  {
    name: 'firstName',
    lefticon: (
        <User  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative mx-auto">
  
      // </div>
    ),
    props: {
      placeholder: 'First Name',
    },
  },
  {
    name: 'lastName',
    lefticon: (
    <User  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative mx-auto">
      // </div>
    ),
    props: {
      placeholder: 'Last Name',
    },
  },
  {
    name: 'username',
    lefticon: (
  <User  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative mx-auto">
      // </div>
    ),
    props: {
      placeholder: 'User Name (Optional)',
    },
  },
];

export default function Slide1({ data_, setdata_ }: Slide1Props) {
  const setData = (name: string, val: string) => {
    const updatedData = { ...data_ };
    updatedData[name] = val;
    setdata_(updatedData);
  };

  return (
    <div className="space-y-5">
      {inputFields.map((field, index) => (
        <div key={index} className="w-full flex justify-center items-center gap-3">
          {field.lefticon}
          <input
            type="text"
            name={field.name}
            value={data_[field.name] || ''}
            onChange={(e) => setData(field.name, e.target.value)}
            placeholder={field.props.placeholder}
            className="w-full px-4 py-2 mt-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all"
          />
        </div>
      ))}
    </div>
  );
}