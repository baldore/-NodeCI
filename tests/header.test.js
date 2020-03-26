const Page = require('./helpers/page')

let page

beforeEach(async () => {
  page = await Page.build()
  await page.goto('localhost:3000')
})

describe('Header tests', () => {
  beforeEach(async () => {
    await page.goto('localhost:3000')
  })

  test('clicking login starts oauth flow', async () => {
    await page.click('.right a')
    const url = await page.url()

    expect(url).toMatch(/accounts\.google\.com/)
  })

  test('the header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo')
    expect(text).toEqual('Blogster')
  })

  test('when sign in, shows logout button', async () => {
    const logoutSelector = 'a[href="/auth/logout"]'

    await page.login()

    const text = await page.getContentsOf(logoutSelector)
    expect(text).toEqual('Logout')
  })

  afterAll(async () => {
    await page.close()
  })
})
