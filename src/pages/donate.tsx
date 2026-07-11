import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Play,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

import { GiveModal } from "@/components/modules/donate/give-modal";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Service", href: "#service" },
  { label: "Contact", href: "#contact" },
  { label: "Impact", href: "#impact" },
];

const IMPACT_CARDS = [
  {
    title: "A friday tradition",
    body: "What started as a game became a movement players return every week, bringing friends and building something bigger than themselves",
    badge: "Community",
    badgeClass: "bg-teal-600",
    dark: false,
  },
  {
    title: "Skills you can sell",
    body: "Top players don't win prizes they walk apprenticeship, tools and job opportunities they act on immediately",
    badge: "Outcomes",
    badgeClass: "bg-rose-500",
    dark: true,
  },
  {
    title: "Zero cost",
    body: "What started as a game became a movement players return every week, bringing friends and building something bigger than themselves",
    badge: "Always Free",
    badgeClass: "bg-orange-500",
    dark: true,
  },
  {
    title: "Rooted in nigeria",
    body: "What started as a game became a movement With growing community of youth, trainers and employers spreading across the continent",
    badge: "Africa",
    badgeClass: "bg-indigo-950",
    dark: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Funke Olabanjo",
    role: "Lead Trainer · Lagos",
    tag: "Real Change",
    img: "/images/donate/5.jpg",
  },
  {
    name: "Chukwuemeka Obi",
    role: "Player · Enugu",
    tag: "Leadership",
    img: "/images/donate/6.jpg",
  },
  {
    name: "Adenike Olabisi",
    role: "Mentor · Ibadan",
    tag: "Growth",
    img: "/images/donate/7.jpg",
  },
  {
    name: "Taiwo Adeyemi",
    role: "Developer · Abuja",
    tag: "Opportunity",
    img: "/images/donate/8.jpg",
  },
  {
    name: "Kwabena Poku",
    role: "Coach · Accra",
    tag: "Community",
    img: "/images/donate/1.jpg",
  },
];

const DonatePage = () => {
  const [open, setOpen] = useState(false);
  const openGive = () => setOpen(true);

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 overflow-x-hidden">
      <GiveModal isOpen={open} onClose={() => setOpen(false)} />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[720px] flex flex-col" id="home">
        <div className="absolute inset-0">
          <img
            alt="Community"
            className="w-full h-full object-cover object-top grayscale"
            src="/images/donate/9.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90" />
        </div>

        {/* Header */}
        <header className="relative z-20 flex items-center justify-between px-6 lg:px-16 py-6">
          <Link className="flex items-center gap-2" href="/">
            <img
              alt="Master Africa"
              className="w-35 object-contain"
              src="/images/master-logo.png"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.label}
                className={`text-sm font-medium transition-colors ${
                  i === 0 ? "text-violet-400" : "text-white/80 hover:text-white"
                }`}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            as={Link}
            className="border border-white/40 text-white font-medium"
            href="/auth/signup"
            radius="full"
            variant="bordered"
          >
            Sign Up
          </Button>
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pb-16">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Play a Part,
            <br />
            Build a future
          </h1>
          <p className="mt-6 max-w-xl text-white/80 text-sm sm:text-base leading-relaxed">
            Your support doesn&apos;t just change one life it ripples through a
            community hungry to grow, compete.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button
              className="bg-violet-500 text-white font-semibold px-10 py-6"
              radius="full"
              size="lg"
              onPress={openGive}
            >
              Donate
            </Button>
            <Button
              className="bg-transparent text-white font-medium px-7 py-6 border border-violet-500"
              radius="full"
              size="lg"
              startContent={
                <span className="w-8 h-8 rounded-full border border-violet-500 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                </span>
              }
              as="a"
              href="https://www.tiktok.com/@magafroiq"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stories
            </Button>
          </div>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section className="py-24 px-6 lg:px-16 max-w-6xl mx-auto" id="impact">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-gray-400 font-medium mb-3">Our impact</p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-gray-900">
            The different we make together
          </h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
            At Master Africa, gaming is more than entertainment it&apos;s a
            platform for connection, creativity, and digital empowerment across
            Africa
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-7">
          {IMPACT_CARDS.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl p-9 border ${
                card.dark
                  ? "bg-[#3a3a3a] border-[#3a3a3a] text-white"
                  : "bg-white border-violet-300 text-gray-900"
              }`}
            >
              <h3 className="font-display text-2xl font-medium mb-4">
                {card.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-7 ${
                  card.dark ? "text-white/70" : "text-gray-500"
                }`}
              >
                {card.body}
              </p>
              <span
                className={`inline-block text-xs font-semibold text-white rounded-full px-5 py-2.5 ${card.badgeClass}`}
              >
                {card.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DIGITAL FUTURE ===== */}
      <section className="py-20 px-6 lg:px-16 max-w-6xl mx-auto" id="service">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm text-gray-400 font-medium mb-3">Building</p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-gray-900 leading-tight">
              Building Africa&apos;s
              <br />
              Digital Future
            </h2>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-md">
              At Master Africa, gaming is more than entertainment — it&apos;s a
              platform for connection, creativity, and digital empowerment
              across Africa. Mobile-first browser games remove barriers so young
              Africans can learn, compete, and grow.
            </p>
          </div>

          <img
            alt="Building Africa's Digital Future"
            className="w-full rounded-2xl object-cover"
            src="/images/donate/2.jpg"
          />
        </div>
      </section>

      {/* ===== REAL PEOPLE ===== */}
      <section className="py-20 px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="text-right ml-auto max-w-md">
          <p className="text-sm text-gray-400 font-medium mb-2">Stories</p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-gray-900">
            Real People, Real Change
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            This aren&apos;t just testimonial this are proof of works done
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {TESTIMONIALS.map((person) => (
            <div
              key={person.name}
              className="relative rounded-2xl overflow-hidden bg-neutral-800"
            >
              <img
                alt={person.name}
                className="aspect-[2/3] w-full object-cover"
                src={person.img}
              />
              <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-violet-500 rounded-full px-3 py-1">
                {person.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FUND A FUTURE ===== */}
      <section className="py-20 px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-gray-900">
            Fund A Future Today
          </h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
            Your gift funds prizes, tool and apprenticeship for young africans
            showing up every friday to level up their lives
          </p>
        </div>

        <img
          alt="Fund A Future Today"
          className="mt-14 w-full rounded-2xl object-cover"
          src="/images/donate/3.jpg"
        />

        <div className="mt-12 flex justify-center">
          <Button
            className="bg-violet-500 text-white font-semibold px-12 py-6"
            radius="full"
            size="lg"
            onPress={openGive}
          >
            Donate
          </Button>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        className="py-24 px-6 lg:px-16 max-w-6xl mx-auto scroll-mt-10"
        id="contact"
      >
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-gray-900">
            Contact Us
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Get in touch with us to support, partner, volunteer, or learn more
            about our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <img
            alt="Get in touch"
            className="min-h-[360px] h-full w-full object-cover rounded-2xl"
            src="/images/donate/4.jpg"
          />

          <ContactForm />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent — we'll be in touch soon");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium text-gray-600">Name</label>
        <div className="mt-1.5 grid grid-cols-2 gap-3">
          <input className={inputClass} placeholder="First Name *" required />
          <input className={inputClass} placeholder="Last Name *" required />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          className={`mt-1.5 ${inputClass}`}
          placeholder="Email *"
          required
          type="email"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">
          Phone ( Optional )
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-500">
            🇳🇬
          </span>
          <input
            className={inputClass}
            placeholder="+234-814-866-4784"
            type="tel"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Message</label>
        <textarea
          className={`mt-1.5 ${inputClass} resize-none`}
          placeholder="Enter Message Here  *"
          required
          rows={4}
        />
      </div>

      <Button
        className="w-full bg-violet-500 text-white font-semibold py-6"
        radius="full"
        size="lg"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

const Footer = () => (
  <footer>
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2" />
      <img
        alt=""
        className="w-full block relative z-10"
        src="/images/wave.png"
      />
    </div>
    <div className="bg-[#FCEBD0] pb-8 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              alt="Master Africa"
              className="w-35 object-contain"
              src="/images/master-logo.png"
            />
          </div>
          <p className="text-sm text-gray-600">masterafrica@gmail.com</p>
          <p className="text-sm text-gray-600 mt-1">+458 843 5849</p>
          <div className="flex items-center gap-3 mt-4 text-violet-600">
            <Instagram className="w-5 h-5" />
            <Linkedin className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
            <Twitter className="w-5 h-5" />
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About</li>
            <li>Our Impact</li>
            <li>Stories</li>
          </ul>
        </div>

        {/* Contact + newsletter */}
        <div>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-violet-600" />
              masterafrica@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-violet-600" />
              Number 1 Alar street, Yaba, Lagos
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-violet-600" />
              +234 810 5137 361
            </p>
          </div>

          <h4 className="font-semibold text-gray-900 mt-6 mb-3">News Latter</h4>
          <div className="flex items-center bg-white rounded-full pl-4 pr-1.5 py-1.5 max-w-xs">
            <input
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              placeholder="Your Mail"
            />
            <button
              aria-label="Subscribe"
              className="w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center text-white shrink-0"
              type="button"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-700 mt-12">
        © 2026 Master Africa · All rights reserved
      </p>
    </div>
  </footer>
);

export default DonatePage;
