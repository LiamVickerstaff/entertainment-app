export async function apiFetchWrapper<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}${endpoint}`;

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`API fetch error: ${res.status} - ${errorMessage}`);
    }
    return res.json();
  } catch (error) {
    console.error(`API fetch error: `, error);
    throw error;
  }
}
