describe('PetInfo', () => {
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

    cy.intercept('GET', 'https://api.petfinder.com/v2/animals/69650492',
      {
        statusCode: 200,
        fixture: 'petinfo.json'
      }).as('getPetInfo');
    
    cy.visit('http://localhost:3000/pets/1');
    
    cy.wait('@getToken');
    cy.wait('@googleMapsAPI');
    cy.wait('@getPetResults');
  });

  it('should be able to display info of a clicked pet', () => {
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
    
    cy.get('.pet-card').eq(0).should('have.attr', 'id', '69650492').click();
    cy.wait('@getPetInfo');
    cy.url().should('eq', 'http://localhost:3000/pets/1/69650492');

    cy.get('.pet-info-img').should('have.attr', 'id', '69650492');
    cy.get('.pet-info').contains('Ella');
    cy.get('.pet-info').contains('Baby · Female · Medium');
    cy.get('.pet-info').contains('Domestic Medium Hair · The Woodlands, TX');
    cy.get('.pet-info').contains('About');
    cy.get('.pet-info').contains('CHARACTERISTICS');
    cy.get('.pet-info').contains('Playful');
    cy.get('.pet-info').contains('COAT LENGTH');
    cy.get('.pet-info').contains('Medium');
    cy.get('.pet-info').contains('HOUSE-TRAINED');
    cy.get('.pet-info').contains('Yes');
    cy.get('.pet-info').contains('HEALTH');
    cy.get('.pet-info').contains('Vaccinations up to date, spayed/neutered');
    cy.get('.pet-intro').contains('Meet Ella');
    cy.get('.pet-intro').contains('Ella is an easy-going kitten who came into rescue with her sister, Emma. We would love to see them...');

    cy.get('.petfinder-btn').should('exist');
  });
});
