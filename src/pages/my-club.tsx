// CLUB — my club.  Route: /my-club   (inside ProtectedRoute / MainLayout)
// Owner  → dashboard: member count, name, description, instructions, share link, searchable member list.
// Member → club details + instructions.   No club → short explanation.
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Copy, Search, Share2, Users, X } from "lucide-react";
import toast from "react-hot-toast";
import { useGetMyClub, useGetMyClubMembers, type ClubMemberEntry, type MyClub } from "@/lib/graphql";
import { Avatar, Spinner, useDebounced, usePaginated } from "@/components/dailychalanges/magshared";
import ShareModal, { getClubUrl } from "@/components/dailychalanges/sharemodal";
import { getreadabledate } from "@/utils";

const MyClubPage = () => {
  const navigate = useNavigate();
  const [getMyClub] = useGetMyClub();
  const [getMembers] = useGetMyClubMembers();

  const [mine, setMine] = useState<MyClub | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);

  useEffect(() => {
    (async () => {
      try {
        const r = await getMyClub();
        setMine(r.data?.GetMyClub ?? null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOwner = mine?.role === "owner";

  const members = usePaginated<ClubMemberEntry>(
    async (page) => {
      if (!isOwner) return null;
      const r = await getMembers({ variables: { input: { page, query: debounced || undefined } } });
      return r.data?.GetMyClubMembers;
    },
    [isOwner, debounced],
  );

  if (loading) return <Spinner />;

  if (!mine) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You&apos;re not in a club yet</h1>
        <p className="text-sm text-gray-500 mb-6">
          Ask a club owner for their club link, open it and press Join. You can only be in one club.
        </p>
        <Button color="primary" radius="full" onPress={() => navigate("/mag-challenge")}>
          Browse challenges
        </Button>
      </div>
    );
  }

  const club = mine.club;
  const link = getClubUrl(club.slug);
  const copy = () =>
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Couldn't copy"));

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      {/* header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-violet-600 text-white p-6">
        <p className="text-xs uppercase tracking-wide opacity-80">{isOwner ? "Your club" : "Club you're in"}</p>
        <h1 className="text-3xl font-bold mt-1">{club.name}</h1>
        {club.description && <p className="text-sm opacity-90 mt-2 whitespace-pre-line">{club.description}</p>}
        {!club.isActive && (
          <p className="mt-3 inline-block rounded-full bg-white/20 text-xs px-3 py-1">Closed to new members</p>
        )}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <Users className="w-5 h-5 text-primary mb-2" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{club.memberCount}</p>
          <p className="text-sm text-gray-500">Member{club.memberCount !== 1 && "s"}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <p className="text-xs text-gray-400 mb-1">Club owner</p>
          <div className="flex items-center gap-3">
            <Avatar
              name={`${club.owner.firstName ?? ""} ${club.owner.lastName ?? ""}`.trim() || "Owner"}
              size={40}
              src={club.owner.avatar}
              userId={club.owner.id}
            />
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {`${club.owner.firstName ?? ""} ${club.owner.lastName ?? ""}`.trim() || club.owner.username}
            </p>
          </div>
        </div>
      </div>

      {/* share */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <p className="font-semibold text-gray-900 dark:text-white">Club link</p>
        <p className="text-xs text-gray-500">Share it. People who open it can see the club and join.</p>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2">
          <input readOnly value={link} className="flex-1 min-w-0 bg-transparent text-sm outline-none" onFocus={(e) => e.currentTarget.select()} />
          <button onClick={copy} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Copy size={14} /> Copy
          </button>
        </div>
        <Button color="primary" radius="full" startContent={<Share2 className="w-4 h-4" />} onPress={() => setShareOpen(true)}>
          Share
        </Button>
      </div>

      {/* instructions */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Instructions</p>
        {club.instructions ? (
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{club.instructions}</p>
        ) : (
          <p className="text-sm text-gray-400">No instructions have been added yet.</p>
        )}
      </div>

      {/* owner: members list */}
      {isOwner && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-gray-900 dark:text-white">Members</p>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-1.5">
              <Search size={14} className="text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members…"
                className="text-sm outline-none bg-transparent w-44"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <InfiniteScroll
            dataLength={members.items.length}
            next={members.loadMore}
            hasMore={members.hasMore}
            loader={<Spinner />}
            endMessage={
              !members.loading && (
                <p className="text-center text-sm text-gray-400 py-4">
                  {members.items.length === 0
                    ? query
                      ? "No members match your search."
                      : "No one has joined yet. Share your link!"
                    : "All members loaded."}
                </p>
              )
            }
          >
            {members.items.map((m) => {
              const name = `${m.user.firstName ?? ""} ${m.user.lastName ?? ""}`.trim() || m.user.username || "Member";
              return (
                <div key={m.user.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <Avatar name={name} size={38} src={m.user.avatar} userId={m.user.id} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
                    {m.user.username && <p className="text-xs text-gray-400 truncate">@{m.user.username}</p>}
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">Joined {getreadabledate(m.joinedAt)}</span>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={link}
        heading="Share your club"
        subtitle="Anyone with this link can see the club and join it."
        message={`Join "${club.name}" on MAG!`}
      />
    </div>
  );
};

export default MyClubPage;