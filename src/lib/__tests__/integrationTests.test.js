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
    initDomFromFiles(
        __dirname + "/../../bar/bar.html",
        __dirname + "/../../bar/bar.js"
    )
    XInput = domTesting.getAllByLabelText(document, "X")
    YInput = domTesting.getAllByLabelText(document, "Y")
    const addValuesButton = domTesting.getByText(document, "+")

    const user = userEvent.setup()
    await user.type(XInput[0], "123")
    await user.type(YInput[0], "456")
    await user.click(addValuesButton)

    expect(XInput[0]).toHaveValue(123)
    expect(YInput[0]).toHaveValue(456)
})