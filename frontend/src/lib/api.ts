const API_BASE_URL = "http://localhost:8080/api/v1";

export async function ingestLog(content: string) {
    const response = await fetch(`${API_BASE_URL}/worklogs/ingest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        throw new Error("Failed to ingest log");
    }
}

// In a real app, work logs would likely be fetched by date range or ID.
// For MVP, we fetch all.
export async function getWorkLogs() {
    const response = await fetch(`${API_BASE_URL}/worklogs`, {
        cache: "no-store", // Ensure fresh data
    });
    if (!response.ok) {
        throw new Error("Failed to fetch work logs");
    }
    return response.json();
}

export async function generateWorkLog(date?: string) {
    // If date is provided, append as query param
    const url = date
        ? `${API_BASE_URL}/worklogs/generate?date=${date}`
        : `${API_BASE_URL}/worklogs/generate`;

    const response = await fetch(url, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to generate work log");
    }
    return response.json();
}
