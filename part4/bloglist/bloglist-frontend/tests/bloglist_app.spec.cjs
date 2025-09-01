const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('blogs');
    await expect(locator).toBeVisible();
  })

  test('login form is shown', async ({ page }) => {
    page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen');
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong');

      const errorDiv = page.locator('.error');
      await expect(errorDiv).toContainText('Validation Error. Code: 401');
      await expect(errorDiv).toHaveCSS('border-style', 'solid');
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible();
    })
    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen');
      })

      test.only('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'this is a test', 'jaime', 'https://google.com');
        await expect(page.getByText('this is a test')).toBeVisible();
      })
    })
  })
})
