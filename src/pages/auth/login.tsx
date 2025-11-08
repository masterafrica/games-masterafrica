import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { AtSign } from "lucide-react";

const LoginPage = () => {
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          required
          classNames={{
            input: "!text-white placeholder:text-white/80",
            inputWrapper:
              "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
            label: "text-white/70",
          }}
          label="Email"
          placeholder="Yourname@gmail.com"
          startContent={<AtSign className="text-white" size={16} />}
          type="email"
        />

        <Button
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          isLoading={isLoading}
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
