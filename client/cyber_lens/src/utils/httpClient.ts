import { getOrCreateAnonymousClientId } from "./anonymousClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequestOptions extends RequestInit {
  method?: HttpMethod;
}

function buildHeaders(clientId: string, headers?: HeadersInit): Headers {
  const merged = new Headers(headers ?? {});
  merged.set("X-Client-ID", clientId);
  return merged;
}

export async function httpRequest(
  path: string,
  options: HttpRequestOptions = {}
): Promise<Response> {
  const clientId = getOrCreateAnonymousClientId();
  const headers = buildHeaders(clientId, options.headers);
  const requestInit: RequestInit = {
    ...options,
    headers,
  };

  return fetch(`${API_BASE_URL}${path}`, requestInit);
}

export async function httpJson<T = unknown>(
  path: string,
  options: HttpRequestOptions = {}
): Promise<T> {
  const response = await httpRequest(path, options);

  if (!response.ok) {
    const message = await safeReadErrorMessage(response);
    throw new Error(message ?? `Request to ${path} failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function safeReadErrorMessage(response: Response): Promise<string | null> {
  try {
    const data = await response.json();
    if (data && typeof data.error === "string") {
      return data.error;
    }
  } catch (_error) {
 
  }
  return response.statusText || null;
}
