import { describe, test } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
// import MyHeader from '@/components/my-header.vue'


describe('My test', async () => {
  await setup({
    // test context options
  })
  

  test('my test', () => {
    const msg = 'Hello, Vitest!'
    // const wrapper = nuxtApp.vueApp.mount(MyHeader as any)
    expect(msg).contain('Hello, Vitest!')
  })

})