import { Link } from "react-router-dom";
import { FOOTER_NAV } from "../config/navigation";
import logo2 from "../assets/logo2.png";
import { IconWhatsApp, IconFacebook, IconLinkedIn } from "./Icons";

const WHATSAPP_LINK = "https://wa.me/252612880114";
const FACEBOOK_LINK = "https://www.facebook.com/share/1adtVKQ2KX/";
const LINKEDIN_LINK = "https://www.linkedin.com/company/somali-statistics-and-research-institute-sosari/";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="foot">
        <div>
          <div className="brand">
            <img className="official-logo footer-logo" src={logo2} alt="SOSARI — Somali Statistics and Research Institute" />
          </div>
          <p style={{ fontSize: 11, color: "#9bb0bd" }}>Evidence. Data. Policy. Impact.</p>

          <div className="footerSocial">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="footerSocialBtn footerSocialWhatsapp" aria-label="WhatsApp">
              <IconWhatsApp />
            </a>
            <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="footerSocialBtn footerSocialFacebook" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className="footerSocialBtn footerSocialLinkedin" aria-label="LinkedIn">
              <IconLinkedIn />
            </a>
          </div>
        </div>

        {FOOTER_NAV.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            {col.items.map((it) =>
              it.key === "__partner__" ? (
                <Link key={it.label} to="/partner">{it.label}</Link>
              ) : (
                <Link key={it.label} to={`/section/${it.key}`}>{it.label}</Link>
              )
            )}
          </div>
        ))}
      </div>
      <div className="copy">
        © {new Date().getFullYear()} Somali Statistics and Research Institute (SOSARI). All rights reserved.
        &nbsp; • &nbsp; Privacy &nbsp; • &nbsp; Research Ethics &nbsp; • &nbsp; Safeguarding &nbsp; • &nbsp; Accessibility
        &nbsp; • &nbsp; <Link to="/admin/login" style={{ color: "#5a7180" }}>Admin</Link>
      </div>
    </footer>
  );
}