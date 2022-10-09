import { Azion, BASE_URL, HEADERS } from "../utils"
import * as uglify from "uglify-js"
import axios from "axios"
import fs from "fs"

export async function createEdgeFunctions(
    name: string,
    token: string,
    code: string,
    args: object = {}
): Promise<Azion> {
    HEADERS.Authorization = `Token ${token}`
    Object.assign(HEADERS, { "Content-Type": "application/json" })
    let jsFunction: string

    try {
        jsFunction = uglify.minify(
            fs.readFileSync(`functions/${code}`).toString().toString()
        ).code
    } catch (e) {
        throw new Error(`🚨 Error creating file: ${e}`)
    }

    return new Promise(async (resolve) => {
        axios({
            url: `${BASE_URL}/edge_functions`,
            method: "POST",
            headers: HEADERS,
            data: JSON.stringify({
                name: name,
                code: jsFunction,
                language: "javascript",
                json_args: args,
                active: true
            })
        })
            .then((res) => {
                console.log("✅ Edge Function created successfully")
                console.table({
                    name: res.data.results.name,
                    id: res.data.results.id,
                    active: res.data.results.active
                })
                resolve({
                    isSuccess: true,
                    response: { ...res.data }
                })
            })
            .catch((erro) => {
                console.error(
                    "🚨 Error creating edge function",
                    erro.response.data
                )
                resolve({
                    isSuccess: false,
                    response: { ...erro.response }
                })
            })
    })
}
