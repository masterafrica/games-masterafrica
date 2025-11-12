import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { AtSign, User, Key, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useSignup } from "@/lib/graphql";
import { useAuth } from "@/lib/auth-context";
import { signupSchema } from "@/lib/schemas";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useSignup();
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      // phoneNumber: "",
      skill: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      // const normalizedPhone = normalizePhoneNumber(values.phoneNumber);

      try {
        const result = await signup({
          email: values.email,
          username: values.username,
          password: values.password,
        });

        if (result.data?.createUser?.user) {
          setUser(result.data.createUser.user);
          localStorage.setItem(
            "user",
            JSON.stringify(result.data.createUser.user),
          );
          navigate("/");
        }
      } catch {
        return;
      }
    },
  });

  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const cleanValue = value.replace(/\D/g, "");

  //   if (cleanValue.startsWith("0")) {
  //     if (cleanValue.length <= 11) {
  //       formik.setFieldValue("phoneNumber", cleanValue);
  //     }
  //   } else {
  //     if (cleanValue.length <= 10) {
  //       formik.setFieldValue("phoneNumber", cleanValue);
  //     }
  //   }
  // };

  // const normalizePhoneNumber = (phone: string) => {
  //   return phone.startsWith("0") ? phone.substring(1) : phone;
  // };

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">SIGN UP</h2>
        <p className="text-white/70 text-sm">Sign up with email address</p>
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
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            label="Email"
            name="email"
            placeholder="your@email.com"
            startContent={<AtSign className="text-white" size={16} />}
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
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
              formik.touched.username && Boolean(formik.errors.username)
            }
            label="Username"
            name="username"
            placeholder="username"
            startContent={<User className="text-white" size={16} />}
            type="text"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* <div>
          <Input
            classNames={{
              input: "!text-white placeholder:text-white/80",
              inputWrapper:
                "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
              label: "text-white/70",
            }}
            isInvalid={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            label="Phone Number"
            maxLength={formik.values.phoneNumber.startsWith("0") ? 11 : 10}
            name="phoneNumber"
            placeholder="8012345678"
            startContent={
              <span className="text-white text-sm font-medium">+234</span>
            }
            type="tel"
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={handlePhoneChange}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div> */}

        <div>
          <Input
            classNames={{
              input: "!text-white placeholder:text-white/80",
              inputWrapper:
                "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
              label: "text-white/70",
            }}
            isInvalid={formik.touched.skill && Boolean(formik.errors.skill)}
            label="Skill"
            name="skill"
            placeholder="Skill"
            startContent={<BarChart3 className="text-white" size={16} />}
            type="text"
            value={formik.values.skill}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.skill && formik.errors.skill && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.skill}</p>
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
            label="Password"
            name="password"
            placeholder="Password"
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
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
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
          Sign Up
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-white/60">
          By registering you with our{" "}
          <Link
            className="text-white/80 text-sm hover:text-white underline"
            href="#"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-white/70">
          Already have an account?{" "}
          <Link
            className="text-purple-300 hover:text-purple-200 font-semibold"
            href="/auth/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
