interface RangoActionWithoutTargetWithoutArg {
	type:
		| "closeOtherTabsInWindow"
		| "closeTabsToTheLeftInWindow"
		| "closeTabsToTheRightInWindow"
		| "cloneCurrentTab"
		| "moveCurrentTabToNewWindow"
		| "focusPreviousTab"
		| "unhoverAll"
		| "copyCurrentTabMarkdownUrl"
		| "scrollUpAtElement"
		| "scrollDownAtElement"
		| "scrollLeftAtElement"
		| "scrollRightAtElement"
		| "displayExtraHints"
		| "displayExcludedHints"
		| "displayLessHints"
		| "toggleHints"
		| "toggleKeyboardClicking"
		| "enableHintsNavigation"
		| "disableHintsNavigation"
		| "excludeSingleLetterHints"
		| "includeSingleLetterHints"
		| "refreshHints"
		| "refreshHintsOnIdle"
		| "updateHintsStyle"
		| "updateHintsStyleOnIdle"
		| "updateHintsEnabled"
		| "updateHintsEnabledOnIdle"
		| "enableUrlInTitle"
		| "disableUrlInTitle"
		| "increaseHintSize"
		| "decreaseHintSize"
		| "includeOrExcludeMoreSelectors"
		| "includeOrExcludeLessSelectors"
		| "confirmSelectorsCustomization"
		| "resetCustomSelectors";
}

interface RangoActionWithoutTargetWithStringArg {
	type:
		| "copyLocationProperty"
		| "setHintStyle"
		| "setHintWeight"
		| "enableHints"
		| "disableHints"
		| "resetToggleLevel";
	arg: string;
}

interface RangoActionWithoutTargetWithNumberArg {
	type:
		| "closeTabsLeftEndInWindow"
		| "closeTabsRightEndInWindow"
		| "closePreviousTabsInWindow"
		| "closeNextTabsInWindow";
	arg: number;
}

interface RangoActionWithTargetWithOptionalNumberArg {
	type:
		| "scrollUpAtElement"
		| "scrollDownAtElement"
		| "scrollLeftAtElement"
		| "scrollRightAtElement";
	target: string;
	arg?: number;
}

interface RangoActionWithoutTargetWithOptionalNumberArg {
	type:
		| "scrollUpPage"
		| "scrollDownPage"
		| "scrollLeftPage"
		| "scrollRightPage"
		| "scrollUpLeftAside"
		| "scrollDownLeftAside"
		| "scrollUpRightAside"
		| "scrollDownRightAside";
	arg?: number;
}

interface RangoActionWithSingleTarget {
	type:
		| "scrollElementToTop"
		| "scrollElementToBottom"
		| "scrollElementToCenter";
	target: string;
}

interface RangoActionWithMultipleTargets {
	type:
		| "openInBackgroundTab"
		| "clickElement"
		| "directClickElement"
		| "openInNewTab"
		| "copyLink"
		| "copyMarkdownLink"
		| "copyElementTextContent"
		| "showLink"
		| "hoverElement"
		| "includeExtraSelectors"
		| "excludeExtraSelectors";
	target: string[];
}

export type RangoActionWithTarget =
	| RangoActionWithSingleTarget
	| RangoActionWithMultipleTargets
	| RangoActionWithTargetWithOptionalNumberArg;

export type RangoActionWithoutTarget =
	| RangoActionWithoutTargetWithoutArg
	| RangoActionWithoutTargetWithStringArg
	| RangoActionWithoutTargetWithNumberArg
	| RangoActionWithoutTargetWithOptionalNumberArg;

export type RangoAction = RangoActionWithTarget | RangoActionWithoutTarget;
