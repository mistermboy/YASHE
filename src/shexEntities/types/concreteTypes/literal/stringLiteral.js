let Type =require( '../../type');

class StringLiteral extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'stringLiteral';
    }

    toString(){
        return '"'+this.value+'"';
    }



}


module.exports =  StringLiteral;