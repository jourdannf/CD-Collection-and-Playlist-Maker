import {getUploadAuthParams} from "@imagekit/next/dist/server"

export async function GET () {
    const {token, expire, signature} = getUploadAuthParams()
}