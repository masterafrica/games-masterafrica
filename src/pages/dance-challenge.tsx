import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Link as LinkIcon,
  Music,
  Trophy,
  Upload,
} from "lucide-react";

import { useSubmitSocialPost } from "@/lib/graphql";
import { BankDetails } from "@/components/modules/bank-details";
import { errMsg } from "@/components/dailychalanges/magshared";
import ShareModal from "@/components/dailychalanges/sharemodal";

const STEPS = [
  "Record your 30 - 60 sec dance video with any song of your choice (Solo or Group)",
  "Post it on your socials",
  "Submit the link on your MAG account",
  "Top 3 Voted will be Judged",
];

const PRIZES = [
  {
    place: "Winner",
    value: "₦10,000 + Bluetooth Speaker + MAG Champion Title",
  },
  { place: "1st Runner-up", value: "₦5,000" },
  { place: "2nd Runner-up", value: "₦3,000" },
];

const isValidUrl = (s: string) => {
  try {
    return ["http:", "https:"].includes(new URL(s.trim()).protocol);
  } catch {
    return false;
  }
};

const DanceChallengePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [share, setShare] = useState<{ id: string; title: string } | null>(
    null,
  );
  const { submitPost, loading: submitting } = useSubmitSocialPost();

  const valid = title.trim() && isValidUrl(link);

  const handleSubmit = async () => {
    try {
      const res = await submitPost({
        url: link.trim(),
        title: title.trim(),
        description: description.trim(),
        category: "MAG Dance Challenge",
      });
      const id = (res?.data as { SubmitSubmissions?: { id?: string } } | null)
        ?.SubmitSubmissions?.id;

      toast.success("Entry submitted! Good luck!");
      if (id) setShare({ id, title: title.trim() });
      setTitle("");
      setLink("");
      setDescription("");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

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
        <span className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <Music className="w-4 h-4" />
          New Challenge · 14 Days
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          💃 MAG <span className="text-primary">Dance Challenge</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Dance your way to the top! Win{" "}
          <span className="text-primary font-semibold">
            ₦10,000 + a Bluetooth Speaker
          </span>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        <img
          alt="MAG Dance Challenge poster"
          className="w-full rounded-2xl shadow-md"
          src="/images/challenge-02.jpg"
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">How to Participate</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
              <li>
                <b>Entry Fee Access</b>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Submission is free, but players must pay ₦500 or invite a
                  friend to participate to qualify for voting/judging to win the
                  ₦10,000 and Bluetooth speakers.
                </p>
                <BankDetails />
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Prizes</h2>
            <dl className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 space-y-2 text-sm">
              {PRIZES.map((p) => (
                <div key={p.place} className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">
                    {p.place}
                  </dt>
                  <dd className="font-semibold text-right">{p.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Submit Your Entry
        </h2>
        <div className="space-y-5">
          <Input
            label="Dance Title"
            placeholder="Give your dance a catchy title"
            value={title}
            variant="bordered"
            onValueChange={setTitle}
          />
          <Input
            errorMessage="Enter a valid link starting with https://"
            isInvalid={!!link.trim() && !isValidUrl(link)}
            label="Entry Link"
            placeholder="Paste your TikTok, Instagram, YouTube link"
            startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
            type="url"
            value={link}
            variant="bordered"
            onValueChange={setLink}
          />
          <Input
            label="Description (Optional)"
            placeholder="Song, crew name, anything about your dance"
            value={description}
            variant="bordered"
            onValueChange={setDescription}
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

      <ShareModal
        heading="Entry submitted! Now get votes"
        open={!!share}
        submissionId={share?.id ?? null}
        title={share?.title}
        onClose={() => setShare(null)}
      />
    </div>
  );
};

export default DanceChallengePage;
