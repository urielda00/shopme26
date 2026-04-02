export const getImageUrl = (image?: string) => {
    if (!image) return '';

    // If it is already a full external URL, return it as is
    if (image.startsWith('http')) return image;

    // Get the backend URL from environment or default to localhost:5000
    const backendUrl = import.meta.env.VITE_BASE_BACK_URL || 'http://localhost:5000';
    
    try {
        // Extract just the origin (e.g., 'http://localhost:5000') ignoring any '/api' paths
        const urlObj = new URL(backendUrl);
        const serverBase = urlObj.origin; 
        
        // Construct the final URL using the path exactly as it is in the DB
        return `${serverBase}${image.startsWith('/') ? image : `/${image}`}`;
    } catch (error) {
        // Fallback in case the URL parsing fails
        return `http://localhost:5000${image.startsWith('/') ? image : `/${image}`}`;
    }
};