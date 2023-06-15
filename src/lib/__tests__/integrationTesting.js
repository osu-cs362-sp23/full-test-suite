/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

test("values are correctly added in chart builder", async function () {
    window.localStorage.clear()
    initDomFromFiles(
        __dirname + "/../../bar/bar.html",
        __dirname + "/../../bar/bar.js"
    )
    const addValuesButton = domTesting.getByText(document, "+")
    const user = userEvent.setup()
    await user.click(addValuesButton)
    await user.click(addValuesButton)

    const xInputs = await domTesting.findAllByLabelText(document, "X")
    const yInputs = await domTesting.findAllByLabelText(document, "Y")

    await user.type(xInputs[0], "1")
    await user.type(yInputs[0], "2")
    await user.type(xInputs[1], "3")
    await user.type(yInputs[1], "4")
    await user.type(xInputs[2], "5")
    await user.type(yInputs[2], "6")

    expect(xInputs[0].value).toMatch("1")
    expect(yInputs[0].value).toMatch("2")
    expect(xInputs[1].value).toMatch("3")
    expect(yInputs[1].value).toMatch("4")
    expect(xInputs[2].value).toMatch("5")
    expect(yInputs[2].value).toMatch("6")
})

test("displays an alert for missing data values", async function () {
    initDomFromFiles(
        __dirname + "/../../bar/bar.html",
        __dirname + "/../../bar/bar.js"
    )
    const xLabel = await domTesting.findByLabelText(document, "X label")
    const yLabel = await domTesting.findByLabelText(document, "Y label")
    const generateChart = domTesting.getByText(document, "Generate chart")

    const user = userEvent.setup()
    await user.type(xLabel, "Cats")
    await user.type(yLabel, "Dogs")

    const spy = jest.spyOn(window, "alert").mockImplementation(() => {})
    await user.click(generateChart)
    expect(spy).toHaveBeenCalled()
})

test("displays an alert for missing axis labels", async function () {
    initDomFromFiles(
        __dirname + "/../../bar/bar.html",
        __dirname + "/../../bar/bar.js"
    )
    const xInputs = await domTesting.findAllByLabelText(document, "X")
    const yInputs = await domTesting.findAllByLabelText(document, "Y")
    const generateChart = domTesting.getByText(document, "Generate chart")

    const user = userEvent.setup()
    await user.type(xInputs[0], "1")
    await user.type(yInputs[0], "2")

    const spy = jest.spyOn(window, "alert").mockImplementation(() => {})
    await user.click(generateChart)
    expect(spy).toHaveBeenCalled()
})

test("clears chart data", async function () {
    window.localStorage.clear()
    initDomFromFiles(
        __dirname + "/../../bar/bar.html",
        __dirname + "/../../bar/bar.js"
    )
    const xLabel = await domTesting.findByLabelText(document, "X label")
    const yLabel = await domTesting.findByLabelText(document, "Y label")
    const addValuesButton = domTesting.getByText(document, "+")
    const clearChartButton = domTesting.getByText(document, "Clear chart data")

    const user = userEvent.setup()
    await user.type(xLabel, "Cats")
    await user.type(yLabel, "Dogs")
    await user.click(addValuesButton)
    await user.click(addValuesButton)

    let xInputs = await domTesting.findAllByLabelText(document, "X")
    let yInputs = await domTesting.findAllByLabelText(document, "Y")
    await user.type(xInputs[0], "1")
    await user.type(yInputs[0], "2")
    await user.type(xInputs[1], "3")
    await user.type(yInputs[1], "4")
    await user.type(xInputs[2], "5")
    await user.type(yInputs[2], "6")
    await user.click(clearChartButton)

    xInputs = await domTesting.findAllByLabelText(document, "X")
    yInputs = await domTesting.findAllByLabelText(document, "Y")
    expect(xInputs.length).toEqual(1)
    expect(yInputs.length).toEqual(1)
    expect(xInputs[0].value).toMatch("")
    expect(yInputs[0].value).toMatch("")
})