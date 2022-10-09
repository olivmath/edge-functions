import { Azion, BASE_URL, HEADERS } from "../utils"
import axios from "axios"

export function createEdgeApplication(
    name: string,
    token: string
): Promise<Azion> {
    HEADERS.Authorization = `Token ${token}`
    Object.assign(HEADERS, { "Content-Type": "application/json" })

    return new Promise(async (resolve) => {
        axios({
            url: `${BASE_URL}/edge_applications`,
            method: "POST",
            headers: HEADERS,
            data: JSON.stringify({
                name: name,
                delivery_protocol: "http",
                origin_type: "single_origin",
                address: "www.new.api",
                origin_protocol_policy: "preserve",
                host_header: "www.new.api",
                browser_cache_settings: "override",
                browser_cache_settings_maximum_ttl: 20,
                cdn_cache_settings: "honor",
                cdn_cache_settings_maximum_ttl: 60
            })
        })
            .then((res) => {
                    console.log("Edge Application created successfully")
                    console.table({
                        name: res.data.name,
                        data: res.data
                    })
                resolve({
                    isSuccess: true,
                    response: { ...res.data }
                })
            })
            .catch((erro) => {
                console.error("Error creating token", erro.response.data);
                resolve({
                    isSuccess: false,
                    response: { ...erro.response }
                })
            })
    })
}
