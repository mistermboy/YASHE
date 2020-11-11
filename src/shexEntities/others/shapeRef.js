let Shape =require('../shape');

class ShapeRef{

    constructor(shape=null){
        this.shape = shape;
    }

    toString(){
        if(this.shape){
           let shapeRef = this.shape.type.toString();
           return '@'+shapeRef;
        }

        return '';
    }


}


module.exports =  ShapeRef;