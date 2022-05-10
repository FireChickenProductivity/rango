import { getClickableType, hasTextNodesChildren } from "../lib/dom-utils";
import { displayHints } from "./hints";
import { onIntersection, onAttributeMutation } from "./intersectors";

// *** INTERSECTION OBSERVER ***

const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0,
};

export const intersectionObserver = new IntersectionObserver(
	async (entries) => {
		for (const entry of entries) {
			onIntersection(entry.target, entry.isIntersecting);
		}

		await displayHints();
	},
	options
);

// *** MUTATION OBSERVER ***

const config = { attributes: true, childList: true, subtree: true };
const mutationObserver = new MutationObserver(async (mutationList) => {
	let updateHints = false;
	for (const mutationRecord of mutationList) {
		if (mutationRecord.type === "childList") {
			for (const node of mutationRecord.addedNodes as NodeListOf<Node>) {
				if (
					node.nodeType === 1 &&
					!(node as Element).id.includes("rango-hints-container") &&
					!(node as Element).parentElement?.id.includes("rango-hints-container")
				) {
					maybeObserveIntersection(node as Element);
					updateHints = true;
				}
			}
			// We don't care too much about removed nodes. I think it's going to be more expensive
			// to remove them from our list of our observed elements than to do nothing
		}

		if (mutationRecord.type === "attributes") {
			const hintsContainer = document.querySelector("#rango-hints-container");
			if (!hintsContainer?.contains(mutationRecord.target)) {
				// The function onAttributeMutation returns true if there is a change to
				// the visibility or clickability of elements
				updateHints = onAttributeMutation(mutationRecord.target as Element);
			}
		}
	}

	if (updateHints) {
		await displayHints();
	}
});

// We observe document instead of document.body in case the body gets replaced
mutationObserver.observe(document, config);

function maybeObserveIntersection(element: Element) {
	const elementAndDescendants = [element, ...element.querySelectorAll("*")];
	for (const elementToAdd of elementAndDescendants) {
		const clickableType = getClickableType(elementToAdd);
		if (clickableType || hasTextNodesChildren(elementToAdd)) {
			intersectionObserver.observe(elementToAdd);
		}
	}
}

export default function observe() {
	// We observe all the initial elements before any mutation
	if (document.readyState === "complete") {
		maybeObserveIntersection(document.body);
		displayHints().catch((error) => {
			console.log(error);
		});
	} else {
		window.addEventListener("load", () => {
			maybeObserveIntersection(document.body);
			displayHints().catch((error) => {
				console.log(error);
			});
		});
	}
}