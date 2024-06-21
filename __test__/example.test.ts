describe('Example Test', () => {

  beforeAll(() => {
    console.log('on test before exec')
  })

  afterAll(() => {
    console.log('on test after exec')
  })

  it('example test one', () => {
    console.log('example test one')
    expect('example').toBe('example')
  })
})
