import axios from "axios"
import { Azion, base64Encode, BASE_URL, HEADERS, Token } from "../utils"

export async function createToken(
    user: string,
    password: string
): Promise<Token> {
    const decoded = base64Encode(`${user}:${password}`)
    HEADERS.Authorization = `Basic ${decoded}`

    return new Promise(async (resolve) => {
        axios({
            method: "POST",
            url: `${BASE_URL}/tokens`,
            headers: HEADERS
        })
            .then((res) => {
                console.log("Token created successfully")
                console.table([{
                    token: res.data.token,
                    expire: res.data.expires_at
                }])
                resolve({
                    isSuccess: true,
                    response: {
                        token: res.data.token,
                        expire: res.data.expires_at
                    }
                })
            })
            .catch((erro) => {
                console.error("Error creating token", erro);
                resolve({
                    isSuccess: false,
                    response: { ...erro.response }
                })
            })
    })
}
