export interface Token {
    success: boolean,
    token: string,
    expireIn: string
}


export interface payloadToken {
    email: string,
    exp: number,
    iat: number,
    role: string,
    userId: string
}


