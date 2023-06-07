const sortPoints = require("../sortPoints.js")


test("Single-element array is unchanged", function () {

    const array = [
        {x: 1.23, y: 234.00}
    ]

    expect(sortPoints(array)).toStrictEqual(array)
})

test("Two-element array is sorted properly", function () {

    const unsorted = [
        {x: 34.41, y: 183.20},
        {x: 13.40, y: 2.91}
    ]

    const expected = [
        {x: 13.40, y: 2.91},
        {x: 34.41, y: 183.20}
    ]

    expect(sortPoints(unsorted)).toStrictEqual(expected)
})

test("Ten-element array is sorted properly", function () {

    const unsorted = [
        {x: 234.23, y: 12.99},
        {x: 0.02, y: 1.02},
        {x: 3.14, y: -2.72},
        {x: 5.01, y: -12.04},
        {x: -10.23, y: 80.49},
        {x: 0.00, y: -99.30},
        {x: -43.23, y: 34.23},
        {x: 70.34, y: 43.65},
        {x: 153.23, y: -80.23},
        {x: 92.43, y: 2.00}
    ]

    const expected = [
        {x: -43.23, y: 34.23},
        {x: -10.23, y: 80.49},
        {x: 0.00, y: -99.30},
        {x: 0.02, y: 1.02},
        {x: 3.14, y: -2.72},
        {x: 5.01, y: -12.04},
        {x: 70.34, y: 43.65},
        {x: 92.43, y: 2.00},
        {x: 153.23, y: -80.23},
        {x: 234.23, y: 12.99}
    ]

    expect(sortPoints(unsorted)).toStrictEqual(expected)
})

test("Array with equal x-values is partially sorted", function () {

    const unsorted = [
        {x: 4.30, y: 1.20},
        {x: 0.00, y: 8.00},
        {x: -2.39, y: -2.04},
        {x: 0.00, y: -6.23},
        {x: 2.72, y: 3.14}
    ]

    const expectedFirstHalf = [
        {x: -2.39, y: -2.04}
    ]
    const expectedSecondHalf = [
        {x: 2.72, y: 3.14},
        {x: 4.30, y: 1.20}
    ]
    const expectedAnomaly = [
        {x: 0.00, y: -6.23},
        {x: 0.00, y: 8.00}
    ]

    const actual = sortPoints(unsorted)

    expect(actual.slice(0, 1)).toStrictEqual(expectedFirstHalf)
    expect(actual.slice(3, 5)).toStrictEqual(expectedSecondHalf)
    expect(actual.slice(1, 3)).toEqual(
        expect.arrayContaining(expectedAnomaly)
    )
})

test("Empty array is unchanged", function () {

    const array = []

    expect(sortPoints(array)).toStrictEqual(array)
})
