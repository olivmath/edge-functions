const azion = require("./lib/index").default

async function main() {

    const user = "user@example.com"
    const password = "password"
    const token = await azion.createToken(user, password)
    const edgeFunction = await azion.createEdgeFunctions(
        "My Function",
        token.response.token,
        "myFunction.js"
    )
}

main().then()