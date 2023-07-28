describe('Index', () => {
  it('Capture a index page', () => {
    cy.visit('http://localhost:3000')
    cy.percySnapshot();
  })
})