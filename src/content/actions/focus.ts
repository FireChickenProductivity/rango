import { type ElementWrapper } from "../../typings/ElementWrapper";
import { notify } from "../notify/notify";
import { dispatchKeyDown, dispatchKeyUp } from "../utils/dispatchEvents";
import { editableElementSelector, getFocusable } from "../utils/domUtils";
import { getOrCreateWrapper } from "../wrappers/ElementWrapperClass";

/**
 * Focus an element. Returns a boolean indicating if a focus was performed.
 */
export function focus(wrapper: ElementWrapper) {
	window.focus();

	if (document.activeElement) {
		dispatchKeyDown(document.activeElement, "Tab");
	}

	const focusable = getFocusable(wrapper.element);

	if (focusable instanceof HTMLElement) {
		focusable.focus({ focusVisible: true });
		dispatchKeyUp(focusable, "Tab");
		return true;
	}

	return false;
}

export async function focusFirstInput() {
	const firstInput = document.querySelector(editableElementSelector);

	if (!firstInput) {
		await notify("No input found", { type: "error" });
		return;
	}

	focus(getOrCreateWrapper(firstInput));
}

export function blur() {
	if (document.activeElement instanceof HTMLElement) {
		document.activeElement.blur();
	}
}
