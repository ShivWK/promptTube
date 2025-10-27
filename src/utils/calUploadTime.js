export default function calUploadTime(time) {
    const today = new Date();
    const publishedDate = new Date(time);
    const seconds = Math.floor(today - publishedDate);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    }

    if (seconds < 60) return "just now"

    for (let [key, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);

      if (count >= 1) {
        return `${count} ${key}${count > 1 ? "s" : ""} ago`
      }
    }
  }