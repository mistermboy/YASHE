let Type =require( '../type');

class BNode extends Type{

    constructor(value='example'){
        super(value);
    }


    getTypeName(){
        return 'bnodeType';
    }


    toString(){
        return '_:'+this.getValue();
    }

}




module.exports =  BNode;