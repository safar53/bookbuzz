const shortenText = (text, length = 10) => {
    const shortened = text.length <= length ? text : text.slice(0, length) + '...'
    return shortened
}

export {
    shortenText
}
