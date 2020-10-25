/// <reference types="cypress"/>

describe('e2e Frontendtests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    
    it('Login-page and has correct title', () => {

        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('http://localhost:4200');
      
        cy.url().should('include','login');
        cy.contains('Login');

    });

    it('Login with Google-Button available', () => {
        cy.findByRole('button', {name : 'Login mit Google'});
       
    });
    it('Login with GitHub-Button available', () => {
        cy.findByRole('button', {name : 'Login mit GitHub'});
       
    });


    it('sign in and sign out successfully', () => {
        
        cy.findByPlaceholderText('E-Mail').type('pdm.testing@outlook.de');
        
        cy.findByPlaceholderText('Passwort').type('superDuperPassword');

        cy.findByRole('button',{name: 'Login'}).click();

        cy.findByText('pdm.testing@outlook.de');

        cy.get('[icon=menu-outline]').click();

        cy.contains('Logout').click();

    });

    it('Content in Fortschritt-page after Login', () => {

        cy.findByPlaceholderText('E-Mail').type('pdm.testing@outlook.de');
        
        cy.findByPlaceholderText('Passwort').type('superDuperPassword');

        cy.findByRole('button',{name: 'Login'}).click();

        cy.findByText('pdm.testing@outlook.de');

        cy.findByRole('button', {name : 'Training starten'});
        cy.findAllByRole('button', {name : 'Übersicht'}) == 2;
        cy.findByRole('button', {name : 'Wettkampf starten'});
        
    });

    it('Content in Training-page', () => {
        cy.visit('http://localhost:4200/training');
        cy.findByRole('button', {name: 'Neuer Scramble'});
        cy.get('app-cube');
        cy.findByRole('heading', {name : '00:00.00'});
        cy.findByRole('button', {name: 'Start'}).click();
        cy.findByRole('button', {name: 'Abbrechen'});
        cy.findByRole('button', {name: 'Stop'}).click();
        cy.findByRole('button', {name: 'Start'});
    });

    it('Content in Trainingübersicht', () =>{
        cy.visit('http://localhost:4200/trainingoverview');
        cy.findByText('Trainingsübersicht');
        cy.findByText('Datum');
        cy.findByText('Lösungszeit');
        cy.get('[icon=plus-outline]').click();
        cy.url().should('equal','http://localhost:4200/training');
        cy.visit('http://localhost:4200/trainingoverview');
        cy.url().should('equal','http://localhost:4200/trainingoverview');
        cy.get('[icon=sync-outline]').click();
    }); 

    it('Content in Wettkampf', () =>{
        cy.visit('http://localhost:4200/competition');
        cy.findByText('Runde: 1 / 5');
        cy.findByRole('heading', {name : '00:00.00'});
        cy.findByRole('button', {name: 'Start'}).click();
        cy.findByRole('button', {name: 'Stop'}).click();

        cy.findByText('Runde: 2 / 5');
        cy.findByRole('button', {name: 'Start'}).click();
        cy.findByRole('button', {name: 'Stop'}).click();

        cy.findByText('Runde: 3 / 5');
        cy.findByRole('button', {name: 'Start'}).click();
        cy.findByRole('button', {name: 'Stop'}).click();

        cy.findByText('Runde: 4 / 5');
        cy.findByRole('button', {name: 'Start'}).click();
        cy.findByRole('button', {name: 'Stop'}).click();

        cy.findByText('Runde: 5 / 5');
        cy.findByRole('button', {name: 'Start'}).click();
        cy.findByRole('button', {name: 'Stop'}).click();

        cy.findByRole('button', {name: 'Speichern & Auswerten'});
        cy.findByRole('button', {name: 'Nicht speichern & Wiederholen'}).click();

        cy.findByText('Runde: 1 / 5');
        cy.findByRole('heading', {name : '00:00.00'});   
    });

    it('Content in Wettkampfübersicht', () =>{
        cy.visit('http://localhost:4200/competitionoverview');
        cy.findByText('Wettkampfübersicht');
        cy.findByText('Datum');
        cy.findByText('Analyse');
        cy.get('[icon=plus-outline]').click();
        cy.url().should('equal','http://localhost:4200/competition');
        cy.visit('http://localhost:4200/competitionoverview');
        cy.url().should('equal','http://localhost:4200/competitionoverview');
        cy.get('[icon=sync-outline]').click();
    }); 
    
});