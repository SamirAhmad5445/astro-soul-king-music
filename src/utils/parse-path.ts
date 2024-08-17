export const slugify = (s: string): string => s.replace(/\s+/g, "-");

export const deslugify = (s: string): string => s.replace(/-/g, " ");
