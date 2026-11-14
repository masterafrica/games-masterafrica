// PROFILE — public profile of any user.  Route: /profile/:userId   (inside ProtectedRoute / MainLayout)
// (your own /profile page stays as it is)
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, ChevronDown, ChevronUp, FileText, Heart, Sparkles, Trophy, Users } from "lucide-react";
import {
  useGetUserProfile,
  useGetUserProfileChallenges,
  type ProfileChallengeRow,
  type PublicProfile,
} from "@/lib/graphql";
import { Avatar, CategoryBadge, ChallengeStateBadge, Spinner, usePaginated } from "@/components/dailychalanges/magshared";
import { getreadabledate } from "@/utils";

const ChallengesDone = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();
  const [getRows] = useGetUserProfileChallenges();
  const list = usePaginated<ProfileChallengeRow>(
    async (page) => {
      const r = await getRows({ variables: { input: { userId, page } } });
      return r.data?.GetUserProfileChallenges;
    },
    [userId],
  );

  return (
    <div className="mt-4 space-y-2">
      {list.loading && list.items.length === 0 && <Spinner />}
      {!list.loading && list.items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">No challenge entries yet.</p>
      )}

      {list.items.map((r) => (
        <div
          key={r.entryId}
          className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-800 p-3"
        >
          {r.challengeImage ? (
            <img alt="" src={r.challengeImage} className="w-12 h-12 rounded-lg object-cover shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/mag-challenge/${r.challengeSlug}`)}
                className="text-sm font-semibold text-gray-900 dark:text-white truncate hover:text-primary text-left"
              >
                {r.challengeTitle}
              </button>
              <ChallengeStateBadge open={r.challengeOpen} />
            </div>
            <p className="text-xs text-gray-400 truncate">
              <Link to={`/mag-challenge/submission/${r.entryId}`} className="hover:text-primary hover:underline">
                {r.entryTitle || "View entry"}
              </Link>{" "}
              · {getreadabledate(r.createdAt)}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white shrink-0">
            <Heart size={13} className="text-rose-500" fill="currentColor" />
            {r.votes}
          </span>
        </div>
      ))}

      {list.hasMore && !list.loading && list.items.length > 0 && (
        <div className="text-center pt-2">
          <Button size="sm" variant="flat" radius="full" onPress={list.loadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

const ProfileViewPage = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const [getProfile] = useGetUserProfile();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
      setShowChallenges(false);
      try {
        const r = await getProfile({ variables: { input: { userId } } });
        if (r.data?.GetUserProfile) setProfile(r.data.GetUserProfile);
        else setNotFound(true);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const name = profile
    ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() || profile.username || "MAG player"
    : "";

  // skill interests = their profile skill + the kinds of challenges they entered (no duplicates)
  const skills = profile
    ? Array.from(new Set([profile.skillName,
        //  ...profile.interests

    ].filter(Boolean) as string[]))
    : [];

  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      <button
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {loading && <Spinner />}

      {!loading && notFound && <p className="text-center text-gray-500 py-16">We couldn&apos;t find this profile.</p>}

      {!loading && profile && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary to-violet-600" />
          <div className="px-6 pb-6">
            <div className="-mt-12 mb-3 ring-4 ring-white dark:ring-gray-900 rounded-full w-fit">
              <Avatar name={name} size={96} src={profile.avatar} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
            {profile.username && <p className="text-sm text-gray-400">@{profile.username}</p>}

            {profile.bio && <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{profile.bio}</p>}

            {/* skill interest */}
            <div className="mt-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Skill interest
              </p>
              {skills.length === 0 ? (
                <p className="text-sm text-gray-400">Nothing yet. It fills up as they enter challenges.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((sk) => (
                    <CategoryBadge key={sk} category={sk} />
                  ))}
                </div>
              )}
            </div>

            {/* numbers */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                <FileText className="w-4 h-4 text-primary mb-1" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.entriesCount}</p>
                <p className="text-xs text-gray-500">Challenge entries</p>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                <Heart className="w-4 h-4 text-rose-500 mb-1" fill="currentColor" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.totalVotes}</p>
                <p className="text-xs text-gray-500">Votes received</p>
              </div>
            </div>

            {/* club + joined */}
            <div className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {profile.clubName && profile.clubSlug ? (
                  <>
                    <Link to={`/club/${profile.clubSlug}`} className="text-primary font-semibold hover:underline">
                      {profile.clubName}
                    </Link>
                    {profile.clubRole === "owner" && (
                      <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5">Owner</span>
                    )}
                  </>
                ) : (
                  <span>Not in a club</span>
                )}
              </p>
              {profile.joinedAt && (
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Joined {getreadabledate(profile.joinedAt)}
                </p>
              )}
            </div>

            {/* challenges done */}
            <Button
              className="mt-6 w-full"
              color="primary"
              variant={showChallenges ? "flat" : "solid"}
              radius="full"
              startContent={<Trophy className="w-4 h-4" />}
              endContent={showChallenges ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              onPress={() => setShowChallenges((s) => !s)}
            >
              {showChallenges ? "Hide challenges" : `Challenges done (${profile.entriesCount})`}
            </Button>

            {showChallenges && <ChallengesDone userId={profile.id} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileViewPage;