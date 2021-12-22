export class User {
    constructor(
        private _token: string,
        public message: string | null
    ) { }
    get token() {
        return this._token;
    }
}