import { Link } from "react-router-dom";
import { FOOTER_NAV } from "../config/navigation";
import logo2 from "../assets/logo2.png";
import {
  IconWhatsApp, IconFacebook, IconLinkedIn, IconYoutube,
  IconInstitution, IconGear, IconDoc, IconChevronRight,
} from "./Icons";

const WHATSAPP_LINK = "https://wa.me/252612880114";
const FACEBOOK_LINK = "https://www.facebook.com/share/1adtVKQ2KX/";
const LINKEDIN_LINK = "https://www.linkedin.com/company/somali-statistics-and-research-institute-sosari/";
const YOUTUBE_LINK = "#";

const COLUMN_ICON = {
  "INSTITUTE": IconInstitution,
  "WORK": IconGear,
  "KNOWLEDGE & ENGAGEMENT": IconDoc,
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerDots" aria-hidden="true" />
      <div className="footerWave" aria-hidden="true" />

      <div className="foot">
        <div className="footBrandCol">
          <div className="footerLogoBadge">
            <img className="official-logo footer-logo" src={logo2} alt="SOSARI — Somali Statistics and Research Institute" />
          </div>
          <h3 className="footerInstituteName">Somali Statistics and Research Institute (SOSARI)</h3>
          <p className="footerTagline">Evidence. Data. Policy. <span>Impact.</span></p>

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
            <a href={YOUTUBE_LINK} target="_blank" rel="noopener noreferrer" className="footerSocialBtn footerSocialYoutube" aria-label="YouTube">
              <IconYoutube />
            </a>
          </div>

          <div className="footerKickerLine" aria-hidden="true" />
          <div className="footerKicker">Research • Policy • A Brighter Somalia</div>
        </div>

        {FOOTER_NAV.map((col) => {
          const ColIcon = COLUMN_ICON[col.title] || IconDoc;
          return (
            <div key={col.title} className="footCol">
              <div className="footColHead">
                <span className="footColIcon"><ColIcon /></span>
                <h4>{col.title}</h4>
              </div>
              {col.items.map((it) =>
                it.key === "__partner__" ? (
                  <Link key={it.label} to="/partner"><IconChevronRight /> {it.label}</Link>
                ) : (
                  <Link key={it.label} to={`/section/${it.key}`}><IconChevronRight /> {it.label}</Link>
                )
              )}
            </div>
          );
        })}

        <div className="footerQuote">
          <p>“Knowledge for a Better Somalia”</p>
          <span className="footerQuoteLine" aria-hidden="true" />
        </div>
      </div>

      <div className="copy">
        <span>
          © {new Date().getFullYear()} Somali Statistics and Research Institute (SOSARI). All rights reserved.
          &nbsp; | &nbsp; Privacy &nbsp; | &nbsp; Research Ethics &nbsp; | &nbsp; Safeguarding &nbsp; | &nbsp; Accessibility
          &nbsp; | &nbsp; <Link to="/admin/login" style={{ color: "#a9c6e6" }}>Admin</Link>
        </span>
        <button
          type="button"
          className="backToTop"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
    </footer>
  );
}