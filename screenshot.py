import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # MUST use new_context to record video
        context = await browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = await context.new_page()

        # Route to mock the Supabase auth response and keep it pending to simulate loading
        async def route_handler(route):
            await asyncio.sleep(5) # Delay response to capture loading state
            await route.abort()

        await page.route("**/auth/v1/token?**", route_handler)

        await page.goto("http://localhost:3000/dashboard/login")

        try:
             await page.wait_for_selector("#email", timeout=5000)
        except Exception as e:
             await page.screenshot(path="/home/jules/verification/screenshots/login-error.png")
             print("Could not find #email, took a screenshot.")
             raise e

        # Fill the form
        await page.fill("#email", "test@example.com")
        await page.wait_for_timeout(500)
        await page.fill("#password", "password123")
        await page.wait_for_timeout(500)

        # Start recording the loading state
        await page.click("button[type='submit']")

        # Take a screenshot while it is "loading"
        await asyncio.sleep(1)
        await page.screenshot(path="/home/jules/verification/screenshots/verification.png")
        await page.wait_for_timeout(1000)

        await context.close()
        await browser.close()

asyncio.run(main())
