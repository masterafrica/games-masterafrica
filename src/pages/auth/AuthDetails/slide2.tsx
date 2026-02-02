'use client';

import  { memo } from 'react';
// import Image from 'next/image';
// import { SkillDropdown } from '../components/skill-dropdown';
import { ENUMSKILLGROUP } from '@/lib/graphql';
import { SkillDropdown } from './dropdownlist';
import { Workflow } from 'lucide-react';
// import { ENUMSKILLGROUP } from '@/enums';

interface DataType {
  skill?: {
    id: string;
    name: string;
    group: string;
  };
  [key: string]: any;
}

interface Slide2Props {
  setdata_: (data: DataType | ((prev: DataType) => DataType)) => void;
  data_: DataType;
}

const contentTypes = [
  { name: 'Online courses', bg: 'purple-500' },
  { name: 'Stock Videos', bg: 'green-500' },
  { name: 'Podcast', bg: 'yellow-500' },
  { name: 'Edutainment short film', bg: 'blue-500' },
  { name: 'Education games', bg: 'orange-500' },
  { name: 'Reels', bg: 'pink-500' },
  { name: 'News & Current affairs', bg: 'pink-600' },
];

const skillGroups = [
  {
    group: ENUMSKILLGROUP.TECHNICAL,
    lefticon: (
        <Workflow  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative">
      //   <img
      //     src="/images/cpu.png"
      //     alt="Technical"
      //     // fill
      //     className="object-contain"
      //   />
      // </div>
    ),
  },
  {
    group: ENUMSKILLGROUP.SOFT,
    lefticon: (
      <Workflow  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative">
      //   <img
      //     src="/images/simple-icons_hyperskill.png"
      //     alt="Soft Skills"
      //     // fill
      //     className="object-contain"
      //   />
      // </div>
    ),
  },
  {
    group: ENUMSKILLGROUP.MANUAL,
    lefticon: (
      <Workflow  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative">
      //   <img
      //     src="/images/Group 2.png"
      //     alt="Manual"
      //     // fill
      //     className="object-contain"
      //   />
      // </div>
    ),
  },
  {
    group: ENUMSKILLGROUP.CREATIVE,
    lefticon: (
      <Workflow  className="w-8 h-8 text-white"/>
      // <div className="w-24 h-24 relative">
      //   <img
      //     src="/images/Vector (1).png"
      //     alt="Creative"
      //     // fill
      //     className="object-contain"
      //   />
      // </div>
    ),
  },
];

const Slide2 = memo(({ data_, setdata_ }: Slide2Props) => {
  const setValue = (val: any) => {
    setdata_((data: DataType) => {
      return { ...data, skill: val };
    });
  };

  return (
    <div className="space-y-6">
      {/* Skills Dropdown */}
      {skillGroups.map((skillGroup, index) => (
        <SkillDropdown
          key={index}
          group={skillGroup.group}
          value={data_.skill}
          setValue={setValue}
          lefticon={skillGroup.lefticon}
        />
      ))}

      {/* Content Types */}
      {/* <div className="mt-8">
        <p className="text-lg font-medium mb-4 text-white">Content type</p>
        <div className="flex flex-wrap gap-3">
          {contentTypes.map((content, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full border-2 border-${content.bg} 
                         text-gray-600 text-sm text-white cursor-default`}
            >
              {content.name}
            </span>
          ))}
        </div>
      </div> */}
    </div>
  );
});

Slide2.displayName = 'Slide2';

export default Slide2;