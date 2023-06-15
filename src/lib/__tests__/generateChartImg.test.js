const {rest} = require('msw');
const {setupServer} = require('msw/node');
const generateChartImg = require('../generateChartImg.js');
const fs = require("fs");

// Create a mock server
const server = setupServer(
    rest.post('https://quickchart.io/chart', (req, res, ctx) => {
        // Return a fake PNG image in the response
        // As per instructions does not actually generate a real chart
        const imageBytes = fs.readFileSync('src/lib/__tests__/mockResults/barChart.png');
        return res(
            ctx.set('Content-Type', 'image/png'),
            ctx.body(imageBytes)
        );
    })
);

// Set up the mock server before running the tests
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// Write the Jest test
describe('generateChartImg', () => {
    test('returns the URL of the generated chart image', async () => {
        // Mock chart data
        const type = 'line';
        const data = [
            {x: 1, y: 2},
            {x: 2, y: 4},
            {x: 3, y: 6},
        ];
        const xLabel = 'X Axis';
        const yLabel = 'Y Axis';
        const title = 'Chart Title';
        const color = '#429c32';

        // Call the function
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);

        // Make sure that the URL is returned
        expect(imgUrl).toMatch(/^blob:/);
    });

    test('throws an error if the request to QuickChart API fails', async () => {
        // Set up a mock server to handle an error response
        server.use(
            rest.post('https://quickchart.io/chart', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        // Call the function and expect it to throw an error
        await expect(
            generateChartImg('line', [], 'X Axis', 'Y Axis', 'Chart Title', '#2232c7')
        ).rejects.toThrowError();
    });
});