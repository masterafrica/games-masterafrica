// CLUB — public page of a club.  Route: /club/:slug   (put it OUTSIDE ProtectedRoute: anyone can open the link)
// Shows little details + a Join button. Guests are sent to login and come back here.
import { useCallback, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2, Share2, Users } from "lucide-react";
import {
  useGetClubViewerStatus,
  useGetPublicClub,
  useJoinClub,
  type ClubViewerStatus,
  type PublicClub,
} from "@/lib/graphql";
import { Avatar, Spinner, errMsg } from "@/components/dailychalanges/magshared";
import ShareModal, { getClubUrl } from "@/components/dailychalanges/sharemodal";

const ClubPage = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = !!Cookies.get("accessToken");

  const [getClub] = useGetPublicClub();
  const [getStatus] = useGetClubViewerStatus();
  const { joinClub, loading: joining } = useJoinClub();

  const [club, setClub] = useState<PublicClub | null>(null);
  const [status, setStatus] = useState<ClubViewerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await getClub({ variables: { input: { slug } } });
      if (r.data?.GetClubBySlug) setClub(r.data.GetClubBySlug);
      else setNotFound(true);
    } catch {
      setNotFound(true);
    }
    if (loggedIn) {
      try {
        const s = await getStatus({ variables: { input: { slug } } });
        setStatus(s.data?.GetClubViewerStatus ?? null);
      } catch {
        /* guest-style page still works */
      }
    }
  }, [getClub, getStatus, loggedIn, slug]);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    load().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const goLogin = () => {
    sessionStorage.setItem("postLoginRedirect", location.pathname);
    toast("Log in to join this club");
    navigate(`/auth/login?redirect=${encodeURIComponent(location.pathname)}`);
  };

  const handleJoin = async () => {
    if (!club) return;
    if (!loggedIn) return goLogin();
    try {
      await joinClub({ clubId: club.id });
      toast.success(`Welcome to ${club.name}!`);
      load();
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  const isIn = !!status?.role;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-gray-900 dark:text-white">
            MAG <span className="text-primary">Clubs</span>
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

        {!loading && notFound && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">We couldn&apos;t find this club. The link may be wrong.</p>
            <Button color="primary" radius="full" onPress={() => navigate("/")}>
              Go home
            </Button>
          </div>
        )}

        {!loading && club && (
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-violet-600 px-6 py-8 text-white">
              <p className="text-xs uppercase tracking-wide opacity-80 mb-1">MAG Club</p>
              <h1 className="text-3xl font-bold leading-tight">{club.name}</h1>
              <p className="mt-3 inline-flex items-center gap-2 text-sm opacity-90">
                <Users className="w-4 h-4" /> {club.memberCount} member{club.memberCount !== 1 && "s"}
              </p>
            </div>

            <div className="p-6 space-y-5">
              {club.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{club.description}</p>
              )}

              <div className="flex items-center gap-3">
                <Avatar name={club.ownerName} size={40} src={club.ownerAvatar} userId={loggedIn ? club.ownerId : undefined} />
                <div>
                  <p className="text-xs text-gray-400">Club owner</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{club.ownerName}</p>
                </div>
              </div>

              {/* member / owner view */}
              {isIn && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <p className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {status?.role === "owner" ? "You run this club" : "You're in this club"}
                  </p>
                  {status?.instructions ? (
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Instructions</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{status.instructions}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">No instructions have been added yet.</p>
                  )}
                  {status?.role === "owner" && (
                    <Button className="mt-3" size="sm" color="primary" radius="full" onPress={() => navigate("/my-club")}>
                      Open my dashboard
                    </Button>
                  )}
                </div>
              )}

              {/* join */}
              {!isIn && (
                <div className="space-y-2">
                  <Button
                    className="w-full font-bold text-white bg-gradient-to-r from-primary to-violet-600 py-6"
                    radius="full"
                    size="lg"
                    isLoading={joining}
                    isDisabled={!club.isActive || (loggedIn && !!status && !status.canJoin)}
                    onPress={handleJoin}
                  >
                    {loggedIn ? "Join this club" : "Log in to join"}
                  </Button>
                  {!club.isActive && (
                    <p className="text-xs text-center text-amber-700">This club isn&apos;t accepting new members right now.</p>
                  )}
                  {status && !status.canJoin && status.reason && club.isActive && (
                    <p className="text-xs text-center text-amber-700 bg-amber-500/10 rounded-lg px-3 py-2">{status.reason}</p>
                  )}
                  {!loggedIn && (
                    <p className="text-xs text-center text-gray-500">You can only be in one club.</p>
                  )}
                </div>
              )}

              <Button variant="flat" radius="full" className="w-full" startContent={<Share2 className="w-4 h-4" />} onPress={() => setShareOpen(true)}>
                Share this club
              </Button>
            </div>
          </div>
        )}
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={club ? getClubUrl(club.slug) : null}
        heading="Share this club"
        subtitle="Anyone with this link can see the club and join it."
        message={club ? `Join "${club.name}" on MAG!` : undefined}
      />
    </div>
  );
};

export default ClubPage;