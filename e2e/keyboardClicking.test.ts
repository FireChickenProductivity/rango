import { Key, keyboard } from "@nut-tree/nut-js";
import { rangoCommandWithoutTarget } from "./utils/rangoCommands";
import { sleep } from "./utils/testHelpers";

beforeEach(async () => {
	await page.goto("http://localhost:8080/singleLink.html");
	await page.bringToFront();
	await page.waitForSelector(".rango-hint");
});

test("The hints become double after activating keyboard clicking", async () => {
	await rangoCommandWithoutTarget("toggleKeyboardClicking");
	await page.waitForSelector(".rango-hint[data-hint='aa']");

	const doubleHint = await page.$(".rango-hint[data-hint='aa']");

	expect(doubleHint).not.toBeNull();
});

test("Typing the hint characters clicks the link", async () => {
	await keyboard.type(Key.A);
	await keyboard.type(Key.A);

	await page.waitForNavigation();

	expect(page.url()).toBe("http://localhost:8080/singleLink.html#");
});

test("Typing one hint character marks the hint with a border 1px wider and opacity 0.7 and resets after typing the second character", async () => {
	const borderWithBefore = await page.$eval(".rango-hint", (element) => {
		const inner = element.shadowRoot!.querySelector(".inner")!;
		return Number.parseInt(window.getComputedStyle(inner).borderWidth, 10);
	});

	await keyboard.type(Key.A);
	await sleep(100);

	const [borderWidthAfter, borderColorAfter] = await page.$eval(
		".rango-hint",
		(element) => {
			const inner = element.shadowRoot!.querySelector(".inner")!;
			const style = window.getComputedStyle(inner);
			return [Number.parseInt(style.borderWidth, 10), style.borderColor];
		}
	);

	expect(borderWidthAfter).toBe(borderWithBefore + 1);
	expect(borderColorAfter).toMatch(/^rgba\(.+0\.7\)$/);

	await keyboard.type(Key.A);
	await sleep(100);

	const [borderWidthAfterCompletion, borderColorAfterCompletion] =
		await page.$eval(".rango-hint", (element) => {
			const inner = element.shadowRoot!.querySelector(".inner")!;
			const style = window.getComputedStyle(inner);
			return [Number.parseInt(style.borderWidth, 10), style.borderColor];
		});

	expect(borderWidthAfterCompletion).toBe(borderWithBefore);
	expect(borderColorAfterCompletion).toMatch(/^rgba\(.+0\.3\)$/);
});

test("The hints become single again after deactivating keyboard clicking", async () => {
	await rangoCommandWithoutTarget("toggleKeyboardClicking");
	await page.waitForSelector(".rango-hint[data-hint='a']");

	const singleHint = await page.$(".rango-hint[data-hint='a']");

	expect(singleHint).not.toBeNull();
});