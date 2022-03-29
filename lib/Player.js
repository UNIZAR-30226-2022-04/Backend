
export default class Player {
    constructor(username, password, coins, xp,){
        this.username = username;
        this.password = password;
        this.coins = coins;
        this.xp = xp;
    }
    friends(){
        return 0;
        //return getFriends(this.username);
    }

    getCoins(){
        return this.coins;
    }
    getXp(){
        return this.xp;
    }
    
}