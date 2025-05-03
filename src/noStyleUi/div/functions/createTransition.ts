import type { setClassNameT, setStyleT } from "../../interface/css"


export function createTransition(options:string|number|boolean,setClassName:setClassNameT,setStyle:setStyleT){
    options = options||0.3
    setClassName('transition',false)  
    typeof options === 'number'? setStyle('transition',`all ${options}s ease`) : setStyle('transition',<string>options)
}