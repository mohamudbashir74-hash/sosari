import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function PartnerPage() {
  const [form, setForm] = useState({ nameOrg: "", email: "", inquiry: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleFile(e) {
    setFile(e.target.files?.[0] || null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nameOrg || !form.email || !form.inquiry) return;
    setStatus("sending");
    try {
      let fileUrl = "";
      let fileName = "";
      if (file) {
        const path = `partner-uploads/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
        fileName = file.name;
      }

      await addDoc(collection(db, "messages"), {
        nameOrg: form.nameOrg,
        email: form.email,
        inquiry: form.inquiry,
        fileUrl,
        fileName,
        createdAt: serverTimestamp(),
        createdAtMs: Date.now(),
        read: false,
      });
      setStatus("sent");
      setForm({ nameOrg: "", email: "", inquiry: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="sectionPageWrap">
      <header className="pageHero">
        <div className="wrap">
          <div className="eyebrow">Work with SOSARI</div>
          <h1>Start a conversation.</h1>
          <p>Bring the question. SOSARI can assemble the appropriate methods, expertise and evidence pathway.</p>
        </div>
      </header>

      <section>
        <div className="wrap" style={{ maxWidth: 640 }}>
          {status === "sent" ? (
            <div className="box">
              <h3>Mahadsanid!</h3>
              <p>Codsigaaga waa la helay. Kooxda SOSARI ayaa dhawaan kula soo xiriiri doonta.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partnerForm">
              <div className="eyebrow2" style={{ marginBottom: 4 }}>Work with SOSARI — Inquiry</div>

              <label>
                <span>Full Name / Organization <span className="req">*</span></span>
                <input required value={form.nameOrg} onChange={(e) => update("nameOrg", e.target.value)} />
              </label>
              <label>
                <span>Email Address <span className="req">*</span></span>
                <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </label>
              <label>
                <span>Briefly Describe Your Inquiry / Area of Interest <span className="req">*</span></span>
                <textarea required rows={6} value={form.inquiry} onChange={(e) => update("inquiry", e.target.value)} />
              </label>
              <label>
                <span>Upload ToR / Relevant Document <span className="optional">(Optional)</span></span>
                <input type="file" onChange={handleFile} accept=".pdf,.doc,.docx" />
                {file && <span className="fileChosen">{file.name}</span>}
              </label>

              <button className="btn primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Submit Inquiry"}
              </button>
              {status === "error" && <p style={{ color: "crimson" }}>Wax baa qaldamay. Isku day mar kale.</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}