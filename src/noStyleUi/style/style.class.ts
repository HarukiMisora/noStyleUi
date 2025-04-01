
type keyT = keyof typeof  StyleClass
class StyleClass {
    primary:'black'

    setVar(key:keyT,value:string){
        this[key] = value
    }

}
export default new StyleClass()