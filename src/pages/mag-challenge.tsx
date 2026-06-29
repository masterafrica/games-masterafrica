import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Trophy,
  Monitor,
  Palette,
  Wrench,
  Users,
  Upload,
  UserCheck,
  CalendarDays,
  Share2,
  ArrowRight,
  Link as LinkIcon,
} from "lucide-react";
import { useSubmitSocialPost } from "@/lib/graphql";

const CATEGORIES = [
  {
    icon: Monitor,
    title: "Tech Skills",
    description: "Show off your tech knowledge and digital abilities.",
    color: "#9747FF",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    icon: Palette,
    title: "Creative Skills",
    description:
      "Show your creativity through design, writing, music, art, content and more.",
    color: "#F43F5E",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
  },
  {
    icon: Wrench,
    title: "Manual Skills",
    description:
      "Show your hands-on skills and how you build, fix or make things.",
    color: "#F59E0B",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    icon: Users,
    title: "Soft Skills",
    description:
      "Show your communication, leadership, teamwork, teaching and more people skills.",
    color: "#06B6D4",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
];

const STEPS = [
  {
    step: 1,
    icon: UserCheck,
    title: "Open your MAG account",
    description: "Sign up at games.masterafrica.com",
  },
  {
    step: 2,
    icon: Upload,
    title: "Submit your entry",
    description:
      "Record a 30–90 second video or take a photo showcasing your skill, then paste the link below.",
  },
];

const KEY_INFO = [
  { icon: CalendarDays, text: "New challenge every week" },
  { icon: Users, text: "Top 5 entries qualify for voting" },
  { icon: Trophy, text: "Winner determined by highest votes" },
  { icon: Share2, text: "Share. Get votes. Win!" },
];

const MagChallengePage = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  // const [submitting, setSubmitting] = useState(false);


    const { submitPost, loading: submitting,   error: _, } = useSubmitSocialPost();

  const handleSubmit = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title for your entry.");
      return;
    }
    if (!link.trim()) {
      toast.error("Please paste a link to your video or photo.");
      return;
    }

    // setSubmitting(true);
    try {
      // TODO: wire up to backend API



      await submitPost({
        url:link,
        title,
        description,
        category:selectedCategory

      })
      // await new Promise((r) => setTimeout(r, 1500));
      toast.success("Entry submitted! Good luck!");
      setSelectedCategory(null);
      setTitle("");
      setLink("");
      setDescription("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      // setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <button
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full">
              <Trophy className="w-4 h-4" />
              This Week&apos;s Challenge
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            MAG <span className="text-primary">Challenge</span>
          </h1>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Show Us What You&apos;ve Got!
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Share your talent, skill, project or passion in a{" "}
            <span className="text-primary font-semibold">30–90 second</span>{" "}
            video or photo.
          </p>
        </div>

        {/* Prize Banner */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-gradient-to-r from-primary to-violet-600 text-white overflow-hidden">
            <CardBody className="flex flex-row items-center justify-center gap-4 py-6 px-8">
              <Trophy className="w-10 h-10 text-amber-300 shrink-0" />
              <div className="text-center">
                <p className="text-sm opacity-80">Highest Votes Win</p>
                <p className="text-3xl font-bold tracking-tight">
                  &#8358;10,000{" "}
                  <span className="text-lg font-medium">CASH</span>
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-6">
          Choose Your Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.title;
            return (
              <button
                key={cat.title}
                className={`rounded-xl border-2 p-5 text-center transition-all hover:scale-[1.02] ${
                  isSelected
                    ? "ring-2 ring-offset-2 dark:ring-offset-gray-950"
                    : ""
                } ${cat.bg} ${cat.border}`}
                style={isSelected ? { borderColor: cat.color } : undefined}
                onClick={() =>
                  setSelectedCategory(isSelected ? null : cat.title)
                }
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: cat.color + "20" }}
                >
                  <Icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* How to Join + Key Info */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* How to Join */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              How to Join
            </h2>
            <div className="space-y-5">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {step.step}
                      </div>
                      {step.step < STEPS.length && (
                        <div className="w-0.5 flex-1 bg-primary/20 mt-1" />
                      )}
                    </div>
                    <div className="pb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Info + Prizes */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Prizes
              </h2>
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200 dark:border-amber-700/30">
                <CardBody className="flex flex-row items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Highest Votes Win
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      &#8358;10,000{" "}
                      <span className="text-sm font-medium">CASH!</span>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Key Info
              </h2>
              <Card className="dark:bg-gray-900 border dark:border-gray-800">
                <CardBody className="p-5 space-y-4">
                  {KEY_INFO.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {info.text}
                        </p>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Submit Your Entry
          </h2>

          <div className="space-y-5">
            <Input
              label="Title"
              placeholder="Give your entry a catchy title"
              value={title}
              onValueChange={setTitle}
              variant="bordered"
            />

            <Input
              label="Video Link"
              placeholder="Paste your TikTok, YouTube, Instagram link"
              value={link}
              onValueChange={setLink}
              variant="bordered"
              startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
            />

            <Input
              label="Description (Optional)"
              placeholder="Tell us about your skill or what you're showcasing"
              value={description}
              onValueChange={setDescription}
              variant="bordered"
            />

            <Button
              className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600 py-7 text-base"
              radius="full"
              size="lg"
              endContent={<ArrowRight className="w-5 h-5" />}
              startContent={<Upload className="w-5 h-5" />}
              isLoading={submitting}
              isDisabled={!selectedCategory || !link.trim() || !title.trim()}
              onPress={handleSubmit}
            >
              Submit Your Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagChallengePage;
