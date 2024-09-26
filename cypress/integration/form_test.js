describe('User Onboarding',()=>{

    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    const nameInput=()=>cy.get('input[name=name]')
    const emailInput=()=>cy.get('input[name=email]')
    const passwordInput=()=>cy.get('input[name=password]')
    const tos=()=>cy.get('input[name=tos]')
    const submitBtn=()=>cy.get('button[id="submitBtn"]')
    it('check text',()=>{
        nameInput()
        .should('have.value','')
        .type('Cypress')
        .should('have.value','Cypress')
    })
        it('check email',()=>{
        emailInput()
        .should('have.value','')
        .type('fake@email.com')
        .should('have.value','fake@email.com')
        })

        it('check password',()=>{
        passwordInput()
        .should('have.value','')
        .type('password')
        .should('have.value','password')
        })

        it('check terms',()=>{
        tos()
        .click()
        })

        it('check submit button',()=>{
        submitBtn()
        .should('be.disabled')
    })
})