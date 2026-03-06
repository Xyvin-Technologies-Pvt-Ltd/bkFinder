import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { toast } from "sonner";

function GroupTicketsPage() {
  const { groupId } = useParams();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const baseUrl = useMemo(
    () => import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    []
  );

  useEffect(() => {
    let ignore = false;

    async function loadGroup() {
      if (!groupId) return;

      setLoading(true);
      try {
        const resp = await fetch(`${baseUrl}/api/users/group/${groupId}`);
        const data = await resp.json();

        if (!resp.ok) {
          throw new Error(data?.message || "Failed to load group booking");
        }

        if (!ignore) {
          setUsers(Array.isArray(data?.users) ? data.users : []);
        }
      } catch (err) {
        console.error(err);
        toast.error(err?.message || "Failed to load group tickets");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadGroup();

    return () => {
      ignore = true;
    };
  }, [baseUrl, groupId]);

  const downloadAllCards = async () => {
    if (!users.length) return;

    setDownloading(true);
    try {
      for (let idx = 0; idx < users.length; idx++) {
        const u = users[idx];
        const id = u?.id;
        if (!id) continue;

        const res = await fetch(`${baseUrl}/api/card/image/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to download card for ${u?.name || `Member ${idx + 1}`}`);
        }

        const blob = await res.blob();
        const safeName = (u?.name || `member-${idx + 1}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        saveAs(blob, `${safeName || `member-${idx + 1}`}-${id}.png`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to download tickets");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="max-w-3xl lg:max-w-5xl mx-auto pt-14 sm:pt-20 px-4 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-6 sm:p-8 lg:p-10">
          <div className="text-center">
            <p className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.34em] text-emerald-700 uppercase">
              Success
            </p>
            <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Group Booking Successful
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Your tickets are ready. Preview each card instantly or download all tickets for sharing.
            </p>
          </div>

          <div className="mt-6">
            <div className="w-full rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                    {loading ? "Loading..." : `${users.length} Ticket${users.length === 1 ? "" : "s"}`}
                  </span>
                  {!loading && users.length > 0 && (
                    <span className="hidden sm:inline text-xs text-slate-500">
                      Group ID: {groupId}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={downloadAllCards}
                disabled={loading || downloading || users.length === 0}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {downloading ? "Downloading..." : "Download All"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {!loading && users.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-sm text-slate-600">No tickets found for this group.</p>
              <p className="text-xs text-slate-400 mt-1">Group ID: {groupId}</p>
            </div>
        )}

        {users.map((u, idx) => (
          <div
            key={u?.id || idx}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
              <div className="flex items-center gap-4 min-w-0 w-full">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <img
                    src={`${baseUrl}/api/card/image/${u?.id}`}
                    alt={`Ticket preview for ${u?.name || `Member ${idx + 1}`}`}
                    className="w-20 sm:w-24 rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                    {u?.name || `Member ${idx + 1}`}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 break-all">
                    Ticket ID: {u?.id}
                  </p>
                </div>
              </div>

            <Link
              to={`/card/${u?.id}`}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold hover:from-emerald-700 hover:to-emerald-600 shadow-sm"
              target="_blank"
              rel="noreferrer"
            >
              View Card
            </Link>
          </div>
        ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupTicketsPage;
