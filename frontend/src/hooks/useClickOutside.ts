import { useEffect, useRef } from "react";

export const useClickOutside = (onClick: any) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClick();
            }
        }

        document.addEventListener('click', handleClickOutside, { capture: true });

        return () => document.removeEventListener('click', handleClickOutside, { capture: true })
    }, [])

    return ref;
}