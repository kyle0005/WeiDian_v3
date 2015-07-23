/**
 * Created by YK on 2015/4/20 0020.
 */

//通过原型继承创建新对象
function inherit(p){
    if(p == null) throw TypeError;      //p是个对象，但不能是null
    if(Object.create){                    //如果Object.create()存在
        return Object.create(p);
    }
    var t = typeof p;
    if(t !== "object" && t !== "function") throw TypeError;
    function f(){};                     //定义一个空构造函数
    f.prototype = p;
    return new f();                     //使用f()创建p的继承对象
}