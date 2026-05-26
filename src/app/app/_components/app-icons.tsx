export function CalendarColorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 48 48"
      className={className}
    >
      <rect x="8" y="10" width="32" height="30" rx="9" fill="#fffdf7" />
      <rect
        x="8"
        y="10"
        width="32"
        height="30"
        rx="9"
        fill="#fffdf7"
        stroke="#8aa79a"
        strokeWidth="2.5"
      />
      <path d="M9.5 19h29" stroke="#8aa79a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 7v7M31 7v7" stroke="#34352f" strokeWidth="3" strokeLinecap="round" />
      <circle cx="17" cy="27" r="3.2" fill="#d8c49f" />
      <circle cx="25" cy="27" r="3.2" fill="#8aa79a" />
      <circle cx="31" cy="34" r="3.2" fill="#cfe8dc" />
    </svg>
  );
}
