const STOP_WORDS = new Set(["the", "a", "an", "and", "or", "for", "to", "of", "in", "on", "with", "how", "what", "is", "are", "from", "your", "you", "my", "this", "that"]);

const normalizeText = (text = "") => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

const tokenize = (text = "") => {
    return normalizeText(text)
        .split(" ")
        .filter(word => word && !STOP_WORDS.has(word));
};

export const calculateTextRelevance = (query, text = "") => {
    const queryWords = [...new Set(tokenize(query))];
    const textWords = new Set(tokenize(text));

    if (!queryWords.length || !textWords.size) {
        return 0;
    }

    const matchedWords = queryWords.filter(word =>
        textWords.has(word)
    );

    return matchedWords.length / queryWords.length;
};

export const calculateTitleRelevance = (query, title = "") => {
    const queryWords = [...new Set(tokenize(query))];
    const normalizedTitle = normalizeText(title);

    if (!queryWords.length || !normalizedTitle) {
        return 0;
    }

    let score = 0;

    for (const word of queryWords) {
        if (normalizedTitle.includes(word)) {
            score += 1;
        }
    }

    return Math.min(score / queryWords.length, 1);
};