export interface Yields {
    Date: string;
    Terms: string[];
    Yields: number[];
}

export async function getYields(): Promise<Yields> {
    const res = await fetch("/api/yields")
    if (!res.ok) {
        throw new Error("Received bad network response from server.")
    }
    const json = await res.json() as Yields;
    return json
}