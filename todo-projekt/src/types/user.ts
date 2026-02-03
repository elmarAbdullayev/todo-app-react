export interface UserCreateRequest {
    username:string
    password:string
}


export interface UserResponse {
    username:string
}


export interface Token {
    access_token:string
    token_type:string
}