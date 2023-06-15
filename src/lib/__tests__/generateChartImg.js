/**
 * @jest-environment jsdom
 */

const generateChartImg = require("../generateChartImg")
const fs = require("fs")
const path = require("path")
require("whatwg-fetch")


// Server used for faking POST requests
const rest = require("msw").rest
const setupServer = require("msw/node").setupServer
const mockData = fs.readFileSync(path.join(__dirname, "./mockData.png"))

const server = setupServer(
    rest.post(
        "https://quickchart.io/chart",
        function (req, res, ctx){

            return res(
            
                ctx.status(200),
                ctx.set("Content-Type", "image/png"),
                ctx.body(mockData)
            )
        }
    )
)



describe("generateChartImg.js test suite", function () {

    beforeAll(function() {
        // Bring in the fake server
        server.listen()
    })
    
    afterAll(function () {
        // Uninstall the fake server
        server.close()
    })


    window.URL.createObjectURL = function() {console.log("Function 'createObjectURL' isn't defined in jsdom?")};


    test("Normal function call works properly", async function () {

        expect(await generateChartImg("line", {x:1, y:1}, "x-axis", "y-axis", "title", "red")).toBeDefined()
    })
})
