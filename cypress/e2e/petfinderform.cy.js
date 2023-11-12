describe('PetFinderForm', () => {
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

    cy.get('.header').should('exist');

    cy.get('.header').contains('Home');
    cy.get('.header').contains('Adopt');
    cy.get('.header').contains('Missing');
    cy.get('.header').contains('Events');

    cy.get('.pet-card').should('have.length', 2);

    cy.get('.pet-card').eq(0).should('have.attr', 'id', '69650492');
    cy.get('.pet-card-img').eq(0).should('exist');
    cy.get('.pet-card').eq(0).contains('Ella · F');
    cy.get('.pet-card').eq(0).contains('The Woodlands, TX');
    cy.get('.pet-card').eq(0).contains('Baby · Domestic Medium Hair');

    cy.get('.pet-card').eq(1).should('have.attr', 'id', '69650489');
    cy.get('.pet-card-img').eq(1).should('exist');
    cy.get('.pet-card').eq(1).contains('EMBER · F');
    cy.get('.pet-card').eq(1).contains('The Woodlands, TX');
    cy.get('.pet-card').eq(1).contains('Baby · Domestic Short Hair');

    cy.get('.page-btns').should('have.length', 1);
    cy.get('.next-btn').click();
    cy.url().should('include', '/pets/2');

    cy.get('.previous-btn').should('exist')
    cy.get('.previous-btn').click();
    cy.url().should('include', '/pets/1');
  });
});
