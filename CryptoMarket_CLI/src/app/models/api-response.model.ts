export class ApiResponse {
    error: string;
    data: any;

    constructor(e: string, d: any) {
        this.error = e;
        this.data = d;
    }
}
