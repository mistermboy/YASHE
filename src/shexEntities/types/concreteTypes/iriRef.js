let Type =require( '../type');

class IriRef extends Type{

    constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'iriRef';
    }


    toString(){
        return '<'+this.getValue()+'>';
    }


}


module.exports =  IriRef;