import { useEffect, useState } from 'react';

export const useCountdown = (targetDateStr) => {
    const calculateTimeLeft = () => {
        if (!targetDateStr) return null;

        const now = new Date();
        const target = new Date(targetDateStr);

        if (isNaN(target)) return null; // Invalid date

        const diffMs = target - now;
        if (diffMs <= 0) return "Expired";

        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        if (!targetDateStr || isNaN(new Date(targetDateStr))) return;

        const timer = setInterval(() => {
            const updated = calculateTimeLeft();
            setTimeLeft(updated);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDateStr]);

    if (!targetDateStr || isNaN(new Date(targetDateStr))) {
        return "0d 00h 00m 00s";
    }

    return timeLeft || "Expired";
};
