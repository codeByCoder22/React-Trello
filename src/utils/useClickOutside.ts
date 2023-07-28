import { useEffect, RefObject } from "react";

type EventListener = (event: MouseEvent | TouchEvent) => void;

export default function useClickOutside(
    ref: RefObject<HTMLElement>,
    callback: EventListener
) {
    useEffect(() => {
        const handleClickOutside: EventListener = (event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, callback]);
}
