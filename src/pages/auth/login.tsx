import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "@/components/shared/theme-switch";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">SIGN IN</h2>
        <p className="text-white/70 text-sm">Sign in with email address</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email"
          placeholder="Yourname@gmail.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          startContent={
            <div className="text-white/60">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          }
          required
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          isLoading={isLoading}
          size="lg"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-white/60">
        <ThemeSwitch/>
          By registering you with our{" "}
          <Link href="#" className="text-white/80 hover:text-white underline">
            Terms and Conditions
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-white/70">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-purple-300 hover:text-purple-200 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
