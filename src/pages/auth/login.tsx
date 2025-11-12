import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { AtSign, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useLogin } from "@/lib/graphql";
import { useAuth } from "@/lib/auth-context";
import { loginSchema } from "@/lib/schemas";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values);

        if (result.data?.loginUser?.user) {
          setUser(result.data.loginUser.user);
          localStorage.setItem(
            "user",
            JSON.stringify(result.data.loginUser.user),
          );
          navigate("/");
        }
      } catch {
        return;
      }
    },
  });

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">SIGN IN</h2>
        <p className="text-white/70 text-sm">Sign in with email address</p>
      </div>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
              formik.touched.identifier && Boolean(formik.errors.identifier)
            }
            label="Email"
            name="identifier"
            placeholder="Yourname@gmail.com"
            startContent={<AtSign className="text-white" size={16} />}
            type="text"
            value={formik.values.identifier}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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

        {error && <p className="text-red-400 text-sm">{error.message}</p>}

        <Button
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          isDisabled={!formik.isValid || formik.isSubmitting}
          isLoading={loading || formik.isSubmitting}
          size="lg"
          type="submit"
        >
          Sign in
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
          Don&rsquo;t have an account?{" "}
          <Link
            className="text-purple-300 hover:text-purple-200 font-semibold"
            href="/auth/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
