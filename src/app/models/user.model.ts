export class User {
    constructor(
        private token: string,
        public message: string | null
    ) { }
    get x_access_token() {
        return this.token;
    }
}