let TypesFactory =require( '../types/typesFactory');
let PrefixedIri =require( '../types/concreteTypes/prefixedIri');
let Prefix =require( './prefix');

class ValueSetValue {

     constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/'))){
        this.id = id;
        this.type = type;
        this.factory = new TypesFactory();
    }

    setType(type){
       this.type = this.factory.createType(type);
     }

    toString(){
        return this.type.toString();
    }

}


module.exports =  ValueSetValue;