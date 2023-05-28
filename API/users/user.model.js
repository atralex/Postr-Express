class User {
    id;
    username;
    pdw;
    constructor(id, username, pdw) {
        this.setId(id);
        this.setUsername(username);
        this.setPdw(pdw);
    }

    setId(id){
        this.id = id;
    }

    setUsername(username){
        this.username = username;
    }
    setPdw(pdw){
        this.pdw = pdw;
    }
    getId(){
        return this.id;
    }
    getUsername(){
        return this.username;
    }

    getPdw(){
        return this.pdw;
    }
    getUser(){
        return {
            id: this.getId(),
            username: this.getUsername(),
            pdw: this.getPdw()
        }
    }
}

export default User;