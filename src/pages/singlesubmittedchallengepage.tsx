// PUBLIC single-submission page (the shareable link).  Route: /mag-challenge/submission/:id
// Put this route OUTSIDE <ProtectedRoute>/<MainLayout> so anyone with the link can see it.
// Viewing = no login. Voting = login required (guests are sent to login, then back here).
import { useCallback, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ExternalLink, Heart, Share2, Trophy } from "lucide-react";
import {
  useGetPublicSubmission,
  useGetSubmissionVoteStatus,
  useToggleVote,
  type PublicSubmission,
  type SubmissionVoteStatus,
} from "@/lib/graphql";
import { Avatar, CategoryBadge, Spinner, StatusPill, errMsg } from "@/components/dailychalanges/magshared";
// import ShareModal from "@/components/dailychalanges/sharemodal";
import { getreadabledate } from "@/utils";
import ShareModal from "@/components/dailychalanges/sharemodal";

const MagSubmissionPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [getPublic] = useGetPublicSubmission();
  const [getStatus] = useGetSubmissionVoteStatus();
  const { toggleVote, loading: voting } = useToggleVote();

  const loggedIn = !!Cookies.get("accessToken");

  const [entry, setEntry] = useState<PublicSubmission | null>(null);
  const [status, setStatus] = useState<SubmissionVoteStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareOpen, setShareOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPublic({ variables: { input: { submissionId: id } } });
      if (res.data?.GetPublicSubmission) setEntry(res.data.GetPublicSubmission);
      else setError("We couldn't find this entry. The link may be wrong or the entry was removed.");
    } catch {
      setError("We couldn't load this entry.");
    } finally {
      setLoading(false);
    }

    // only logged-in visitors get "did I vote / can I vote"
    if (loggedIn) {
      try {
        const r = await getStatus({ variables: { input: { submissionId: id } } });
        setStatus(r.data?.GetSubmissionVoteStatus ?? null);
      } catch {
        /* guest-style page still works */
      }
    }
  }, [getPublic, getStatus, id, loggedIn]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goLogin = () => {
    const back = location.pathname;
    sessionStorage.setItem("postLoginRedirect", back); // fallback if the login flow drops the query string
    toast("Log in to vote for this entry");
    navigate(`/auth/login?redirect=${encodeURIComponent(back)}`);
  };

  const handleVote = async () => {
    if (!loggedIn) return goLogin();
    try {
      const res = await toggleVote({ submissionId: id });
      const t = res.data?.ToggleVote;
      if (t && entry) {
        setEntry({ ...entry, voteCount: t.voteCount });
        setStatus((s) => (s ? { ...s, hasVoted: t.voted } : s));
        toast.success(t.voted ? "Vote cast!" : "Vote removed");
      }
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const isOwner = !!status?.isOwner;
  const hasVoted = !!status?.hasVoted;
  const blocked = entry ? !entry.votingOpen || (status ? !status.canVote : false) : true;
  const reason = !entry?.votingOpen
    ? "This entry isn't open for voting yet"
    : status && !status.canVote && !isOwner
      ? status.voteBlockedReason
      : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* slim public header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-xl px-4 h-14 flex items-center justify-between">
          <Link to="/mag-challenge" className="font-bold text-gray-900 dark:text-white">
            MAG <span className="text-primary">Challenge</span>
          </Link>
          {!loggedIn && (
            <Link to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`} className="text-sm font-semibold text-primary">
              Log in
            </Link>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-xl">
        {loading && <Spinner />}

        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">{error}</p>
            <Button color="primary" radius="full" onPress={() => navigate("/mag-challenge")}>
              Go to the challenge
            </Button>
          </div>
        )}

        {!loading && entry && (
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Avatar name={entry.ownerName} size={46} />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">{entry.ownerName}</p>
                  <p className="text-xs text-gray-400">Posted {getreadabledate(entry.createdAt)}</p>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">{entry.title}</h1>
                {entry.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{entry.description}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={entry.category ?? undefined} />
                <StatusPill qualified={entry.qualified} />
              </div>

              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary font-semibold py-4 hover:bg-primary/15 transition-colors"
                >
                  Watch entry <ExternalLink size={16} />
                </a>
              )}

              {/* votes + actions */}
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
                  <b className="text-xl">{entry.voteCount}</b>
                  <span className="text-sm text-gray-500">vote{entry.voteCount !== 1 && "s"}</span>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="flat"
                    radius="full"
                    startContent={<Share2 className="w-4 h-4" />}
                    onPress={() => setShareOpen(true)}
                  >
                    Share
                  </Button>

                  {!isOwner && (
                    <Button
                      color="primary"
                      radius="full"
                      variant={hasVoted ? "flat" : "solid"}
                      isLoading={voting}
                      isDisabled={blocked}
                      startContent={<Heart className="w-4 h-4" fill={hasVoted ? "currentColor" : "none"} />}
                      onPress={handleVote}
                    >
                      {hasVoted ? "Voted" : "Vote"}
                    </Button>
                  )}
                </div>
              </div>

              {!loggedIn && entry.votingOpen && (
                <p className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  You&apos;ll be asked to log in (or sign up) before your vote is counted.
                </p>
              )}
              {reason && (
                <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-500/10 rounded-lg px-3 py-2">
                  {reason}
                </p>
              )}
              {isOwner && (
                <p className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  This is your entry. Share the link to collect votes!
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("/user/mag-challenge/leaderboard")}
              className="w-full flex items-center justify-center gap-2 border-t border-gray-100 dark:border-gray-800 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
            >
              <Trophy size={15} /> View leaderboard
            </button>
          </div>
        )}
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} submissionId={id} title={entry?.title ?? undefined} />
    </div>
  );
};

export default MagSubmissionPage;