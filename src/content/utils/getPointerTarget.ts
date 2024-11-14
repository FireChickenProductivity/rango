import { getWrapperForElement } from "../wrappers/wrappers";
import { getElementCenter } from "./cssomUtils";

export function getPointerTarget(element: Element) {
	const { x, y } = getElementCenter(element);
	const elementsAtPoint = document.elementsFromPoint(x, y);

	for (const elementAt of elementsAtPoint) {
		if (element.contains(elementAt)) {
			let current: Element | null = elementAt;
			let differentWrapper = false;

			while (current && current !== element) {
				const wrapper = getWrapperForElement(current);
				if (
					wrapper?.isHintable &&
					wrapper !== getWrapperForElement(elementAt)
				) {
					differentWrapper = true;
				}

				current = current.parentElement;
			}

			if (!differentWrapper) {
				return elementAt;
			}
		}
	}

	return element;
}
