let Type =require( '../type');

const PRIMITIVES = ['String','Integer','Date','Boolean'];

class Primitive extends Type{

     constructor(value='none'){
        super(value);
    }

    getTypeName(){
        return 'primitive';
    }

    toString(){
        if(this.value=='none'){
            return '.';
        }
        return 'xsd:'+this.getValue();
    }



}


module.exports =  Primitive;