"use client";

type IconName =
  | "search"
  | "arrow"
  | "export"
  | "tag"
  | "note"
  | "user"
  | "bot"
  | "wand";

type Props = {
  name: IconName;
  className?: string;
};

export default function Icon({ name, className = "w-4 h-4" }: Props) {
  const common = className;

  if (name === "search")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    );

  if (name === "arrow")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 17l5-5-5-5" />
      </svg>
    );

  if (name === "export")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v12" />
        <path d="M8 7l4-4 4 4" />
        <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
      </svg>
    );

  if (name === "tag")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-8.2-8.2V4h8.2l8.2 8.2a2 2 0 0 1 0 2.8z" />
        <path d="M7 7h.01" />
      </svg>
    );

  if (name === "note")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h6" />
      </svg>
    );

  if (name === "user")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

  if (name === "bot")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="8" width="12" height="10" rx="2" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        <path d="M10 13h.01" />
        <path d="M14 13h.01" />
      </svg>
    );

  if (name === "wand")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 4l5 5" />
        <path d="M13 6l5 5" />
        <path d="M4 20l9-9" />
        <path d="M3 14l7 7" />
        <path d="M14 3l7 7" />
      </svg>
    );

  return null;
}