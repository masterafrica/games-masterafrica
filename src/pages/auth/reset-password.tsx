import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Key, ArrowLeft, CheckCircle2, AtSign, Shield } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";

import { useResetPassword } from "@/lib/graphql";
import { resetPasswordSchema } from "@/lib/schemas";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const identifierFromUrl = searchParams.get("identifier");
  const { resetPassword, loading, error } = useResetPassword();
  const [success, setSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
      identifier: identifierFromUrl || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const result = await resetPassword({
          code: values.code,
          identifier: values.identifier,
          password: values.password,
        });

        if (result.data?.resetPassword?.success) {
          setSuccess(true);
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } catch {
        return;
      }
    },
  });

  if (success) {
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
        <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-white/70 text-sm">
          Enter the OTP code you received and your new password
        </p>
      </div>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <Input
            classNames={{
              input: "!text-white placeholder:text-white/80",
              inputWrapper:
                "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
              label: "text-white/70",
            }}
            isInvalid={formik.touched.code && Boolean(formik.errors.code)}
            label="OTP Code"
            name="code"
            placeholder="Enter 4-digit code"
            startContent={<Shield className="text-white" size={16} />}
            type="text"
            maxLength={4}
            value={formik.values.code}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/\D/g, "");
              formik.setFieldValue("code", value);
            }}
          />
          {formik.touched.code && formik.errors.code && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.code}</p>
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
              formik.touched.identifier && Boolean(formik.errors.identifier)
            }
            label="Email, Username, or Phone"
            name="identifier"
            placeholder="Enter your identifier"
            startContent={<AtSign className="text-white" size={16} />}
            type="text"
            value={formik.values.identifier}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isDisabled={!!identifierFromUrl}
          />
          {formik.touched.identifier && formik.errors.identifier && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.identifier}
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
              formik.touched.password && Boolean(formik.errors.password)
            }
            label="New Password"
            name="password"
            placeholder="Enter new password"
            startContent={<Key className="text-white" size={16} />}
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.password}
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
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm new password"
            startContent={<Key className="text-white" size={16} />}
            type="password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error.message}</p>}

        <Button
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          isDisabled={!formik.isValid || formik.isSubmitting}
          isLoading={loading || formik.isSubmitting}
          size="lg"
          type="submit"
        >
          Reset Password
        </Button>
      </form>

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

export default ResetPasswordPage;
