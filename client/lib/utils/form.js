export function normalizeEmptyFormValue(value) {
	if(!value) {
		return undefined;
	}

	return value;
}