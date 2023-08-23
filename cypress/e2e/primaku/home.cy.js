/// <reference types="cypress" />

describe('displays all section in homepage', () => {
    beforeEach(() => {
      cy.visit('https://www.primaku.com/')
    })

    it('displays all menu in home', () => {
      cy.get('div > .z-50')
      cy.contains('Home')
      .should('exist')
      .and('have.attr', 'href', '/')
      cy.contains('Artikel')
      .should('exist')
      .and('have.attr', 'href', '/articles')
      cy.contains('Tentang Kami')
      .should('exist')
      .and('have.attr', 'href', '/about')
    })

    it('displays button Booking Vaksin', () => {
      cy.get('div > .z-50')
      cy.contains('Booking Vaksin').should('exist')
    })
  
    it('displays section banner and artikel in home', () => {
      // make sure banner is exist
      cy.get('.justify-start').should('exist')
      // make sure section artikel terpopuler is exist
      cy.contains('Artikel Terpopuler').should('exist')
      // make sure link Lihat semua is exist and the element have anchor link
      cy.contains('Lihat semua')
      .should('exist')
      .and('have.attr', 'href', '/articles')
    })

    it('displays list banner artikel in home is 4', () => {
      cy.get('#app-layout > .mt-2')
      .find('div > .shadow-sm')
      .should('exist')
      .should('have.length', 4)
    })
  })  
  