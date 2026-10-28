import { expect, test } from "@playwright/test";

const slugs = [
  "cortex-nids",
  "ci-doctor-ai",
  "fraud-app-detection",
  "lung-tumor-detection",
  "brain-tumor-detection",
  "nutrient-screening",
];
const routes = ["/", "/projects", "/about", "/contact", ...slugs.map((s) => `/projects/${s}`)];

for (const route of routes) {
  test(`${route} renders one h1, landmarks and no horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.locator("header").first()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("home shows required copy", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Saif — Software Developer & AI/DS Student");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "I build intelligent systems and digital experiences.",
  );
  await page.locator("#cta-title").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Have an interesting problem to solve?" })).toBeVisible();
});

test("projects index lists exactly six projects", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator("main ol > li")).toHaveCount(6);
  for (const banned of ["Real-Time Chat", "CSIFormer", "AURA"]) {
    await expect(page.getByText(banned)).toHaveCount(0);
  }
});

test("medical projects show the disclaimer", async ({ page }) => {
  for (const slug of ["lung-tumor-detection", "brain-tumor-detection", "nutrient-screening"]) {
    await page.goto(`/projects/${slug}`);
    await expect(page.getByText("Experimental research. Not a diagnostic tool.")).toBeVisible();
  }
});

test("brain tumor page separates in-distribution and external results", async ({ page }) => {
  await page.goto("/projects/brain-tumor-detection");
  const external = page.getByRole("tab", { name: "External (BraTS 2021)" });
  await expect(page.getByRole("tab", { name: "In-distribution (TCGA-LGG)" })).toHaveAttribute("aria-selected", "true");
  await external.click();
  await expect(external).toHaveAttribute("aria-selected", "true");
  await expect(page.getByText("44.00%")).toBeVisible();
});

test("unverified claims never render", async ({ page }) => {
  await page.goto("/projects/nutrient-screening");
  await expect(page.getByText("Multi-output XGBoost ensemble")).toHaveCount(0);
});

test("skip link moves focus to main", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium");
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test("contact form shows not-configured state without provider env", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Contact form not configured", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toHaveCount(0);
  await expect(page.getByRole("textbox")).toHaveCount(0);
});

test("contact API rejects when not configured", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "Test", email: "a@b.co", message: "x".repeat(30) } });
  expect(res.status()).toBe(503);
  expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
});

test("unknown route shows custom 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn't exist.");
});
