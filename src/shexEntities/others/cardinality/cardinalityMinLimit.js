class CardinalityMinLimit{

    constructor(min=1){
        this.min = min;
    }

    getCardType(){
        return 'minLimit';
    }

    toString(){
        return '{'+this.min+',*}';
    }

}


module.exports =  CardinalityMinLimit;