describe('Adopt', () => {
  beforeEach(() => {
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

    cy.intercept('GET', 'https://api.petfinder.com/v2/animals*', 
      {
        statusCode: 200,
        fixture: 'pets.json' 
      }
    ).as('getPetResults');
    
    cy.visit('http://localhost:3000/pets/1');
    
    cy.wait('@getToken');
    cy.wait('@googleMapsAPI');
    cy.wait('@getPetResults');
  });
  
  it('should navigate to the adopt page', () => {
    cy.url().should('include', '/pets/1');
    cy.get('.pet-card').should('have.length.greaterThan', 0);
  });
});
