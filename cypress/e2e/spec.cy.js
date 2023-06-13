it("generates a chart correctly", function () {
    cy.visit("/line.html")

    // type in data
    cy.contains("Chart title")
        .type("Cats vs. Dogs")
    cy.contains("X label")
        .type("Cats")
    cy.contains("Y label")
        .type("Dogs")
    cy.findByLabelText("X")
        .type("1")
    cy.findByLabelText("Y")
        .type("2")

    // generate chart and check it's existence
    cy.findByRole("button", { name: "Generate chart" }).click()
    cy.findByRole('img').should('exist');
})

// it("maintains chart data across pages", function () {
//     cy.visit("/line.html")

//     // type in data
//     cy.contains("Chart title")
//         .type("Cats vs. Dogs")
//     cy.contains("X label")
//         .type("Cats")
//     cy.contains("Y label")
//         .type("Dogs")
//     cy.findByLabelText("X")
//         .type("1")
//     cy.findByLabelText("Y")
//         .type("2")

//     // check scatterplot page
//     cy.findByRole("link", { name: "Scatter" }).click()
//     cy.findByRole('textbox', { name: "Chart title" }).should('have.value', "Cats vs. Dogs");
//     cy.findByRole('textbox', { name: "X label" }).should('have.value', "Cats");
//     cy.findByRole('textbox', { name: "Y label" }).should('have.value', "Dogs");
//     // unable to find text fields for "X" and "Y", needs to be added
//     // cy.findByLabelText("X").should('have.value', "1");
//     // cy.findByLabelText("Y").should('have.value', "2");

//     // check bar graph page
//     cy.findByRole("link", { name: "Bar" }).click()
//     cy.findByRole('textbox', { name: "Chart title" }).should('have.value', "Cats vs. Dogs");
//     cy.findByRole('textbox', { name: "X label" }).should('have.value', "Cats");
//     cy.findByRole('textbox', { name: "Y label" }).should('have.value', "Dogs");
//     // unable to find text fields for "X" and "Y", needs to be added
//     // cy.findByLabelText("X").should('have.value', "1");
//     // cy.findByLabelText("Y").should('have.value', "2");

//     // check line graph page
//     cy.findByRole("link", { name: "Line" }).click()
//     cy.findByRole('textbox', { name: "Chart title" }).should('have.value', "Cats vs. Dogs");
//     cy.findByRole('textbox', { name: "X label" }).should('have.value', "Cats");
//     cy.findByRole('textbox', { name: "Y label" }).should('have.value', "Dogs");
//     // unable to find text fields for "X" and "Y", needs to be added
//     // cy.findByLabelText("X").should('have.value', "1");
//     // cy.findByLabelText("Y").should('have.value', "2");

// })