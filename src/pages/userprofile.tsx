// PROFILE — public profile of any user.  Route: /profile/:userId   (inside ProtectedRoute / MainLayout)
// (your own /profile page stays as it is)
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, FileText, Heart, Users } from "lucide-react";
import { useGetUserProfile, type PublicProfile } from "@/lib/graphql";
import { Avatar, Spinner } from "@/components/dailychalanges/magshared";
import { getreadabledate } from "@/utils";

const ProfileViewPage = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const [getProfile] = useGetUserProfile();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
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

            <div className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {profile.clubName && profile.clubSlug && (
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <Link to={`/club/${profile.clubSlug}`} className="text-primary font-semibold hover:underline">
                    {profile.clubName}
                  </Link>
                  {profile.clubRole === "owner" && <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5">Owner</span>}
                </p>
              )}
              {profile.joinedAt && (
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Joined {getreadabledate(profile.joinedAt)}
                </p>
              )}
            </div>

            <Button className="mt-6" variant="flat" radius="full" onPress={() => navigate("/mag-challenge")}>
              See challenges
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileViewPage;