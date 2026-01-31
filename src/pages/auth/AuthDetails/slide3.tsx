'use client';

// import React from 'react';

interface DataType {
  heardPlatform?: string;
  [key: string]: any;
}

interface Slide3Props {
  setdata_: (data: DataType | ((prev: DataType) => DataType)) => void;
  data_: DataType;
}

const platforms = [
  { name: 'Linkedin', bg: 'blue-600' },
  { name: 'Facebook', bg: 'blue-500' },
  { name: 'WhatsApp', bg: 'blue-500' },
  { name: 'Youtube', bg: 'blue-600' },
  { name: 'Instagram', bg: 'orange-500' },
  { name: 'Twitter', bg: 'orange-500' },
  { name: 'Other', bg: 'orange-500' },
];

export default function Slide3({ data_, setdata_ }: Slide3Props) {
  const setValue = (val: string) => {
    setdata_((data: DataType) => {
      return { ...data, heardPlatform: val };
    });
  };

  return (
    <div>
      <h4 className="text-2xl text-white font-semibold mb-6">How did you hear about us?</h4>

      <div className="flex flex-wrap gap-3">
        {platforms.map((platform, index) => (
          <button
            key={index}
            onClick={() => setValue(platform.name)}
            className={`px-5 py-2 rounded-full border-2 border-${platform.bg} 
                       transition-all hover:scale-105 active:scale-95
                       ${
                         platform.name === data_.heardPlatform
                           ? `bg-${platform.bg} text-white`
                           : 'bg-transparent text-white'
                       }`}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}