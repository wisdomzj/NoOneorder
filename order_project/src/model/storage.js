let storage = {
    get(key){
        return JSON.parse(localStorage.getItem(key));
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    remove(){
        localStorage.removeItem(key);
    }
}

module.exports = storage;