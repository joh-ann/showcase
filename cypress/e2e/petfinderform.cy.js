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

    cy.intercept('GET', 'https://api.petfinder.com/v2/animals?type=Dog&location=Woodinville,%20WA',
      {
        statusCode: 200,
        fixture: 'searchResults.json'
      }).as('getSearchResults');
    
    cy.visit('http://localhost:3000/pets/1');
    
    cy.wait('@getToken');
    cy.wait('@googleMapsAPI');
    cy.wait('@getPetResults');
  });

  it('should display default pet results and search results', () => {
    cy.url().should('include', '/pets/1');

    cy.get('.header').should('exist');

    cy.get('.header').contains('Home');

    cy.get('.pet-card').should('have.length', 3);

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

    cy.get('.pet-card').eq(2).should('have.attr', 'id', '69600670');
    cy.get('.pet-card-img').eq(2).should('exist');
    cy.get('.pet-card').eq(2).contains('Twix Cocoapup · M');
    cy.get('.pet-card').eq(2).contains('Woodinville, WA');
    cy.get('.pet-card').eq(2).contains('Baby · Australian Cattle Dog');

    cy.get('#inline-type').type('Dog');
    cy.get('#inline-location').type('Woodinville, WA');
    cy.get('.search-btn').click();

    cy.wait('@getSearchResults');

    cy.get('.pet-card').eq(0).should('have.attr', 'id', '69600670');
    cy.get('.pet-card-img').eq(0).should('exist');
    cy.get('.pet-card').eq(0).contains('Twix Cocoapup · M');
    cy.get('.pet-card').eq(0).contains('Woodinville, WA');
    cy.get('.pet-card').eq(0).contains('Baby · Australian Cattle Dog');
  });
});
