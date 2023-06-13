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