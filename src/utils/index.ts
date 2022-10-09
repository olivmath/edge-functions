export const BASE_URL: string = "https://api.azionapi.net"

export const HEADERS = {
    Authorization: "Token ",
    Accept: "application/json; version=3"
}

export const base64Encode = (str: string): string => {
    return Buffer.from(str).toString("base64")
}

export interface Azion {
    isSuccess: boolean
    response: object
}

export interface Token extends Azion {
    response: {
        token: string
        expire: string
    }
}
