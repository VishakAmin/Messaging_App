import { useState, useEffect } from 'react';

const PREFIX = "whatsapp-clone-";

const useLocalStorage = (key, intialValue) => {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof intialValue === 'function') {
            return intialValue()
        }
        else {
            return intialValue
        }

    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}

export default useLocalStorage
