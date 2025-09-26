function objectToQueryString(params?: Record<string, string>) {
    if (!params) return ''
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
}

export {
    objectToQueryString
}