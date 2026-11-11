// ADMIN — list of clubs with search + pagination.  Route: admin/clubs
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft, Plus, Search, Users, X } from "lucide-react";
import { useGetAdminClubs, type ClubInfo } from "@/lib/graphql";
import { Avatar, Spinner, useDebounced, usePaginated } from "@/components/dailychalanges/magshared";

const ownerName = (c: ClubInfo) =>
  `${c.owner.firstName ?? ""} ${c.owner.lastName ?? ""}`.trim() || c.owner.username || "Owner";

const AdminClubsPage = () => {
  const navigate = useNavigate();
  const [getClubs] = useGetAdminClubs();
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);

  const list = usePaginated<ClubInfo>(
    async (page) => {
      const r = await getClubs({ variables: { input: { page, query: debounced || undefined } } });
      return r.data?.GetAdminClubs;
    },
    [debounced],
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft size={16} /> Dashboard
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clubs</h1>
          <p className="text-sm text-gray-500">Each club has one owner. A user can only be in one club.</p>
        </div>
        <button
          onClick={() => navigate("/admin/clubs/new")}
          className="inline-flex items-center gap-2 rounded-xl bg-[#9747FF] text-white font-semibold text-sm px-4 py-2.5 hover:opacity-90"
        >
          <Plus size={16} /> New club
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm mb-5">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by club name, link, description or owner…"
          className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
        <span className="text-xs text-gray-400 whitespace-nowrap">{list.items.length} loaded</span>
      </div>

      <InfiniteScroll
        dataLength={list.items.length}
        next={list.loadMore}
        hasMore={list.hasMore}
        loader={<Spinner />}
        endMessage={
          !list.loading && (
            <p className="text-center text-sm text-gray-400 py-8">
              {list.items.length === 0 ? (query ? "No clubs match your search." : "No clubs yet. Create the first one!") : "All clubs loaded."}
            </p>
          )
        }
      >
        <div className="space-y-3">
          {list.items.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/admin/clubs/${c.id}`)}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-4"
            >
              <Avatar name={ownerName(c)} size={46} src={c.owner.avatar} userId={c.owner.id} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-gray-900 truncate">{c.name}</p>
                  {!c.isActive && (
                    <span className="rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold px-2 py-0.5">Closed</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  /club/{c.slug} · owner {ownerName(c)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                  <Users size={14} className="text-gray-400" /> <b>{c.memberCount}</b>
                </p>
                <p className="text-[11px] text-gray-400">members</p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AdminClubsPage;