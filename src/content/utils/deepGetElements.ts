// This function retrieves all Elements starting from root, including those
// inside shadow DOMs or even nested shadow DOMs
export function deepGetElements(
	root: Element,
	includeRoot = true,
	selector = ":not(.rango-hint-wrapper, .rango-hint, #rango-copy-paste-area)"
): Element[] {
	const all = root.shadowRoot
		? root.shadowRoot.querySelectorAll("*")
		: root.querySelectorAll("*");
	const result = includeRoot ? [root] : [];

	// This branch is more expensive so we only do it if some elements have
	// shadowRoot
	if ([...all].some((element) => element.shadowRoot)) {
		const elements = root.shadowRoot
			? [...root.shadowRoot.querySelectorAll("*")]
			: [...root.querySelectorAll("*")];

		for (const element of elements) {
			if (element.shadowRoot) {
				result.push(...deepGetElements(element));
			} else {
				result.push(element);
			}
		}

		return result.filter((element) => {
			let matches;
			try {
				matches = element.matches(selector);
			} catch (error: unknown) {
				// This handles cases of invalid selectors
				if (error instanceof DOMException) {
					matches = false;
				}
			}

			return matches;
		});
	}

	const filtered = root.shadowRoot
		? root.shadowRoot.querySelectorAll(selector)
		: root.querySelectorAll(selector);
	result.push(...filtered);
	return result;
}
