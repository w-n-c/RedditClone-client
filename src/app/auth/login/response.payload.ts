export default interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: string;
    username: string;
}