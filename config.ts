// In development, the proxy in vite.config.ts will handle /api requests to localhost:3001
// In production, the API is served from the same origin
export const API_BASE_URL = '';

export const getImageUrl = (path: string) => {
    if (!path) return '';
    // If path is already absolute (starts with http), return it
    if (path.startsWith('http')) return path;
    // Otherwise prepend API_BASE_URL (which is empty string, so just returns relative path)
    return `${API_BASE_URL}${path}`;
};
