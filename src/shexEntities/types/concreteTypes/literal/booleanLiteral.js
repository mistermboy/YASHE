let Type =require( '../../type');

class BooleanLiteral extends Type{

    constructor(value='true'){
        super(value);
    }

    getTypeName(){
        return 'booleanLiteral';
    }

    toString(){
        return this.value;
    }



}


module.exports =  BooleanLiteral;