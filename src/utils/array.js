const filterAndCombine = items => {
    const arr = new Map()

    items?.forEach(item => {
        if (arr.has(item.id)) {
            arr.get(item.id).count += 1
        } else {
            arr.set(item.id, {...item, count: 1})
        }
    })

    return Array.from(arr.values())
}

const updateCountById = (books, id, increment = true) => {
    const updatedBooks = books.map(book => {
        if (book.id === id) {
            return {
                ...book,
                count: increment ? book.count + 1 : (book.count > 1) && book.count - 1
            }
        }
        return book
    })

    return updatedBooks
}

export {
    filterAndCombine,
    updateCountById
}
