import { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Link as LinkIcon,
  Trophy,
  Upload,
  UserCheck,
  Wallet,
} from "lucide-react";

import { useSubmitSocialPost } from "@/lib/graphql";
import { BankDetails } from "@/components/modules/bank-details";

const MAX_WORDS = 50;

const SUBMIT = [
  "ONE photograph — the picture must tell an African story without needing a long explanation.",
  "Title of the photograph — short and memorable.",
  `Story/Caption — maximum ${MAX_WORDS} words explaining the story behind the image.`,
];

const FORMAT = [
  { label: "Photo", value: "JPG or PNG" },
  { label: "Orientation", value: "Any — portrait, landscape, or square" },
  { label: "Quality", value: "Original/high-resolution photo preferred" },
  {
    label: "Editing",
    value: "Basic editing allowed, but no AI-generated images",
  },
];

const STEPS = [
  {
    icon: UserCheck,
    title: "Open your MAG account",
    description: "Sign up at games.masterafrica.com",
  },
  {
    icon: Upload,
    title: "Submit your entry",
    description:
      "Take a photo showcasing your African Story, then paste the link below with the picture description/story.",
  },
  {
    icon: Wallet,
    title: "Entry Fee Access",
    description:
      "Submission is free, but players must pay ₦500 to qualify for voting/judging to win the FREE Power Bank and ₦10,000 prize.",
    bank: true,
  },
];

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const isValidUrl = (s: string) => {
  try {
    return ["http:", "https:"].includes(new URL(s.trim()).protocol);
  } catch {
    return false;
  }
};

const PhotoChallengePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [story, setStory] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const { submitPost, loading: submitting } = useSubmitSocialPost();

  const words = wordCount(story);
  const valid =
    title.trim() && isValidUrl(link) && story.trim() && words <= MAX_WORDS;

  const handleSubmit = async () => {
    try {
      await submitPost({
        url: link.trim(),
        title,
        description: story.trim(),
        category: "African Story Photography",
      });
      setSubmitted(title.trim());
      window.scrollTo(0, 0);
      setTitle("");
      setLink("");
      setStory("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Entry Submitted!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            &ldquo;{submitted}&rdquo; is in the African Story Photography
            Challenge. Good luck!
          </p>

          <div className="text-left rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-8">
            <p className="text-sm font-semibold mb-1">
              Don&apos;t forget your ₦500 entry fee
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pay to qualify for voting/judging and a chance to win the FREE
              Power Bank and ₦10,000 prize.
            </p>
            <BankDetails />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600"
              radius="full"
              size="lg"
              onPress={() => navigate("/challenges")}
            >
              Back to Challenges
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-12">
      <button
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <Camera className="w-4 h-4" />
          New Challenge
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          📸 MAG African Story{" "}
          <span className="text-primary">Photography Challenge</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Most inspiring picture wins{" "}
          <span className="text-primary font-semibold">
            ₦10,000 + a Power Bank
          </span>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        <img
          alt="MAG Photography Challenge poster"
          className="w-full rounded-2xl shadow-md"
          src="/images/challenge-01.jpg"
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">Submit</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {SUBMIT.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Best submission format</h2>
            <dl className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 space-y-2 text-sm">
              {FORMAT.map((f) => (
                <div key={f.label} className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">
                    {f.label}
                  </dt>
                  <dd className="font-semibold text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm space-y-2">
            <h2 className="text-lg font-bold">Example</h2>
            <p>
              <b>Photo Title:</b> The Road to Tomorrow
            </p>
            <p>
              <b>Photo:</b> An African child walking to school on a rural road.
            </p>
            <p>
              <b>Story:</b> Every morning, thousands of African children walk
              long distances to pursue an education. This picture represents the
              journey, sacrifice and hope behind their dreams.
            </p>
          </section>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <h2 className="text-xl font-bold mb-6">How to Join</h2>
        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                  {step.bank && <BankDetails />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Submit Your Entry
        </h2>
        <div className="space-y-5">
          <Input
            label="Photo Title"
            placeholder="Short and memorable"
            value={title}
            variant="bordered"
            onValueChange={setTitle}
          />
          <Input
            errorMessage="Enter a valid link starting with https://"
            isInvalid={!!link.trim() && !isValidUrl(link)}
            label="Photo Link"
            placeholder="Paste a link to your photo (Google Drive, Instagram, etc.)"
            startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
            type="url"
            value={link}
            variant="bordered"
            onValueChange={setLink}
          />
          <Textarea
            description={`${words}/${MAX_WORDS} words`}
            errorMessage={`Keep your story to ${MAX_WORDS} words or less`}
            isInvalid={words > MAX_WORDS}
            label="Story / Caption"
            placeholder="The story behind your image"
            value={story}
            variant="bordered"
            onValueChange={setStory}
          />
          <Button
            className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600 py-7 text-base"
            endContent={<ArrowRight className="w-5 h-5" />}
            isDisabled={!valid}
            isLoading={submitting}
            radius="full"
            size="lg"
            startContent={<Upload className="w-5 h-5" />}
            onPress={handleSubmit}
          >
            Submit Your Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoChallengePage;
