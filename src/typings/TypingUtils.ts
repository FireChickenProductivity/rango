import { FocusOnClickInput } from "./FocusOnClickInput";

export function assertDefined<T>(
	value: T | null | undefined
): asserts value is T {
	if (value === null || value === undefined) {
		throw new Error(`Fatal error: value must not be null/undefined.`);
	}
}

export function isPromiseFulfilledResult<T>(
	result: PromiseSettledResult<T>
): result is PromiseFulfilledResult<T> {
	return result.status === "fulfilled";
}

export function isFocusOnClickInput(
	element: Element
): element is FocusOnClickInput {
	return (
		element instanceof HTMLInputElement &&
		![
			"button",
			"checkbox",
			"color",
			"file",
			"hidden",
			"image",
			"radio",
			"reset",
			"submit",
		].includes(element.type)
	);
}

export function hasDisabled(
	element: Element
): element is
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLOptionElement
	| HTMLButtonElement
	| HTMLSelectElement {
	return (
		element instanceof HTMLInputElement ||
		element instanceof HTMLTextAreaElement ||
		element instanceof HTMLOptionElement ||
		element instanceof HTMLButtonElement ||
		element instanceof HTMLSelectElement
	);
}
