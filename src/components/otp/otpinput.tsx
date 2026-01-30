'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';

interface FormOTPInput2Props {
  name: string;
  pinCount: number;
}

const FormOTPInput2 = ({ name, pinCount }: FormOTPInput2Props) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  const [otp, setOtp] = useState<string[]>(Array(pinCount).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, pinCount);
  }, [pinCount]);

  // Update formik value when OTP changes
  useEffect(() => {
    const otpString = otp.join('');
    setFieldValue(name, otpString);
  }, [otp, name, setFieldValue]);

  // Initialize OTP from formik values
  useEffect(() => {
    if (values[name] && values[name] !== otp.join('')) {
      const chars = values[name].split('').slice(0, pinCount);
      setOtp([...chars, ...Array(pinCount - chars.length).fill('')]);
    }
  }, [values[name], pinCount]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < pinCount - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        // Clear current box
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous box and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle right arrow
    if (e.key === 'ArrowRight' && index < pinCount - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, pinCount);
    const digits = pastedData.replace(/\D/g, '').split('');
    
    if (digits.length > 0) {
      const newOtp = [...Array(pinCount)].map((_, idx) => digits[idx] || '');
      setOtp(newOtp);
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(val => !val);
      const focusIndex = nextEmptyIndex === -1 ? pinCount - 1 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    // Select the content when focused
    inputRefs.current[index]?.select();
  };

  return (
    <div className="w-full mb-6">
      <div className="flex justify-center gap-3 mb-2">
        {Array.from({ length: pinCount }).map((_, index) => (
          <Field
            key={index}
            ref={(el:any) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e:any) => handleChange(index, e.target.value)}
            onKeyDown={(e:any) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-semibold 
                       border-2 rounded-lg transition-all
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       ${
                         errors[name] && touched[name]
                           ? 'border-red-500'
                           : otp[index]
                           ? 'border-blue-500 bg-blue-50'
                           : 'border-gray-300'
                       }`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      
      {errors[name] && touched[name] && (
        <p className="text-red-500 text-sm text-center mt-2">
          {errors[name] as string}
        </p>
      )}
    </div>
  );
};

export default FormOTPInput2;