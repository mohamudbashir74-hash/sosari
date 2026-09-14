import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function PartnerPage() {
  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    position: "",
    email: "",
    workType: "",
    inquiryDetails: "",
    website: "",
    phone: "",
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const workOptions = [
    "Research Partnership",
    "Data & Statistics",
    "Monitoring & Evaluation",
    "Policy & Advisory",
    "Technical Assistance",
    "Consultancy",
    "Training & Capacity Building",
    "Joint Project / Consortium",
    "Academic Collaboration",
    "Funding / Grant Partnership",
    "Other",
  ];

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleFile(e) {
    setFile(e.target.files?.[0] || null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.organization ||
      !form.position ||
      !form.email ||
      !form.workType ||
      !form.inquiryDetails
    ) {
      return;
    }

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
        fullName: form.fullName,
        organization: form.organization,
        position: form.position,
        email: form.email,
        workType: form.workType,
        inquiryDetails: form.inquiryDetails,
        website: form.website || "",
        phone: form.phone || "",
        fileUrl,
        fileName,
        createdAt: serverTimestamp(),
        createdAtMs: Date.now(),
        read: false,
      });

      setStatus("sent");
      setForm({
        fullName: "",
        organization: "",
        position: "",
        email: "",
        workType: "",
        inquiryDetails: "",
        website: "",
        phone: "",
      });
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
          <div className="eyebrow">WORK WITH SOSARI</div>
          <h1>Tell us about your inquiry or proposed collaboration.</h1>
        </div>
      </header>

      <section>
        <div className="wrap" style={{ maxWidth: 640 }}>
          {status === "sent" ? (
            <div className="box">
              <h3>Mahadsanid!</h3>
              <p>
                Codsigaaga waa la helay. Kooxda SOSARI ayaa dhawaan kula soo
                xiriiri doonta.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partnerForm">
              <label>
                <span>
                  Full Name<span className="req">*</span>
                </span>
                <input
                  required
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </label>

              <label>
                <span>
                  Organization / Institution<span className="req">*</span>
                </span>
                <input
                  required
                  placeholder="Enter organization or institution"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                />
              </label>

              <label>
                <span>
                  Position / Title<span className="req">*</span>
                </span>
                <input
                  required
                  placeholder="Enter your position"
                  value={form.position}
                  onChange={(e) => update("position", e.target.value)}
                />
              </label>

              <label>
                <span>
                  Email Address<span className="req">*</span>
                </span>
                <input
                  required
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </label>

              <label>
                <span>
                  How would you like to work with SOSARI?<span className="req">*</span>
                </span>
                <select
                  required
                  value={form.workType}
                  onChange={(e) => update("workType", e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {workOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>
                  Tell us about your inquiry or proposed collaboration.
                  <span className="req">*</span>
                </span>
                <textarea
                  required
                  rows={5}
                  placeholder="Please briefly describe your area of interest, needs, or proposed collaboration"
                  value={form.inquiryDetails}
                  onChange={(e) => update("inquiryDetails", e.target.value)}
                />
              </label>

              <label>
                <span>
                  Upload ToR / Concept Note / Relevant Document{" "}
                  <span className="optional">(Optional)</span>
                </span>
                <input
                  type="file"
                  onChange={handleFile}
                  accept=".pdf,.doc,.docx"
                />
                {file && <span className="fileChosen">{file.name}</span>}
              </label>

              <label>
                <span>
                  Organization Website <span className="optional">(Optional)</span>
                </span>
                <input
                  type="url"
                  placeholder="Enter website"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>

              <label>
                <span>
                  Phone / WhatsApp <span className="optional">(Optional)</span>
                </span>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </label>

              <button
                className="btn primary"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "SUBMIT INQUIRY"}
              </button>
              {status === "error" && (
                <p style={{ color: "crimson" }}>
                  Wax baa qaldamay. Isku day mar kale.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}