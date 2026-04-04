import type { ThemeType } from "@/types/themes";

export function applyTheme(theme: ThemeType) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "auto") {
    root.classList.add(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
    return;
  }
  root.classList.add(theme);
}

export function getInitials(name: string | undefined) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Rewrites a Cloudinary upload URL to serve a resized, auto-formatted image.
 * Inserts `f_auto,q_auto,w_{size},h_{size},c_fill` before the public_id so the
 * browser receives a tiny image instead of the full-resolution original.
 *
 * @param url  - The raw Cloudinary URL stored in the DB
 * @param size - The rendered pixel size (use 2× for retina, default 72 = 36px @2x)
 */
export function cloudinaryUrl(
  url: string | null | undefined,
  size = 300,
): string | undefined {
  if (!url) return undefined;
  // Cloudinary upload URLs follow: .../image/upload/{optional_transforms}/{public_id}
  return url.replace(
    /\/image\/upload\//,
    `/image/upload/f_auto,q_auto,w_${size},h_${size},c_fill/`,
  );
}

export function getFullName(
  firstName: string | undefined | null,
  lastName: string | undefined | null,
  username?: string | undefined | null,
) {
  return [firstName, lastName].filter(Boolean).join(" ") || username || "";
}
