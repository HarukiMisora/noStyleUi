import { nextTick } from "vue";

function waitOneSecondThenReturn(value: any): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value); // 1秒后返回value
        }, 1000);
    });
}

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