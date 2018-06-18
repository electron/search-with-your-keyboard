context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:9966')
  })

  it('.type() - type into a DOM element', () => {

    cy.get('#search').type('cool').should('have.value', 'cool')

    cy.get('#hits > *').first()
      .should('have.text', 'apples')
      .should('not.have.class', 'active')

    cy.get('#search').click().type('{downarrow}')

    // TODO get this working
    // cy.get('#hits > *').first()
    //   .should('have.text', 'apples')
    //   .should('have.class', 'active')
  })
})
