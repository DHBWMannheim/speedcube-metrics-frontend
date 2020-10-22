/// <reference types="cypress"/>

import Chance from 'chance';
const chance = new Chance();

describe('I am Speeeed', () => {

    const email = chance.email();
    const pass = 'ValidPassword123';

    beforeEach(() => {
    
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('http://localhost:4200');
    });

    /*it('find Burger', () => {

        cy.visit('http://localhost:4200');
        cy.get('[icon=menu-outline]').click();

    })
    */

    
    it('Login-page and has correct title', () => {

        // Komm nicht drauf, warum der noch eingeloggt ist, obwohl ich zuvor den Cache leere und damit eigentlich der Token auch weg sein sollte? :shrug:
        cy.visit('http://localhost:4200');
        
        if(cy.findByText('pdm.testing@outlook.de')){
            cy.get('[icon=menu-outline]').click();
            cy.contains('Logout').click();
        }

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

    it('Content in Fortschritt-Site after Login', () => {

        cy.findByPlaceholderText('E-Mail').type('pdm.testing@outlook.de');
        
        cy.findByPlaceholderText('Passwort').type('superDuperPassword');

        cy.findByRole('button',{name: 'Login'}).click();

        cy.findByText('pdm.testing@outlook.de');

        //cy.findAllByRole('button', {name : 'Übersicht'}).and({ng-reflect-routerlink : "/trainingoverview"});
        cy.findByRole('button', {name : 'Training starten'});
        cy.findAllByRole('button', {name : 'Übersicht'});
        cy.findByRole('button', {name : 'Wettkampf starten'});
        
    });


    

    

    /*it('blocks protected routes', () => {

        //cy.pause();
        
        cy.get('#navToggle').click();
        cy.contains('Firestore').click();

        cy.get('notification-message').children()
            .should('contain', 'You must be logged in!')
            .and('be.visible')

        
    });
    */

    





});