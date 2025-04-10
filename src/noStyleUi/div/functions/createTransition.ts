

export function createTransition(options:string|number,setClassName:setClassNameT,setStyle:setStyleT){
    options = options||0.3
    setClassName('transition',false)  
    typeof options === 'number'? setStyle('transition',`all ${options}s ease`) : setStyle('transition',options)
}