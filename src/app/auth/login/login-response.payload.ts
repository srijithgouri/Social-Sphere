export interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: Date;
    userId: number;
    username: string;
    email: string;
    password: string;
    created: string;
    enabled: boolean;
    admin: boolean;
}