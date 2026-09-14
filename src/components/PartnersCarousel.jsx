import { useEffect, useMemo, useRef, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { db } from "../firebase";
import Reveal from "./Reveal";
import { IconChevronRight } from "./Icons";

const SLOTS_DESKTOP = 3;
const SLOTS_MOBILE = 2;
const MOBILE_BREAKPOINT = 820;
const AUTO_MS = 4000;

function useSlotCount() {
  const getCount = () =>
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT ? SLOTS_MOBILE : SLOTS_DESKTOP;
  const [count, setCount] = useState(getCount);
  useEffect(() => {
    function onResize() { setCount(getCount()); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
}

// Enters from the right, exits to the left (direction 1 = forward/auto/Next).
// Reversed (enters left, exits right) when direction -1 (Prev).
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};

export default function PartnersCarousel() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const slotCount = useSlotCount();

  const [windowStart, setWindowStart] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "partners"), orderBy("order", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setPartners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (e) => {
        console.error(e);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    setWindowStart(0);
  }, [partners.length, slotCount]);

  const canRotate = partners.length > slotCount;

  function startAutoTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!canRotate) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setWindowStart((s) => (s + 1) % partners.length);
    }, AUTO_MS);
  }

  useEffect(() => {
    startAutoTimer();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canRotate, partners.length]);

  function goNext() {
    if (!canRotate) return;
    setDirection(1);
    setWindowStart((s) => (s + 1) % partners.length);
    startAutoTimer();
  }
  function goPrev() {
    if (!canRotate) return;
    setDirection(-1);
    setWindowStart((s) => (s - 1 + partners.length) % partners.length);
    startAutoTimer();
  }

  const visible = useMemo(() => {
    if (partners.length === 0) return [];
    const n = Math.min(slotCount, partners.length);
    return Array.from({ length: n }, (_, i) => partners[(windowStart + i) % partners.length]);
  }, [partners, slotCount, windowStart]);

  if (loading || partners.length === 0) return null;

  function openFull(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="partnersSection">
      <div className="wrap">
        <Reveal as="h2" className="partnersTitle">Our Partners</Reveal>

        <div className="partnersRow">
          {canRotate && (
            <button
              type="button"
              className="partnersArrow partnersArrowLeft"
              onClick={goPrev}
              aria-label="Previous partners"
            >
              <IconChevronRight />
            </button>
          )}

          <div className="partnersGrid">
            <div className="partnersGridInner">
              {visible.map((p, slot) => (
                <div className="partnerSlot" key={slot}>
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.button
                      type="button"
                      className="partnerCard"
                      key={p.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => p.logoUrl && openFull(p.logoUrl)}
                      aria-label="View partner logo"
                    >
                      {p.logoUrl && (
                        <img src={p.logoUrl} alt="Partner logo" className="partnerLogo" />
                      )}
                    </motion.button>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {canRotate && (
            <button
              type="button"
              className="partnersArrow partnersArrowRight"
              onClick={goNext}
              aria-label="Next partners"
            >
              <IconChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}