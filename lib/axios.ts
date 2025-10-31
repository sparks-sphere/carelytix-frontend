import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 (unauthorized) and we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token-user`,
          {},
          { withCredentials: true },
        );
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
      }
    }

    return Promise.reject(error);
  },
);
