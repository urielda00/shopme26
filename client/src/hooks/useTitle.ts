import { useEffect } from 'react';

export const useTitle = (title: string) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = `${title} | ShopMe`;
        
        // Reset title on unmount
        return () => {
            document.title = prevTitle;
        };
    }, [title]);
};