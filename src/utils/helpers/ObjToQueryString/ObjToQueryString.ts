function objectToQueryString(params?: Record<string, string | null>) {
    if (!params) return ''
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ? value : "")}`)
        .join('&')
}

export {
    objectToQueryString
}