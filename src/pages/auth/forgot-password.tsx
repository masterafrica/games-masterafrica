import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { AtSign, ArrowLeft, Key, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useForgotPassword, useResetPassword } from "@/lib/graphql";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/schemas";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const {
    forgotPassword,
    loading: forgotLoading,
    error: forgotError,
  } = useForgotPassword();
  const {
    resetPassword,
    loading: resetLoading,
    error: resetError,
  } = useResetPassword();
  const [otpSent, setOtpSent] = React.useState(false);
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const [savedIdentifier, setSavedIdentifier] = React.useState("");

  const forgotPasswordFormik = useFormik({
    initialValues: {
      identifier: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        const result = await forgotPassword(values.identifier);

        if (result.data?.forgotPassword?.success) {
          setSavedIdentifier(values.identifier);
          setOtpSent(true);
        }
      } catch {
        return;
      }
    },
  });

  const resetPasswordFormik = useFormik({
    initialValues: {
      code: "",
      identifier: savedIdentifier,
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const result = await resetPassword({
          code: values.code,
          identifier: savedIdentifier,
          password: values.password,
        });

        if (result.data?.resetPassword?.success) {
          setResetSuccess(true);
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } catch {
        return;
      }
    },
  });

  if (resetSuccess) {
    return (
      <section>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="text-green-400" size={64} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Password Reset Successful
          </h2>
          <p className="text-white/70 text-sm">
            Your password has been reset successfully. Redirecting to login...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          {otpSent ? "Reset Password" : "Forgot Password"}
        </h2>
        <p className="text-white/70 text-sm">
          {otpSent
            ? "Enter the OTP code you received and your new password"
            : "Enter your email, username, or phone number and we'll send you an OTP code to reset your password"}
        </p>
      </div>

      {!otpSent ? (
        <form
          className="space-y-6"
          onSubmit={forgotPasswordFormik.handleSubmit}
        >
          <div>
            <Input
              className="!text-white"
              classNames={{
                input: "!text-white placeholder:text-white/80",
                inputWrapper:
                  "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
                label: "!text-white/70",
              }}
              isInvalid={
                forgotPasswordFormik.touched.identifier &&
                Boolean(forgotPasswordFormik.errors.identifier)
              }
              label="Email, Username, or Phone"
              name="identifier"
              placeholder="your@email.com, username, or phone"
              startContent={<AtSign className="text-white" size={16} />}
              type="text"
              value={forgotPasswordFormik.values.identifier}
              onBlur={forgotPasswordFormik.handleBlur}
              onChange={forgotPasswordFormik.handleChange}
            />
            {forgotPasswordFormik.touched.identifier &&
              forgotPasswordFormik.errors.identifier && (
                <p className="text-red-400 text-xs mt-1">
                  {forgotPasswordFormik.errors.identifier}
                </p>
              )}
          </div>

          {forgotError && (
            <p className="text-red-400 text-sm">{forgotError.message}</p>
          )}

          <Button
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            isDisabled={
              !forgotPasswordFormik.isValid || forgotPasswordFormik.isSubmitting
            }
            isLoading={forgotLoading || forgotPasswordFormik.isSubmitting}
            size="lg"
            type="submit"
          >
            Send OTP Code
          </Button>
        </form>
      ) : (
        <>
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
            <p className="text-green-300 text-sm text-center">
              We&rsquo;ve sent a 4-digit OTP code to the email associated with
              your account. Please check your email.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={resetPasswordFormik.handleSubmit}
          >
            <div>
              <Input
                classNames={{
                  input: "!text-white placeholder:text-white/80",
                  inputWrapper:
                    "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
                  label: "text-white/70",
                }}
                isInvalid={
                  resetPasswordFormik.touched.code &&
                  Boolean(resetPasswordFormik.errors.code)
                }
                label="OTP Code"
                name="code"
                placeholder="Enter 4-digit code"
                startContent={<Shield className="text-white" size={16} />}
                type="text"
                maxLength={4}
                value={resetPasswordFormik.values.code}
                onBlur={resetPasswordFormik.handleBlur}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  resetPasswordFormik.setFieldValue("code", value);
                }}
              />
              {resetPasswordFormik.touched.code &&
                resetPasswordFormik.errors.code && (
                  <p className="text-red-400 text-xs mt-1">
                    {resetPasswordFormik.errors.code}
                  </p>
                )}
            </div>

            <div>
              <Input
                classNames={{
                  input: "!text-white placeholder:text-white/80",
                  inputWrapper:
                    "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
                  label: "text-white/70",
                }}
                isInvalid={
                  resetPasswordFormik.touched.password &&
                  Boolean(resetPasswordFormik.errors.password)
                }
                label="New Password"
                name="password"
                placeholder="Enter new password"
                startContent={<Key className="text-white" size={16} />}
                type="password"
                value={resetPasswordFormik.values.password}
                onBlur={resetPasswordFormik.handleBlur}
                onChange={resetPasswordFormik.handleChange}
              />
              {resetPasswordFormik.touched.password &&
                resetPasswordFormik.errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {resetPasswordFormik.errors.password}
                  </p>
                )}
            </div>

            <div>
              <Input
                classNames={{
                  input: "!text-white placeholder:text-white/80",
                  inputWrapper:
                    "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
                  label: "text-white/70",
                }}
                isInvalid={
                  resetPasswordFormik.touched.confirmPassword &&
                  Boolean(resetPasswordFormik.errors.confirmPassword)
                }
                label="Confirm New Password"
                name="confirmPassword"
                placeholder="Confirm new password"
                startContent={<Key className="text-white" size={16} />}
                type="password"
                value={resetPasswordFormik.values.confirmPassword}
                onBlur={resetPasswordFormik.handleBlur}
                onChange={resetPasswordFormik.handleChange}
              />
              {resetPasswordFormik.touched.confirmPassword &&
                resetPasswordFormik.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {resetPasswordFormik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {resetError && (
              <p className="text-red-400 text-sm">{resetError.message}</p>
            )}

            <Button
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              isDisabled={
                !resetPasswordFormik.isValid || resetPasswordFormik.isSubmitting
              }
              isLoading={resetLoading || resetPasswordFormik.isSubmitting}
              size="lg"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </>
      )}

      <div className="mt-6 text-center">
        <Link
          className="text-purple-300 hover:text-purple-200 font-semibold flex items-center justify-center gap-2"
          href="/auth/login"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
