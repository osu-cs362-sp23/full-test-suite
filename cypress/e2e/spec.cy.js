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

it("maintains chart data across pages", function () {
    cy.visit("/line.html")

    // type in data
    cy.contains("Chart title")
        .type("Cats vs. Dogs")
    cy.contains("X label")
        .type("Cats")
    cy.contains("Y label")
        .type("Dogs")
    cy.findByLabelText("X")
        .type("123")
    cy.findByLabelText("Y")
        .type("456")

    // check scatterplot page
    cy.findByRole("link", { name: "Scatter" }).click()
    cy.findByRole('textbox', { name: "Chart title" }).should('have.value', "Cats vs. Dogs")
    cy.findByRole('textbox', { name: "X label" }).should('have.value', "Cats")
    cy.findByRole('textbox', { name: "Y label" }).should('have.value', "Dogs")
    cy.findByDisplayValue("123").should("exist")
    cy.findByDisplayValue("456").should("exist")
})

it("saves a chart to the gallery", function () {
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

    // generate and save chart
    cy.findByRole("button", { name: "Generate chart" }).click()
    cy.findByRole("button", { name: "Save chart" }).click()

    // check that the chart title is in gallery  
    cy.findByRole("link", { name: "Gallery" }).click()
    cy.findByText("Cats vs. Dogs").should("exist")
})