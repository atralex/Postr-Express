class LoginUser {
    username;
    pdw;
    constructor(username, pdw) {
        this.setUsername(username);
        this.setPdw(pdw)
    }

    function

    setUsername(username) {
        this.username = username;
    }

    setPdw(pdw) {
        this.pdw = pdw;
    }
    getUsername(){
        return this.username;
    }
    getPdw(){
        return this.pdw;
    }
    getLoginUsuario(){
       return {
           username: this.username,
           pdw: this.pdw
       }
    }
}

module.exports = LoginUser;