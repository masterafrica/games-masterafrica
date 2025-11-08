import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { AtSign, Phone, BarChart3, Key } from "lucide-react";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">SIGN UP</h2>
        <p className="text-white/70 text-sm">Sign up with email address</p>
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
          placeholder="your@.com"
          startContent={<AtSign className="text-white" size={16} />}
          type="email"
        />

        <Input
          required
          classNames={{
            input: "!text-white placeholder:text-white/80",
            inputWrapper:
              "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
            label: "text-white/70",
          }}
          label="Phone"
          placeholder="+234"
          startContent={<Phone className="text-white" size={16} />}
          type="tel"
        />

        <Input
          required
          classNames={{
            input: "!text-white placeholder:text-white/80",
            inputWrapper:
              "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
            label: "text-white/70",
          }}
          label="Skill"
          placeholder="Skill"
          startContent={<BarChart3 className="text-white" size={16} />}
          type="text"
        />

        <Input
          required
          classNames={{
            input: "!text-white placeholder:text-white/80",
            inputWrapper:
              "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
            label: "text-white/70",
          }}
          label="Password"
          placeholder="Password"
          startContent={<Key className="text-white" size={16} />}
          type="password"
        />

        <Input
          required
          classNames={{
            input: "!text-white placeholder:text-white/80",
            inputWrapper:
              "bg-purple-900 border-none focus-within:bg-purple-900 focus-within:border-none focus-within:ring-0 focus-within:ring-offset-0 data-[hover=true]:bg-purple-900",
            label: "text-white/70",
          }}
          label="Confirm Password"
          placeholder="Confirm Password"
          startContent={<Key className="text-white" size={16} />}
          type="password"
        />

        <Button
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          isLoading={isLoading}
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
