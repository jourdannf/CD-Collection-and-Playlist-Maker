import {getUploadAuthParams} from "@imagekit/next/server"

export async function GET () {
    const {token, expire, signature} = getUploadAuthParams()
}