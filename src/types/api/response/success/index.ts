export interface ApiResponseSuccess<T = unknown> {
    data: T | null;
    status: number;
    message: string;
}