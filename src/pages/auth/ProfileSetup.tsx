'use client';

import React, { useState, createContext } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import * as _ from 'lodash';
// import { ApolloError, gql } from '@apollo/client';
// import { mutate } from '@/api';
// import omit from 'lodash.omit';
// import { useStore } from '@/context';
// import { Actions } from '@/context/reducer';
// import { useRecoilState } from 'recoil';
// import { hasSeenIntroState, userState } from '@/resources/user';
// import { handleGetTokens } from '@/utils';
// import { showToast } from '@/utils/toast';
// import { useLogout } from '@/hooks/use-auth';

// Import slides
import Slide1 from './AuthDetails/slide1';
import Slide2 from './AuthDetails/slide2';
import Slide3 from './AuthDetails/slide3';
import toast from 'react-hot-toast';
import { useSetupProfile } from '@/lib/graphql';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

// Types
interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  skill?: {
    id: string;
    name: string;
  };
  heardPlatform?: string;
}



// Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  skill: Yup.string().required().label('skill'),
});

// Context for Pager
export const PagerViewContext = createContext<{
  page: number;
  next: () => void;
} | null>(null);

// Stepper Component
const Stepper = ({ steps, current }: { steps: number; current: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 my-6">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index < current ? 'w-12 bg-blue-600' : 'w-8 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

// Logo Component
const Logo = () => {
  return (
    <div className="w-32 h-32 relative">
      
      <img
        src="/images/logo.svg"
        alt="Master Africa Logo"
        // fill
        className="object-contain"
        // priority
      />
    </div>
  );
};

// Header Component
const Header = ({
  backfunc,
  rightIcon,
}: {
  backfunc: () => void;
  rightIcon?: React.ReactNode;
}) => {
  return (
    <header className="flex items-center justify-between p-4 w-full">
      <button
        onClick={backfunc}
        className="p-2 hover:bg-black/5 text-white rounded-full transition-colors"
        aria-label="Go back"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {rightIcon && <div>{rightIcon}</div>}
    </header>
  );
};

// Button Component
const Button = ({
  title,
  onPress,
  disabled,
  loading,
  full,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
}) => {
  return (
    <button
      onClick={onPress}
      disabled={disabled || loading}
      className={`${full ? 'w-full' : ''} py-3 px-6 bg-blue-600 text-white rounded-lg font-medium 
                 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors flex items-center justify-center min-h-[48px]
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        title
      )}
    </button>
  );
};

// Main ProfileSetup Component
const ProfileSetup = () => {
      const { setupProfile, loading:_loading } = useSetupProfile();
  let logout =()=>{}
  // const { logout } = useLogout();
  const navigate = useNavigate();

  // const [, setHasSeenIntro] = useRecoilState(hasSeenIntroState);
  // const [user, setUser] = useRecoilState(userState);
   const { user, setUser } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const TOTALPAGE = 2;

  const [data_, setdata_] = useState<DataType>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
  });

  const [page, setPage] = useState(0);



  const handleRegister = async (data: DataType) => {
    let processedData: any = { ...data };
    if (processedData.skill) {
      processedData.skill = processedData.skill.id;
    }

    try {
      await validationSchema.validate(processedData);
    } catch (e: any) {
      if (e.errors) {
        toast(e.errors[0]|| 'error');
      }
      return;
    }


    
    

    try{

        setSubmitting(true);
   const result = await setupProfile(processedData);

      if (result.data?.SetupProfile) {
        // Update local user state
        const updatedUser = { ...user, ...result.data.SetupProfile };
         toast.success('Registration Successful');
        setUser(updatedUser);
          //  setUser((prevData: any) => {
          //   return { ...prevData, ...res?.data?.SetupProfile };
          // });
        localStorage.setItem("user", JSON.stringify(updatedUser));
           navigate('/games');
      }else{
             toast('an error occurred');
      }
      
    }catch (e:any){
      console.log(e)
      if (e?.errors) {
          return e?.errors.forEach((error: any) => {
            toast(error?.message || 'an error occurred');
          });
        }

    }finally{
         setSubmitting(false);
    }

  

   

  };

  const handleNext = () => {
    if (page < TOTALPAGE) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleContinue = () => {
    if (page >= TOTALPAGE) {
      handleRegister(data_);
    } else {
      handleNext();
    }
  };

  const handleBack = () => {
    if (page > 0) {
      handlePrev();
    } else {
    navigate(-1);
    }
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/Onboarding-screen5.png')" }}
    >
      {/* Scrollable container with keyboard awareness */}
      <div className="min-h-screen overflow-y-auto">
        <div className="pt-safe-top pb-safe-bottom flex flex-col min-h-screen">
          {/* Header */}
          <Header
            backfunc={handleBack}
            rightIcon={
              <button
                onClick={logout}
                className="p-2 hover:bg-black/5 text-white rounded-full transition-colors"
                aria-label="Logout"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            }
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col container-sm mx-auto px-4 max-w-md">
            {/* Logo and Title */}
            <div className="flex flex-col items-center justify-center mb-4">
              <Logo />
              <p className="font-semibold text-center mt-3 text-base text-white">
                Setup your Master Africa profile
              </p>
            </div>

            {/* Stepper */}
            <Stepper steps={3} current={page + 1} />

            {/* Slides Container - Flex-1 to push button to bottom */}
            <div className="flex-1 mb-6">
              <PagerViewContext.Provider value={{ page, next: handleNext }}>
                {page === 0 && <Slide1 data_={data_} setdata_={setdata_} />}
                {page === 1 && <Slide2 data_={data_ as any} setdata_={setdata_ as any} />}
                {page === 2 && <Slide3 data_={data_} setdata_={setdata_ as any} />}
              </PagerViewContext.Provider>
            </div>

            {/* Continue Button - Sticky at bottom */}
            <div className="pb-4">
              <Button
                title="Continue"
                onPress={handleContinue}
                disabled={submitting}
                loading={submitting}
                full
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;