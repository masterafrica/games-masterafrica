'use client';

import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { useNavigate } from 'react-router-dom';
import { useResendOtp, useVerifyOtp } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth-context';
import Countdown from '@/components/timers/countdown';
import FormOTPInput2 from '@/components/otp/otpinput';
import Modal_ from '@/components/modals/modal1';
// import { showToast } from '@/utils/toast';
// import { ApolloError, gql } from '@apollo/client';
// import { mutate } from '@/api';
// import { useRecoilState } from 'recoil';
// import { userState } from '@/resources/user';
// import { useResendOtp } from '@/hooks/use-index';
// import { useLogout } from '@/hooks/use-auth';

// Components
// import Layout from './Layout/Layout1';
// import Countdown from '@/components/count/countdown';
// import Modal_ from '@/components/modal/status_mode/modal';
// import Form, { FormButton } from '@/components/Form';
// import FormOTPInput2 from '@/components/Form/FormOtpinput2';

const validationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).label('one time code'),
});

const initialValues = {
  code: '',
};



// Header Component
const Header = ({
  title,
  back,
  rightIcon,
}: {
  title?: string;
  back?: string;
  rightIcon?: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 w-full">
      <button
        onClick={() => {
          if (back) {
            navigate(-1);
          } else {
            navigate(-1);
          }
        }}
        className="p-2 hover:bg-black/5 rounded-full transition-colors"
        aria-label="Go back"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {title && <h1 className="flex-1 text-center font-semibold">{title}</h1>}

      {rightIcon && <div>{rightIcon}</div>}
    </header>
  );
};

// Typography Component
const Typography = ({
  children,
  mode,
  style,
}: {
  children: React.ReactNode;
  mode?: 'h1' | 'p';
  style?: string;
}) => {
  if (mode === 'h1') {
    return <h1 className={style}>{children}</h1>;
  }
  return <p className={style}>{children}</p>;
};

// Button Component
const Button = ({
  title,
  onPress,
  disabled,
  loading,
  full,
  style,
  textStyle,
  type="button",
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  style?: string;
  textStyle?: string;
    type?:"button" | "submit" | "reset"
}) => {
  // let t:string =
  return (
    <button
      onClick={onPress}
      type={type ?? "button"}
      disabled={disabled || loading}
      className={`${full ? 'w-full' : ''} py-3 px-6 rounded-lg font-medium 
                 transition-colors flex items-center justify-center
                 disabled:opacity-50 disabled:cursor-not-allowed
                 ${style || 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
        <span className={textStyle}>{title}</span>
      )}
    </button>
  );
};

// Main OTP Component
const Otp = () => {
     const { verifyOtp, loading:verifyOtpLoading } = useVerifyOtp();
     const [ resendOtp,{ loading:resendOtpLoading,error:resendOtpError} ] = useResendOtp();
        // const [getSkills, { loading: getSkillsLoading }] = useGetSkills();
//   const { resendOtp, resendOtpResult } = useResendOtp();
  const navigate = useNavigate();

  const DEFAULTTIME = 20;
  const [time, setTime] = useState(DEFAULTTIME);
//   const [user, setUser] = useRecoilState(userState);
  const { user, setUser:_st ,logout} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
//   const { logout } = useLogout();

  useEffect(() => {
    if (!resendOtpError && !resendOtpLoading) {
      setTime(DEFAULTTIME);
    }
  }, [resendOtpLoading]);

  const handleSubmit = async (
    data: typeof initialValues,
    _helpers: FormikHelpers<typeof initialValues>
  ) => {
    console.log('muteeee', user);
       try{

        // setSubmitting(true);
   const result = await verifyOtp({ ...data, identifier: user?.email },);

      if ((result.data as any)?.verifyUser) {
        // Update local user state
        // const updatedUser = { ...user, ...result.data.SetupProfile };
         toast.success('Verification Successful');
        // setUser(updatedUser);
          //  setUser((prevData: any) => {
          //   return { ...prevData, ...res?.data?.SetupProfile };
          // });
        // localStorage.setItem("user", JSON.stringify(updatedUser));
           navigate('/profile-setup');
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

             toast(e?.message || 'an error occurred');

    }finally{
        //  setSubmitting(false);
    }
    // mutate({
    //   mutation: VERIFY_OTP,
    //   variables: {
    //     input: { ...data, identifier: user.email },
    //   },
    // })
    //   .then((res) => {
    //     if (res.errors) {
    //       helpers.setSubmitting(false);

    //       return res.errors.forEach((error: any) => {
    //         showToast(error?.message, 'Error', 'error');
    //       });
    //     }

    //     if (res.data?.verifyUser) {
    //       setModalVisible(res?.data?.verifyUser);
    //       helpers.resetForm();
    //       helpers.setSubmitting(false);
    //     }
    //   })
    //   .catch((err: ApolloError) => {
    //     console.log(err);
    //     showToast(err?.message, 'Error', 'error');
    //     helpers.setSubmitting(false);
    //   });
  };

  const handleResendOtp = async () => {
    try {
        if(!user?.email){
            toast("login to verify");
            return
        }
      const data = await resendOtp({variables:{identifier:user?.email}});
      console.log(data.data);
      
      if ((data.data as any)?.sendVerificationCode?.success) {
        setTime(DEFAULTTIME);
        toast('otp resend successful');
      } else {
        toast('An error occurred');
      }
    } catch (e) {
      console.log(e);
      toast('An error occurred');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/Onboarding-screen5.png')" }}
    >
      <div className="min-h-screen overflow-y-auto">
        <div className="pt-safe-top min-h-screen flex flex-col">
          {/* Header */}
          <Header
            title="Otp"
            back="/authenticate"
            rightIcon={
              <button
                onClick={logout}
                className="px-4 py-2 hover:bg-black/5 rounded transition-colors"
              >
                Logout
              </button>
            }
          />

          {/* Layout Wrapper */}
          {/* <Layout> */}
            {/* Success Modal */}
            <Modal_
              modalVisible={modalVisible ? true : false}
              continuee={() => {
                setTimeout(() => {
                  navigate('/profile-setup');
                }, 1000);
              }}
              setModalVisible={setModalVisible}
              text="OTP code verified successfully"
              success={true}
            />

            {/* Form */}
                <Formik
  initialValues={initialValues}
              onSubmit={handleSubmit}

              validationSchema={validationSchema}
    >

            <Form
            
            >
              <div className="container-sm mx-auto px-4 flex-1 pb-20 max-w-md">
                {/* Logo */}
                <div className="h-[50px] my-10 mx-auto relative w-full max-w-[200px]">
                  <img
                    src="/images/logo.svg"
                    alt="Logo"
                    // fill
                    className="object-contain"
                    // priority
                  />
                </div>

                {/* Title */}
                <Typography mode="h1" style="text-5xl self-center text-center mb-5">
                  Enter your verification code
                </Typography>

                {/* Subtitle */}
                <Typography mode="p" style="text-center text-gray-500 mb-5">
                  We have sent an otp via your email
                </Typography>

                {/* OTP Input */}
                <FormOTPInput2 name="code" pinCount={4} />

                {/* Countdown Timer */}
                <Countdown time={time} settime={setTime} />

                {/* Resend OTP Button */}
                <Button
                  title="Resend OTP"
                  loading={resendOtpLoading}
                  disabled={time > 0 || resendOtpLoading}
                  style="bg-transparent p-0 flex-row justify-center"
                  textStyle="text-black"
                  full
                  onPress={handleResendOtp}
                />

                {/* Verify Button */}
                <Button
                onPress={()=>{}}
                  title="Verify"
                    loading={verifyOtpLoading}
                         disabled={ resendOtpLoading || verifyOtpLoading}
                  type="submit"
                  
                  full
                  style="mt-3 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white mt-auto"
               />
              </div>
            </Form>
    </Formik>
          {/* </Layout> */}
        </div>
      </div>
    </div>
  );
};

export default Otp;