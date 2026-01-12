const STORAGE_KEY = "anonymous-client-id";
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStoredId(): string | null {
  if (!isBrowser()) return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && UUID_V4_REGEX.test(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("unable to read id from storage", error);
  }
  return null;
}

function persistId(id: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch (error) {
    console.warn("unable to persist id to storage", error);
  }
}

function generateUuidV4(): string {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    if (typeof crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

      const byteToHex = (byte: number) => byte.toString(16).padStart(2, "0");
      const hex = Array.from(bytes, byteToHex).join("");

      return [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20),
      ].join("-");
    }
  }

 
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function getOrCreateAnonymousClientId(): string {
  const existing = readStoredId();
  if (existing) {
    return existing;
  }

  const newId = generateUuidV4();
  persistId(newId);
  return newId;
}
