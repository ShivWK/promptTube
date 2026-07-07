export default function calcUploadTime(time) {
    const seconds = Math.floor((Date.now() - new Date(time)) / 1000);

    const intervals = [
        ["year", 31536000],
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
    ];

    if (seconds < 60) return "Just now";

    for (const [unit, value] of intervals) {
        const count = Math.floor(seconds / value);

        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }
}