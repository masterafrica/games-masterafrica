// USER — generic challenge page (poster + how to participate + entry form).
// Route: /mag-challenge/:slug   e.g. /mag-challenge/photo-challenge
// Put it OUTSIDE <ProtectedRoute>/<MainLayout> so the link can be opened without logging in;
// logging in is only needed to submit (guests are sent to login and back).
import { useCallback, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  CheckCircle2,
  Link as LinkIcon,
  Share2,
  Trophy,
  Upload,
  Vote,
} from "lucide-react";
import {
  useGetChallengeBySlug,
  useGetMyChallengeStatus,
  useSubmitChallengeEntry,
  type Challenge,
  type ChallengeStatus,
} from "@/lib/graphql";
import { ChallengeStateBadge, Spinner, StatusPill, endsLabel, errMsg, votingText } from "@/components/dailychalanges/magshared";
import ShareModal from "@/components/dailychalanges/sharemodal";
import { BankDetails } from "@/components/modules/bank-details";

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const isValidUrl = (s: string) => {
  try {
    return ["http:", "https:"].includes(new URL(s.trim()).protocol);
  } catch {
    return false;
  }
};

const ChallengePage = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = !!Cookies.get("accessToken");

  const [getChallenge] = useGetChallengeBySlug();
  const [getStatus] = useGetMyChallengeStatus();
  const { submitEntry, loading: submitting } = useSubmitChallengeEntry();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [status, setStatus] = useState<ChallengeStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [share, setShare] = useState<{ id: string; title?: string; fresh?: boolean } | null>(null);

  const refreshStatus = useCallback(async () => {
    if (!loggedIn) return;
    try {
      const r = await getStatus({ variables: { input: { slug } } });
      setStatus(r.data?.GetMyChallengeStatus ?? null);
    } catch {
      /* page still works without it */
    }
  }, [getStatus, loggedIn, slug]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const r = await getChallenge({ variables: { input: { slug } } });
        if (r.data?.GetChallengeBySlug) setChallenge(r.data.GetChallengeBySlug);
        else setNotFound(true);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
      refreshStatus();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const goLogin = () => {
    const back = location.pathname;
    sessionStorage.setItem("postLoginRedirect", back);
    toast("Log in to submit your entry");
    navigate(`/auth/login?redirect=${encodeURIComponent(back)}`);
  };

  const words = wordCount(description);
  const max = challenge?.maxDescriptionWords ?? 0;
  const valid =
    !!title.trim() &&
    isValidUrl(link) &&
    (!challenge?.descriptionRequired || !!description.trim()) &&
    (!max || words <= max);

  const handleSubmit = async () => {
    if (!challenge) return;
    if (!loggedIn) return goLogin();
    try {
      const res = await submitEntry({
        challengeId: challenge.id,
        title: title.trim(),
        url: link.trim(),
        description: description.trim() || undefined,
      });
      const id = res.data?.SubmitChallengeEntry?.id;
      toast.success("Entry submitted! Good luck!");
      if (id) setShare({ id, title: title.trim(), fresh: true });
      setTitle("");
      setLink("");
      setDescription("");
      refreshStatus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const locked = !!challenge && (!challenge.isOpen || (status ? !status.canSubmit : false));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* slim public header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <Link to="/mag-challenge" className="font-bold text-gray-900 dark:text-white">
            MAG <span className="text-primary">Challenge</span>
          </Link>
          {loggedIn ? (
            <Link to="/user/mag-challenge/my-submissions" className="text-sm font-semibold text-primary">
              My submissions
            </Link>
          ) : (
            <Link
              to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`}
              className="text-sm font-semibold text-primary"
            >
              Log in
            </Link>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pb-16">
        {loading && <Spinner />}

        {!loading && notFound && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">We couldn&apos;t find this challenge.</p>
            <Button color="primary" radius="full" onPress={() => navigate("/mag-challenge")}>
              See all challenges
            </Button>
          </div>
        )}

        {!loading && challenge && (
          <>
            {/* title */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ChallengeStateBadge open={challenge.isOpen} />
                <span className="text-xs text-gray-500">{endsLabel(challenge.endsAt, challenge.isOpen)}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">{challenge.title}</h1>
              {challenge.tagline && <p className="text-gray-600 dark:text-gray-400">{challenge.tagline}</p>}
              {challenge.prize && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold px-4 py-1.5 text-sm">
                  <Trophy className="w-4 h-4" /> {challenge.prize}
                </p>
              )}
              <p className="mt-3 text-xs text-gray-500">{votingText(challenge)}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <Button
                  variant="flat"
                  color="primary"
                  radius="full"
                  startContent={<Vote className="w-4 h-4" />}
                  onPress={() => navigate(`/mag-challenge/${challenge.slug}/vote`)}
                >
                  Vote
                </Button>
                <Button
                  variant="flat"
                  color="primary"
                  radius="full"
                  startContent={<Trophy className="w-4 h-4" />}
                  onPress={() => navigate(`/mag-challenge/${challenge.slug}/leaderboard`)}
                >
                  Leaderboard
                </Button>
              </div>
            </div>

            {/* poster + how to participate */}
            <div
              className={`grid grid-cols-1 ${challenge.image ? "md:grid-cols-2" : ""} gap-8 max-w-5xl mx-auto mb-12`}
            >
              {challenge.image && (
                <img alt={`${challenge.title} poster`} className="w-full rounded-2xl shadow-md" src={challenge.image} />
              )}

              <div className="space-y-6">
                {challenge.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{challenge.description}</p>
                )}

                {challenge.steps.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold mb-3">How to Participate</h2>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {challenge.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </section>
                )}

                {challenge.showBankDetails && (
                  <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                    <h3 className="text-sm font-semibold mb-1">Entry Fee Access</h3>
                    {challenge.entryFeeNote && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{challenge.entryFeeNote}</p>
                    )}
                    <BankDetails />
                  </section>
                )}
              </div>
            </div>

            {/* submit */}
            <div className="max-w-2xl mx-auto">
              {/* ended */}
              {!challenge.isOpen && (
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">This challenge has ended</p>
                  <p className="text-sm text-gray-500 mb-4">Entries and voting are closed. See how everyone did.</p>
                  <Button
                    color="primary"
                    radius="full"
                    startContent={<Trophy className="w-4 h-4" />}
                    onPress={() => navigate(`/mag-challenge/${challenge.slug}/leaderboard`)}
                  >
                    View leaderboard
                  </Button>
                </div>
              )}

              {/* already entered */}
              {challenge.isOpen && status?.hasSubmitted && !status.canSubmit && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">You&apos;re in!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{status.entry?.title}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>
                          <b className="text-gray-900 dark:text-white">{status.votesCount}</b> vote
                          {status.votesCount !== 1 && "s"}
                        </span>
                        {status.qualificationEnabled && <StatusPill qualified={!!status.entry?.qualified} />}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {status.entry?.id && (
                      <Button
                        color="primary"
                        radius="full"
                        startContent={<Share2 className="w-4 h-4" />}
                        onPress={() => setShare({ id: status.entry!.id, title: status.entry!.title })}
                      >
                        Share your entry
                      </Button>
                    )}
                    <Button
                      variant="flat"
                      radius="full"
                      onPress={() => navigate(`/mag-challenge/${challenge.slug}/leaderboard`)}
                    >
                      Leaderboard
                    </Button>
                  </div>
                </div>
              )}

              {/* form */}
              {challenge.isOpen && !locked && (
                <>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Submit Your Entry
                  </h2>
                  <div className="space-y-5">
                    <Input
                      label={challenge.titleLabel}
                      value={title}
                      variant="bordered"
                      onValueChange={setTitle}
                    />
                    <Input
                      errorMessage="Enter a valid link starting with https://"
                      isInvalid={!!link.trim() && !isValidUrl(link)}
                      label={challenge.linkLabel}
                      placeholder="Paste your link (TikTok, Instagram, YouTube, Google Drive...)"
                      startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
                      type="url"
                      value={link}
                      variant="bordered"
                      onValueChange={setLink}
                    />
                    <Textarea
                      description={max ? `${words}/${max} words` : undefined}
                      errorMessage={`Keep it to ${max} words or less`}
                      isInvalid={!!max && words > max}
                      label={challenge.descriptionLabel}
                      value={description}
                      variant="bordered"
                      onValueChange={setDescription}
                    />
                    <Button
                      className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600 py-7 text-base"
                      endContent={<ArrowRight className="w-5 h-5" />}
                      isDisabled={loggedIn && !valid}
                      isLoading={submitting}
                      radius="full"
                      size="lg"
                      startContent={<Upload className="w-5 h-5" />}
                      onPress={handleSubmit}
                    >
                      {loggedIn ? "Submit Your Entry" : "Log in to submit"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <ShareModal
        open={!!share}
        onClose={() => setShare(null)}
        submissionId={share?.id ?? null}
        title={share?.title}
        heading={share?.fresh ? "Entry submitted! Now get votes" : undefined}
      />
    </div>
  );
};

export default ChallengePage;