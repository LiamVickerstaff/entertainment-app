export async function apiFetchWrapper<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const fetchBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  try {
    const res = await fetch(`${fetchBaseUrl}${endpoint}`, options);

    if (!res.ok) {
      let errorMessage = "Failed Request";
      try {
        const data = await res.json();
        if (data?.error) errorMessage = data.error;
      } catch (error) {
        console.log(error);
      }
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error(`API fetch error: `, error);
    throw error;
  }
}
