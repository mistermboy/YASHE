class CardinalityExactly{

    constructor(min=1){
        this.min = min;
    }

    getCardType(){
        return 'exactly';
    }

    toString(){
        return '{'+this.min+'}';
    }

}


module.exports =  CardinalityExactly;