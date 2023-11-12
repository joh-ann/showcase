describe('Homepage', () => {
  it('should display the homepage', () => {
    cy.intercept('POST', 'https://api.petfinder.com/v2/oauth2/token', {
      statusCode: 200,
      body: {
        access_token: 'sampleToken',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    }).as('getToken');

    cy.intercept('https://maps.googleapis.com/maps/api/js*', (req) => {
      req.reply({
        statusCode: 200,
        body: 'console.log("Google Maps API script loaded successfully");',
      });
    }).as('googleMapsAPI');

    cy.visit('http://localhost:3000');

    cy.wait('@getToken');
    cy.wait('@googleMapsAPI');

      cy.get('.header').should('exist');

      cy.get('.header').contains('Home');
      cy.get('.header').contains('Adopt');
      cy.get('.header').contains('Missing');
      cy.get('.header').contains('Events');

      cy.get('.unleash-body').contains('Unleash');
  });
});
