import { useEffect, useState } from "react";
import {
  collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

export default function AdminPartners() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadItems() {
    setLoading(true);
    try {
      const q = query(collection(db, "partners"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function onFilesChange(e) {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
    setError("");
  }

  async function handleUpload() {
    if (files.length === 0) {
      setError("Fadlan dooro hal ama dhowr sawir (logo).");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let nextOrder = items.length;
      for (const file of files) {
        const path = `content/partners/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        const logoUrl = await getDownloadURL(storageRef);
        await addDoc(collection(db, "partners"), {
          logoUrl,
          logoPath: path,
          order: nextOrder,
          createdAt: serverTimestamp(),
          createdAtMs: Date.now(),
        });
        nextOrder += 1;
      }
      setFiles([]);
      setPreviews([]);
      await loadItems();
    } catch (err) {
      console.error(err);
      setError("Wax baa qaldamay markii la keydinayay. Isku day mar kale.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm("Ma hubtaa inaad tirtirto sawirkan?")) return;
    try {
      await deleteDoc(doc(db, "partners", item.id));
      if (item.logoPath) {
        deleteObject(ref(storage, item.logoPath)).catch(() => {});
      }
      await loadItems();
    } catch (err) {
      console.error(err);
      alert("Tirtiriddu way fashilantay.");
    }
  }

  return (
    <div className="adminPage">
      <h1>Our Partners</h1>
      <p className="lead">
        Halkan waxaad ka maareysaa logo-yada partners-ka ee ku muuqda bogga Home ee "Our Partners".
        Sawirada waxay si toos ah isugu bedelaan (carousel) 3-3. Kaliya sawiro ayaa la soo geliyaa — qoraal looma baahna.
      </p>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div className="adminForm" style={{ marginTop: 16 }}>
        <label>Sawirada Logo-yada (waxaad dooran kartaa dhowr sawir mar keliya)
          <input type="file" accept="image/*" multiple onChange={onFilesChange} />
        </label>

        {previews.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {previews.map((src, i) => (
              <img key={i} src={src} alt="preview" style={{ height: 70, background: "#fff", padding: 6, borderRadius: 8, border: "1px solid #eee" }} />
            ))}
          </div>
        )}

        <div className="adminFormActions">
          <button className="btn primary" type="button" onClick={handleUpload} disabled={saving || files.length === 0}>
            {saving ? "Keydinaya…" : "Keydi"}
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ marginTop: 20 }}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={{ marginTop: 20 }}>Weli lama darin sawir. Sawirada kor ka soo geli.</p>
      ) : (
        <div className="adminList" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 14 }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: "1px solid #eee", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 140 }}>
              {item.logoUrl && (
                <img src={item.logoUrl} alt="Partner" style={{ height: 60, maxWidth: "100%", objectFit: "contain", background: "#fff" }} />
              )}
              <button className="btn outline" style={{ fontSize: 10 }} onClick={() => handleDelete(item)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}