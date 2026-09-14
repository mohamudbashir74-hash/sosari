import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { DEFAULT_NAV, buildSectionIndex } from "../config/navigation";

const NavigationContext = createContext(null);
const NAV_DOC_REF = doc(db, "config", "navigation");

export function NavigationProvider({ children }) {
  const [nav, setNav] = useState(DEFAULT_NAV);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      NAV_DOC_REF,
      (snap) => {
        const data = snap.data();
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          setNav(data.items);
        } else {
          setNav(DEFAULT_NAV);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const sectionIndex = useMemo(() => buildSectionIndex(nav), [nav]);

  async function saveNav(items) {
    await setDoc(NAV_DOC_REF, { items });
  }

  const value = { nav, sectionIndex, loading, saveNav };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used within a NavigationProvider");
  return ctx;
}