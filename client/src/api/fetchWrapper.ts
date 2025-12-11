export async function apiFetchWrapper<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const fetchBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  try {
    const res = await fetch(`${fetchBaseUrl}${endpoint}`, options);
    const data = await res.json();

    if (!res.ok) {
      console.log(`Failed fetch at ${endpoint}: ${data.error}`);

      throw new Error(data.error || "Failed Request");
    }
    return data as T;
  } catch (error) {
    console.error(`API fetch error: `, error);
    throw error;
  }
}
