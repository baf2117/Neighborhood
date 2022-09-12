const http = async <T>(request: RequestInfo): Promise<T> => {
    const response = await fetch(request);
    try {
        const body = await response.json();
        return body;
    } catch (ex) { }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return null as any;
}

export { http };