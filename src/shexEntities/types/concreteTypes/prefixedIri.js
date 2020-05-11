let Type =require( '../type');
let Prefix =require( '../../others/prefix');

class PrefixedIri extends Type{

    constructor(prefix=new Prefix(),value=''){
        super(value);
        this.prefix = prefix;
    }

    getTypeName(){
        return 'prefixedIri';
    }


    toString(){
        return this.prefix.getPrefixName()+':'+this.getValue();
    }

}


module.exports =  PrefixedIri;