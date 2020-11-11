let Type =require( '../../type');

class NonLiteral extends Type{

    getTypeName(){
        return 'nonliteral';
    }

    toString(){
        return 'NONLITERAL';
    }

}


module.exports =  NonLiteral;