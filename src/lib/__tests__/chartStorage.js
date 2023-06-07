/**
 * @jest-environment jsdom
 */

const { saveChart, loadAllSavedCharts,
        loadSavedChart, updateCurrentChartData,
        loadCurrentChartData } = require("../chartStorage.js")

function saveThreeCharts () {

    saveChart({"name": "chart1"})
    saveChart({"name": "chart2"})
    saveChart({"name": "chart3"})
}


describe("chartStorage.js test suite", function () {

    // Necessary resetting of the DOM
    afterEach(function () {
        window.localStorage.clear()
    })

    test("saveChart() can save a single chart to local storage", function () {

        const chart1 = {"name": "chart1"}
    
        const expected = JSON.stringify([{"name": "chart1"}])
    
        saveChart(chart1)
    
        expect(localStorage.getItem('savedCharts')).toStrictEqual(expected)
    })
    
    test("saveChart() can save three charts to local storage", function () {
    
        const expected = JSON.stringify([
            {"name": "chart1"},
            {"name": "chart2"},
            {"name": "chart3"}
        ])
    
        saveThreeCharts()
        
        expect(localStorage.getItem('savedCharts')).toStrictEqual(expected)
    })
    
    test("saveChart() overwrites a chart in local storage", function () {
    
        const chart4 = {"name": "chart4"}
    
        const expected = JSON.stringify([
            {"name": "chart1"},
            {"name": "chart4"},
            {"name": "chart3"}
        ])
    
        saveThreeCharts()
        
        saveChart(chart4, 1)
        
        expect(localStorage.getItem('savedCharts')).toStrictEqual(expected)
    })
    
    test("loadAllSavedCharts() in a new window returns an empty array", function () {
    
        expect(loadAllSavedCharts()).toStrictEqual([])
    })
    
    test("loadAllSavedCharts() returns an array of saved charts", function () {
    
        const expected = [
            {"name": "chart1"},
            {"name": "chart2"},
            {"name": "chart3"}
        ]
    
        saveThreeCharts()
    
        expect(loadAllSavedCharts()).toStrictEqual(expected)
    })
    
    test("loadSavedChart() in a new window returns an empty object", function () {
    
        expect(loadSavedChart(0)).toStrictEqual({})
    })
    
    test("loadSavedChart() returns a saved chart", function () {
    
        const expected = {"name": "chart2"}
    
        saveThreeCharts()
    
        expect(loadSavedChart(1)).toStrictEqual(expected)
    })

    test("updateCurrentChartData() saves chart data to local storage", function () {

        const chart1 = {"name": "chart1"}
        const expected = JSON.stringify(chart1)

        updateCurrentChartData(chart1)

        expect(window.localStorage.getItem("currentChartData")).toStrictEqual(expected)
    })

    test("loadCurrentChartData() in a new window returns an empty object", function () {
    
        expect(loadCurrentChartData()).toStrictEqual({})
    })

    test("loadCurrentChartData() returns saved chart data", function () {

        const expected = {"name": "chart2"}

        updateCurrentChartData(expected)

        expect(loadCurrentChartData()).toStrictEqual(expected)
    })
})
