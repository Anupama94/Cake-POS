class Auth {

    constructor(){
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        localStorage.setItem('authenticated', this.authenticated);
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.setItem('authenticated', this.authenticated);
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('userId');
        cb();
    }

    isAuthenticated() {
        return JSON.parse(localStorage.getItem('authenticated'));
    }
}

export default new Auth();