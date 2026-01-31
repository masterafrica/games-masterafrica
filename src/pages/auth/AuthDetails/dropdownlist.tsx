'use client';

import React, { memo, useState } from 'react';
// import { DropdownList } from './dropdown-list';
// import { useGetSkills, GetSkillInput } from '@/hooks/use-skills';
// import { showToast } from '@/utils/toast';
import * as _ from 'lodash';
import { DropdownList } from '@/components/dropdownlist';
import { getSkillInput, useGetSkills } from '@/lib/graphql';
import toast from 'react-hot-toast';

interface SkillDropdownProps {
  value: any;
  group: string;
  setValue: (value: any) => void;
  lefticon: React.ReactNode;
}

export const SkillDropdown = memo(
  ({ group, setValue, value, lefticon }: SkillDropdownProps) => {
    const [data, setData] = useState({
      hasMore: false,
      nextPage: 1,
      skills: [],
      filter: null,
    });

    // const { getSkills, getSkillsResult } = useGetSkills();
    // const [getSkills] = useGetSkills();
    // const {getSkills} = useGetSkills();
      const [getSkills, { loading: getSkillsLoading }] = useGetSkills();

    const handleSkills = async (input: getSkillInput, add: boolean = false) => {
      console.log("getskillll")
      try {
        const result = await getSkills({variables:{input}});

        
        const list = (result?.data as any)?.GetSkills;

        console.log(list,"list")

        if (list) {
          setData((prevData) => {
            const newData = { ...prevData };
            newData.hasMore = list.hasMore;
            newData.nextPage = list.nextPage;
            newData.skills = add
              ? (_.uniqBy([...newData.skills, ...list.skills], 'id') as any)
              : (list.skills as any);
            return newData;
          });
        }
      } catch (error: any) {
        console.log(error)
        toast(error?.message||'An error occured');
      }
    };

    const onMount = () => {
      if (data.skills.length === 0) {
        handleSkills({ group, page: data.nextPage }, true);
      }
    };

    const onChangeText = (filter: string) => {
      handleSkills({ group, page: 1, filter }, false);
    };

    return (
      <DropdownList
        loading={getSkillsLoading}
        placeholder={`${group} skill`}
        value={value && group === value.group ? { ...value, value: value.name } : null}
        icon={lefticon}
        data={data.skills}
        onShow={onMount}
        onEndReached={() => {
          // handleSkills({ group, page: data.nextPage }, true);
        }}
        renderItem={({ item }: any) => (
          <button
            onClick={() => setValue(item)}
            className="w-full h-10 flex items-center text-left px-2 hover:bg-gray-100 
                     rounded transition-colors truncate"
          >
            {item.name}
          </button>
        )}
        onChangeText={onChangeText}
        // onChangeText={()=>{}}
        setItemChange={(value: any) => {
          setValue(value);
        }}
      />
    );
  }
);

SkillDropdown.displayName = 'SkillDropdown';