import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { db } from "../firebase";
import Reveal from "./Reveal";
import { IconChevronRight } from "./Icons";

const PER_PAGE_DESKTOP = 3;
const PER_PAGE_MOBILE = 2;
const MOBILE_BREAKPOINT = 820;
const AUTO_MS = 4000;

function usePerPage() {
  const getPerPage = () =>
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP;
  const [perPage, setPerPage] = useState(getPerPage);
  useEffect(() => {
    function onResize() { setPerPage(getPerPage()); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return perPage;
}

export default function PartnersCarousel() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const perPage = usePerPage();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const q = query(collection(db, "partners"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) setPartners(rows);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < partners.length; i += perPage) {
      chunks.push(partners.slice(i, i + perPage));
    }
    return chunks;
  }, [partners, perPage]);

  useEffect(() => {
    if (pages.length <= 1) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [pages.length]);

  useEffect(() => {
    if (page >= pages.length) setPage(0);
  }, [pages.length, page]);

  if (loading || partners.length === 0) return null;

  const current = pages[page] || [];

  function openFull(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function goPrev() {
    setPage((p) => (p - 1 + pages.length) % pages.length);
  }
  function goNext() {
    setPage((p) => (p + 1) % pages.length);
  }

  return (
    <section className="partnersSection">
      <div className="wrap">
        <Reveal as="h2" className="partnersTitle">Our Partners</Reveal>
        <Reveal as="p" delay={0.05} className="partnersSubtitle">
          Over the years we have partnered with great entities and organizations.
        </Reveal>

        <div className="partnersRow">
          {pages.length > 1 && (
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
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                className="partnersGridInner"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.map((p) => (
                  <button
                    type="button"
                    className="partnerCard"
                    key={p.id}
                    onClick={() => p.logoUrl && openFull(p.logoUrl)}
                    aria-label="View partner logo"
                  >
                    {p.logoUrl && (
                      <img src={p.logoUrl} alt="Partner logo" className="partnerLogo" />
                    )}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {pages.length > 1 && (
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

        {pages.length > 1 && (
          <div className="partnersDots">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`partnersDot${i === page ? " active" : ""}`}
                aria-label={`Go to partners page ${i + 1}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}