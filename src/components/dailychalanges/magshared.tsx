import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Tech Skills": { bg: "#F3EDFF", text: "#6B21C8", border: "#C4A8F0" },
  "Creative Skills": { bg: "#FEE7EC", text: "#BE1239", border: "#F7A8B8" },
  "Manual Skills": { bg: "#FEF3CD", text: "#92590A", border: "#F9D78A" },
  "Soft Skills": { bg: "#E0F7FA", text: "#0E6E7A", border: "#89DCE4" },
};
export const CATEGORY_NAMES = Object.keys(CATEGORY_COLORS);

export const errMsg = (e: unknown) =>
  (e as { message?: string })?.message?.replace(/^.*?:\s*/, "") || "Something went wrong";

export const Avatar = ({ name, size = 36 }: { name: string; size?: number }) => {
  const initials = name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold shrink-0"
      style={{ width: size, height: size, background: "#F3EDFF", color: "#6B21C8", fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
};

export const CategoryBadge = ({ category }: { category?: string }) => {
  if (!category) return null;
  const c = CATEGORY_COLORS[category] ?? { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" };
  return (
    <span
      className="rounded-full text-[11px] font-semibold px-2.5 py-0.5 whitespace-nowrap"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {category}
    </span>
  );
};

export const Spinner = () => (
  <div className="flex justify-center py-6">
    <div className="w-6 h-6 rounded-full border-2 border-[#9747FF] border-t-transparent animate-spin" />
  </div>
);

export const StatusPill = ({ qualified }: { qualified: boolean }) => (
  <span
    className={`rounded-full text-[11px] font-semibold px-2.5 py-0.5 ${
      qualified ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
    }`}
  >
    {qualified ? "Qualified" : "Pending"}
  </span>
);

/* ───── weeks (a challenge = Mon→Sun, UTC; must match the backend) ───── */
export const mondayOf = (d: Date = new Date()) => {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7));
  return x.toISOString().slice(0, 10);
};
const shiftWeek = (iso: string, n: number) => {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n * 7);
  return d.toISOString().slice(0, 10);
};
const fmt = (iso: string, add = 0) => {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + add);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
};

export const WeekSwitcher = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const isCurrent = value >= mondayOf();
  return (
    <div className="inline-flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-1 py-1 shadow-sm">
      <button
        aria-label="Previous week"
        className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => onChange(shiftWeek(value, -1))}
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-medium px-2 min-w-[130px] text-center">
        {fmt(value)} – {fmt(value, 6)}
        {isCurrent && <span className="ml-1 text-[#9747FF]">· this week</span>}
      </span>
      <button
        aria-label="Next week"
        disabled={isCurrent}
        className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30"
        onClick={() => onChange(shiftWeek(value, 1))}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export const CategoryFilter = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-wrap gap-2">
    {["", ...CATEGORY_NAMES].map((c) => (
      <button
        key={c || "all"}
        onClick={() => onChange(c)}
        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
          value === c
            ? "bg-[#9747FF] text-white border-[#9747FF]"
            : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50"
        }`}
      >
        {c || "All"}
      </button>
    ))}
  </div>
);

/* ───── generic paginated list: plug into <InfiniteScroll dataLength next hasMore> ───── */
type PageResult<T> = { data: T[]; hasMore: boolean; nextPage: number };

export function usePaginated<T, M = PageResult<T>>(
  fetchPage: (page: number) => Promise<(PageResult<T> & Partial<M>) | undefined | null>,
  deps: unknown[],
) {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<(PageResult<T> & Partial<M>) | null>(null);
  const nextPage = useRef(1);
  const reqId = useRef(0);
  const busy = useRef(false);
  const fetchRef = useRef(fetchPage);
  fetchRef.current = fetchPage;

  const load = useCallback(async (reset: boolean) => {
    if (busy.current && !reset) return;
    const id = ++reqId.current;
    busy.current = true;
    setLoading(true);
    try {
      const res = await fetchRef.current(reset ? 1 : nextPage.current);
      if (id !== reqId.current) return; // a newer request superseded this one
      if (!res) {
        setHasMore(false);
        return;
      }
      setItems((prev) => (reset ? res.data : [...prev, ...res.data]));
      setHasMore(res.hasMore);
      nextPage.current = res.nextPage;
      setMeta(res);
    } catch {
      if (id === reqId.current) setHasMore(false);
    } finally {
      if (id === reqId.current) {
        busy.current = false;
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    setItems([]);
    setHasMore(true);
    setMeta(null);
    nextPage.current = 1;
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { items, setItems, hasMore, loading, meta, loadMore: () => load(false) };
}