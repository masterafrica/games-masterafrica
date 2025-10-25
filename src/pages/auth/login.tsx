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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email"
          placeholder="Yourname@gmail.com"
          startContent={<AtSign size={16} />}
          required
        />

        <Button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          isLoading={isLoading}
          size="lg"
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-white/60">
          By registering you with our{" "}
          <Link href="#" className="text-white/80 text-sm hover:text-white underline">
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
