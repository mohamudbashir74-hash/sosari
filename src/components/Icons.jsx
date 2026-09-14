// Small inline SVG icon set (stroke-based, currentColor) used across the
// navbar and the home hero. No external icon package required.

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconWhatsApp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.71 14.02c-.24.68-1.19 1.24-1.94 1.4-.53.11-1.22.2-3.57-.76-2.99-1.23-4.92-4.25-5.07-4.45-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.17 1.03-2.47.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.6.83 2.08.9 2.23.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.76-.89.97-1.19.2-.3.4-.25.68-.15.27.1 1.75.83 2.05.98.3.15.5.22.57.35.07.13.07.75-.17 1.43z" />
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconChart(props) {
  return (
    <svg {...base} {...props}>
      <line x1="4" y1="20" x2="4" y2="12" />
      <line x1="10" y1="20" x2="10" y2="6" />
      <line x1="16" y1="20" x2="16" y2="15" />
      <line x1="22" y1="20" x2="22" y2="9" />
    </svg>
  );
}

export function IconUsers(props) {
  return (
    <svg {...base} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconDoc(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

export function IconBulb(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.5.4.8 1 .8 1.6V17h6.4v-.7c0-.6.3-1.2.8-1.6A7 7 0 0 0 12 2Z" />
    </svg>
  );
}

export function IconDb(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 5v6c0 1.66-4.03 3-9 3s-9-1.34-9-3V5" />
      <path d="M21 11v6c0 1.66-4.03 3-9 3s-9-1.34-9-3v-6" />
    </svg>
  );
}

export function IconGlobe(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

export function IconArrow(props) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconFlask(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function IconInstitution(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2 2 8h20L12 2Z" />
      <line x1="4" y1="8" x2="4" y2="20" />
      <line x1="9" y1="8" x2="9" y2="20" />
      <line x1="15" y1="8" x2="15" y2="20" />
      <line x1="20" y1="8" x2="20" y2="20" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

export function IconChat(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

export function IconHome(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

export function IconChevronRight(props) {
  return (
    <svg {...base} {...props}>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export function IconFacebook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 9h3V5.6c-.5-.07-2.2-.22-3.2-.22-3.4 0-4.8 2.1-4.8 4.7V12H6v4h3v8h4v-8h3.4l.6-4H13V10.4c0-.9.2-1.4 1-1.4Z" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg {...base} {...props}>
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );
}

export function IconLinkedIn(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 17v-4a2.2 2.2 0 0 1 4.4 0v4" />
      <line x1="11" y1="10" x2="11" y2="17" />
    </svg>
  );
}

export function IconYoutube(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <polygon points="10.5 9.5 15.5 12 10.5 14.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTelegram(props) {
  return (
    <svg {...base} {...props}>
      <path d="m21 4-18.4 7.2c-.8.3-.8 1.5.1 1.7l4.6 1.3 1.7 5.4c.2.7 1.1.9 1.6.4l2.6-2.5 4.6 3.4c.7.5 1.7.1 1.8-.7L22 4.9c.1-.7-.6-1.2-1-1Z" />
      <path d="M8.3 14.2 18 6.5" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconHandshake(props) {
  return (
    <svg {...base} {...props}>
      <path d="m11 12 2.5 2.5a1.5 1.5 0 0 0 2.12-2.12L13.5 10" />
      <path d="m8.5 15 1.5 1.5a1.5 1.5 0 0 0 2.12-2.12" />
      <path d="M2 10.5 6 6l4.5 1.5L13 5l4 2 5 3.5-3 3.5-3-2-4 4-2-1-3.5 3.5L2 14Z" />
    </svg>
  );
}

export function IconDownload(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12" />
      <polyline points="7 10 12 15 17 10" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function IconHeart(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-4.35-9.5-8.8C.9 8.6 2.2 5 5.6 4.3 8 3.8 10 5 12 7.5 14 5 16 3.8 18.4 4.3 21.8 5 23.1 8.6 21.5 12.2 19 16.65 12 21 12 21Z" />
    </svg>
  );
}

export function IconFork(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2v8a2 2 0 0 0 4 0V2" />
      <path d="M8 10v12" />
      <path d="M17 2c-1.5 1-2 3-2 5 0 2.2 1.3 3.5 2 4v11" />
    </svg>
  );
}

export function IconGradCap(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 8 12 3l10 5-10 5-10-5Z" />
      <path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" />
      <path d="M22 8v6" />
    </svg>
  );
}

export function IconDroplet(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z" />
    </svg>
  );
}

export function IconLeaf(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4C10 4 4 10 4 18v2h2c8 0 14-6 14-16Z" />
      <path d="M6 20c4-4 8-8 14-14" />
    </svg>
  );
}

export function IconTree(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2 6 11h3l-4 6h5v5h4v-5h5l-4-6h3Z" />
    </svg>
  );
}

export function IconSprout(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V11" />
      <path d="M12 11c0-4-3-6-7-6 0 4 3 7 7 7Z" />
      <path d="M12 8c0-3 2.5-5 6-5 0 3.5-2.5 6-6 6Z" />
    </svg>
  );
}

export function IconMountain(props) {
  return (
    <svg {...base} {...props}>
      <path d="m3 20 6-11 4 6 2-3 6 8Z" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  );
}

export function IconScale(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="m5 8-3 6a3.5 3.5 0 0 0 6 0Z" />
      <path d="m19 8-3 6a3.5 3.5 0 0 0 6 0Z" />
      <path d="M8 21h8" />
    </svg>
  );
}

export function IconHouse(props) {
  return (
    <svg {...base} {...props}>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function IconShuffle(props) {
  return (
    <svg {...base} {...props}>
      <path d="m16 3 5 4-5 4" />
      <path d="M4 7h6c1.5 0 2 .5 3 2l4 6c1 1.5 1.5 2 3 2h1" />
      <path d="m16 21 5-4-5-4" />
      <path d="M4 17h6c1.5 0 2-.5 3-2" />
    </svg>
  );
}

export function IconBird(props) {
  return (
    <svg {...base} {...props}>
      <path d="M22 5c-1 1-2 1.3-3.4 1.3C17.6 3.6 15.3 2 12.5 2c-3 0-5 2-5 4.5 0 .5.06 1 .2 1.4C4 8.3 2 10.5 2 13c1 0 2-.3 2.7-1-0.2 3 1.5 7 6.8 8-1-1-1.5-2-1.8-3.2 1.3 1 3 1.4 4.6 1 2.6-.7 4.2-3 4.5-5.4.06-.4.1-.9.1-1.4 1.3-.6 2.5-1.7 3.1-3Z" />
    </svg>
  );
}

export function IconBriefcase(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M2 13h20" />
    </svg>
  );
}

export function IconGear(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

export function IconCoins(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="9" cy="7" rx="6" ry="3.2" />
      <path d="M3 7v5c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2V7" />
      <path d="M3 12v5c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-5" />
      <ellipse cx="17" cy="10.5" rx="4.3" ry="2.2" />
    </svg>
  );
}