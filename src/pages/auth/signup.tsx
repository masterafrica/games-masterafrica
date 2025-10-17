import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title, subtitle } from "../../components/shared/primitives";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle signup logic here
    setTimeout(() => setIsLoading(false), 1000); // Simulated loading
  };

  return (
    <div className="w-full flex">
      {/* Left Side - Branding */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-16">
        {/* Logo and Game Character */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative">
            <img 
              src="/images/logo.svg" 
              alt="Game Character" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-lg">
          <div className="mb-2">
            <p className="text-white/80 text-sm font-medium">Master Africa Games</p>
          </div>
          
          <h1 className={title({ 
            size: "lg", 
            color: "foreground",
            class: "mb-6 !text-white font-bold"
          })}>
            PLAY, WIN & MASTER<br />
            YOUR FUTURE
          </h1>
          
          <p className={subtitle({ 
            class: "!text-white/70 !text-base max-w-md"
          })}>
            The ultimate playground where talents come alive.
          </p>
        </div>

        <div className="mt-8">
          {/* Additional branding or footer content can go here */}
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Glass morphism container */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">SIGN UP</h2>
              <p className="text-white/70 text-sm">Create your gaming account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange("name")}
                startContent={
                  <div className="text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                }
                classNames={{
                  base: "w-full",
                  mainWrapper: "h-full",
                  input: [
                    "bg-transparent",
                    "text-white",
                    "placeholder:text-white/50",
                  ],
                  inputWrapper: [
                    "bg-white/5",
                    "backdrop-blur-md",
                    "border",
                    "border-white/20",
                    "hover:border-white/40",
                    "focus-within:!border-purple-400",
                    "!cursor-text",
                    "rounded-lg",
                  ],
                  label: "text-white/80 text-sm",
                }}
                required
              />

              <Input
                type="email"
                label="Email"
                placeholder="Yourname@gmail.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                startContent={
                  <div className="text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                }
                classNames={{
                  base: "w-full",
                  mainWrapper: "h-full",
                  input: [
                    "bg-transparent",
                    "text-white",
                    "placeholder:text-white/50",
                  ],
                  inputWrapper: [
                    "bg-white/5",
                    "backdrop-blur-md",
                    "border",
                    "border-white/20",
                    "hover:border-white/40",
                    "focus-within:!border-purple-400",
                    "!cursor-text",
                    "rounded-lg",
                  ],
                  label: "text-white/80 text-sm",
                }}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange("password")}
                startContent={
                  <div className="text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                }
                classNames={{
                  base: "w-full",
                  mainWrapper: "h-full",
                  input: [
                    "bg-transparent",
                    "text-white",
                    "placeholder:text-white/50",
                  ],
                  inputWrapper: [
                    "bg-white/5",
                    "backdrop-blur-md",
                    "border",
                    "border-white/20",
                    "hover:border-white/40",
                    "focus-within:!border-purple-400",
                    "!cursor-text",
                    "rounded-lg",
                  ],
                  label: "text-white/80 text-sm",
                }}
                required
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                isLoading={isLoading}
                size="lg"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-white/60">
                By registering you agree to our{" "}
                <Link href="#" className="text-white/80 hover:text-white underline">
                  Terms and Conditions
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/70">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-purple-300 hover:text-purple-200 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;