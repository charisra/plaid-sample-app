const rewire = require("rewire")
const index = rewire("./index")
const prettyPrintResponse = index.__get__("prettyPrintResponse")
// @ponicode
describe("prettyPrintResponse", () => {
    test("0", () => {
        let callFunction = () => {
            prettyPrintResponse(500)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            prettyPrintResponse(400)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            prettyPrintResponse(404)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            prettyPrintResponse(429)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            prettyPrintResponse(200)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            prettyPrintResponse(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
