


export const WData:{[key:string]:any} ={



    set(key:string,value:any){
        this[key] = value
        // console.log('seted');
        
    },

    get(key:string){
        // console.log(this[key]);
        
    return this[key]
    },
    getf(key:string){
    // console.log(this[key]);

        return ()=>this[key]

    }
}