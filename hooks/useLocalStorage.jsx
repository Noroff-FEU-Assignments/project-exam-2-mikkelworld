import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
	// Error handling for non-browser environments
	if (typeof window == "undefined") {
		return [defaultValue, null];
	}

	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get an item from localStorage
			const item = localStorage.getItem(key);
			// Parse value to JSON. Else return default
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.error(error);
			return defaultValue;
		}
	});

	const setValue = (value) => {
		try {
			// Get value to store as return value of provided function or as provided value
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Set the stored value state
			setStoredValue(valueToStore);
			// Stringify it and save it to localStorage
			localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}
