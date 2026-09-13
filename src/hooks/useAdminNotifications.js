import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Live unread-message count for the admin sidebar badge, plus a browser
// Notification the moment a new inquiry comes in — as long as the admin
// has some tab of the site open somewhere (this session) and has turned
// notifications on in Settings. It can't wake up a fully closed browser;
// that would need a server-side push setup.
export function useAdminNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const seenIds = useRef(new Set());
  const firstSnapshot = useRef(true);

  useEffect(() => {
    let enabled = false;

    getDoc(doc(db, "sosariAdmin", "admin"))
      .then((snap) => { enabled = !!snap.data()?.notificationsEnabled; })
      .catch(() => {});

    const unsub = onSnapshot(collection(db, "messages"), (snap) => {
      let unread = 0;
      snap.forEach((d) => {
        if (d.data().read !== true) unread += 1;
      });
      setUnreadCount(unread);

      // Skip the very first snapshot (that's just existing history loading in),
      // only notify for documents that actually arrive after this.
      if (firstSnapshot.current) {
        firstSnapshot.current = false;
        snap.forEach((d) => seenIds.current.add(d.id));
        return;
      }

      snap.docChanges().forEach((change) => {
        if (change.type !== "added") return;
        if (seenIds.current.has(change.doc.id)) return;
        seenIds.current.add(change.doc.id);

        if (enabled && typeof Notification !== "undefined" && Notification.permission === "granted") {
          const m = change.doc.data();
          new Notification("New Work With SOSARI inquiry", {
            body: `${m.nameOrg || m.name || "Someone"} — ${m.email || ""}`,
            icon: "/favicon.png",
          });
        }
      });
    });

    return () => unsub();
  }, []);

  return { unreadCount };
}