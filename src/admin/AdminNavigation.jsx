import { useEffect, useState } from "react";
import { useNavigation } from "../contexts/NavigationContext";

function slugify(text) {
  return (
    text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "item"
  );
}

function uniqueKey(base, existingKeys) {
  let key = base;
  let n = 2;
  while (existingKeys.has(key)) {
    key = `${base}-${n}`;
    n += 1;
  }
  return key;
}

function collectKeys(nav) {
  const keys = new Set();
  for (const g of nav) {
    keys.add(g.key);
    const items = g.items || (g.groups ? g.groups.flatMap((gr) => gr.items) : []);
    for (const it of items) keys.add(it.key);
  }
  return keys;
}

export default function AdminNavigation() {
  const { nav: liveNav, saveNav } = useNavigation();
  const [nav, setNav] = useState(liveNav);
  const [openKey, setOpenKey] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) setNav(liveNav);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveNav]);

  function markDirty(updater) {
    setDirty(true);
    setSavedAt(null);
    setNav(updater);
  }

  function updateSection(idx, patch) {
    markDirty((prev) => prev.map((g, i) => (i === idx ? { ...g, ...patch } : g)));
  }

  function deleteSection(idx) {
    const g = nav[idx];
    if (!window.confirm(`Ma hubtaa inaad ka saarto "${g.label}" navbar-ka? (Xogta hore ee la keydiyay lama tirtirayo.)`)) return;
    markDirty((prev) => prev.filter((_, i) => i !== idx));
  }

  function addSection() {
    const label = window.prompt("Magaca qaybta cusub (tusaale: 'Publications'):");
    if (!label || !label.trim()) return;
    const keys = collectKeys(nav);
    const key = uniqueKey(slugify(label), keys);
    markDirty((prev) => [...prev, { label: label.trim(), key, items: [] }]);
    setOpenKey(key);
  }

  function addItem(sectionIdx) {
    const label = window.prompt("Magaca link-ga cusub:");
    if (!label || !label.trim()) return;
    const section = nav[sectionIdx];
    const keys = collectKeys(nav);
    const key = uniqueKey(`${section.key}/${slugify(label)}`, keys);
    markDirty((prev) =>
      prev.map((g, i) => (i === sectionIdx ? { ...g, items: [...(g.items || []), { label: label.trim(), key }] } : g))
    );
  }

  function updateItem(sectionIdx, itemIdx, label) {
    markDirty((prev) =>
      prev.map((g, i) => {
        if (i !== sectionIdx) return g;
        return { ...g, items: g.items.map((it, j) => (j === itemIdx ? { ...it, label } : it)) };
      })
    );
  }

  function deleteItem(sectionIdx, itemIdx) {
    markDirty((prev) =>
      prev.map((g, i) => (i !== sectionIdx ? g : { ...g, items: g.items.filter((_, j) => j !== itemIdx) }))
    );
  }

  function addGroup(sectionIdx) {
    const subcap = window.prompt("Magaca kooxda cusub (tusaale: 'Human Development'):");
    if (!subcap || !subcap.trim()) return;
    markDirty((prev) =>
      prev.map((g, i) => (i === sectionIdx ? { ...g, groups: [...(g.groups || []), { subcap: subcap.trim(), items: [] }] } : g))
    );
  }

  function updateGroup(sectionIdx, groupIdx, subcap) {
    markDirty((prev) =>
      prev.map((g, i) => {
        if (i !== sectionIdx) return g;
        return { ...g, groups: g.groups.map((gr, j) => (j === groupIdx ? { ...gr, subcap } : gr)) };
      })
    );
  }

  function deleteGroup(sectionIdx, groupIdx) {
    if (!window.confirm("Ma hubtaa inaad tirtirto kooxdan iyo dhammaan link-yadeeda?")) return;
    markDirty((prev) =>
      prev.map((g, i) => (i !== sectionIdx ? g : { ...g, groups: g.groups.filter((_, j) => j !== groupIdx) }))
    );
  }

  function addGroupItem(sectionIdx, groupIdx) {
    const label = window.prompt("Magaca link-ga cusub:");
    if (!label || !label.trim()) return;
    const section = nav[sectionIdx];
    const keys = collectKeys(nav);
    const key = uniqueKey(`${section.key}/${slugify(label)}`, keys);
    markDirty((prev) =>
      prev.map((g, i) => {
        if (i !== sectionIdx) return g;
        return {
          ...g,
          groups: g.groups.map((gr, j) => (j === groupIdx ? { ...gr, items: [...gr.items, { label: label.trim(), key }] } : gr)),
        };
      })
    );
  }

  function updateGroupItem(sectionIdx, groupIdx, itemIdx, label) {
    markDirty((prev) =>
      prev.map((g, i) => {
        if (i !== sectionIdx) return g;
        return {
          ...g,
          groups: g.groups.map((gr, j) => {
            if (j !== groupIdx) return gr;
            return { ...gr, items: gr.items.map((it, k) => (k === itemIdx ? { ...it, label } : it)) };
          }),
        };
      })
    );
  }

  function deleteGroupItem(sectionIdx, groupIdx, itemIdx) {
    markDirty((prev) =>
      prev.map((g, i) => {
        if (i !== sectionIdx) return g;
        return {
          ...g,
          groups: g.groups.map((gr, j) => (j !== groupIdx ? gr : { ...gr, items: gr.items.filter((_, k) => k !== itemIdx) })),
        };
      })
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveNav(nav);
      setDirty(false);
      setSavedAt(Date.now());
    } catch (e) {
      console.error(e);
      alert("Wax baa qaldamay markii la keydinayay. Isku day mar kale.");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    if (dirty && !window.confirm("Isbeddelada aan la keydin ayaa lumi doona. Sii wad?")) return;
    setNav(liveNav);
    setDirty(false);
    setSavedAt(null);
  }

  return (
    <div className="adminPage">
      <h1>Navigation Menu</h1>
      <p className="lead">
        Halkan waxaad ka maareysaa dhammaan qaybaha navbar-ka (About, Research Areas, Data &amp; Statistics, Policy
        &amp; Advisory, iwm) — waxaad ku dari kartaa link cusub, magac beddeli kartaa, ama ka saari kartaa menu-ga.
        Marka aad dhammaysato, taabo "Keydi Isbeddelada" si ay website-ka firfircoon ugu muuqdaan isla markiiba.
      </p>

      <div className="adminFormActions" style={{ marginBottom: 18, flexWrap: "wrap" }}>
        <button className="btn primary" type="button" onClick={handleSave} disabled={saving || !dirty}>
          {saving ? "Keydinaya…" : "Keydi Isbeddelada"}
        </button>
        <button className="btn outline" type="button" onClick={handleReset} disabled={!dirty}>
          Ka noqo isbeddelada
        </button>
        <button className="btn outline" type="button" onClick={addSection}>
          + Qayb cusub (top-level)
        </button>
        {savedAt && !dirty && <span style={{ color: "var(--teal)", fontSize: 13, alignSelf: "center" }}>La keydiyay ✓</span>}
        {dirty && <span style={{ color: "var(--gold)", fontSize: 13, alignSelf: "center" }}>Isbeddello aan la keydin ayaa jira</span>}
      </div>

      <div className="adminNavList">
        {nav.map((section, sIdx) => {
          const isOpen = openKey === section.key;
          const isGrouped = Array.isArray(section.groups);
          return (
            <div key={section.key} className="adminNavCard">
              <div className="adminNavCardHead">
                <button
                  type="button"
                  className="adminNavToggle"
                  onClick={() => setOpenKey(isOpen ? null : section.key)}
                  aria-label="Toggle"
                >
                  {isOpen ? "▾" : "▸"}
                </button>
                <input
                  className="adminNavLabelInput"
                  value={section.label}
                  onChange={(e) => updateSection(sIdx, { label: e.target.value })}
                />
                <span className="adminNavKey">{section.key}</span>
                <button type="button" className="btn outline adminNavDelete" onClick={() => deleteSection(sIdx)}>
                  Tirtir
                </button>
              </div>

              {isOpen && (
                <div className="adminNavCardBody">
                  {!isGrouped && (
                    <>
                      {(section.items || []).map((it, iIdx) => (
                        <div key={it.key} className="adminNavItemRow">
                          <input value={it.label} onChange={(e) => updateItem(sIdx, iIdx, e.target.value)} />
                          <span className="adminNavKey">{it.key}</span>
                          <button type="button" className="btn outline" onClick={() => deleteItem(sIdx, iIdx)}>✕</button>
                        </div>
                      ))}
                      <button type="button" className="btn outline adminNavAddBtn" onClick={() => addItem(sIdx)}>
                        + Ku dar link
                      </button>
                    </>
                  )}

                  {isGrouped && (
                    <>
                      {section.groups.map((group, gIdx) => (
                        <div key={gIdx} className="adminNavGroup">
                          <div className="adminNavGroupHead">
                            <input value={group.subcap} onChange={(e) => updateGroup(sIdx, gIdx, e.target.value)} />
                            <button type="button" className="btn outline" onClick={() => deleteGroup(sIdx, gIdx)}>
                              Tirtir kooxda
                            </button>
                          </div>
                          {group.items.map((it, iIdx) => (
                            <div key={it.key} className="adminNavItemRow">
                              <input value={it.label} onChange={(e) => updateGroupItem(sIdx, gIdx, iIdx, e.target.value)} />
                              <span className="adminNavKey">{it.key}</span>
                              <button type="button" className="btn outline" onClick={() => deleteGroupItem(sIdx, gIdx, iIdx)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn outline adminNavAddBtn" onClick={() => addGroupItem(sIdx, gIdx)}>
                            + Ku dar link
                          </button>
                        </div>
                      ))}
                      <button type="button" className="btn outline adminNavAddBtn" onClick={() => addGroup(sIdx)}>
                        + Koox cusub
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}