/**
 * Team Avatar Placeholder Generator
 *
 * This utility generates placeholder avatars for team members who don't have photos yet.
 * Each avatar is unique based on the member's name, using consistent colors and initials.
 */

export function generateAvatarUrl(name: string, size: number = 400): string {
  // Generate a consistent color based on name
  const colors = [
    "#10b981", // green
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#06b6d4", // cyan
    "#ec4899", // pink
    "#84cc16", // lime
    "#6366f1", // indigo
    "#ef4444", // red
    "#0ea5e9", // sky
    "#f97316", // orange
  ];

  // Simple hash function to get consistent color
  const hash = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  const color = colors[hash % colors.length];
  const colorCode = color.replace("#", "");

  // Get initials
  const nameParts = name.trim().split(" ");
  const initials = nameParts
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Use UI Avatars API for consistent, professional avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&size=${size}&background=${colorCode}&color=ffffff&bold=true&format=svg`;
}

/**
 * Alternative: Generate a simple gradient placeholder
 */
export function generateGradientPlaceholder(name: string): string {
  const gradients = [
    "from-green-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-yellow-400 to-red-500",
    "from-blue-400 to-cyan-500",
    "from-pink-400 to-rose-500",
    "from-lime-400 to-green-500",
    "from-indigo-400 to-purple-500",
    "from-red-400 to-orange-500",
  ];

  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

/**
 * Get member photo with fallback
 */
export function getMemberPhoto(
  photo: string | undefined,
  name: string
): string {
  if (photo && photo !== "") {
    return photo;
  }

  // Use UI Avatars as fallback
  return generateAvatarUrl(name);
}

/**
 * Preload avatar images
 */
export function preloadAvatars(names: string[]): void {
  if (typeof window === "undefined") return;

  names.forEach((name) => {
    const img = new Image();
    img.src = generateAvatarUrl(name);
  });
}
