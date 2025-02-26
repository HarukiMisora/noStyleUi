
import { watchEffect,  defineComponent, watch } from 'vue'
import {WData} from './data'
    
    
    


export const  WVar = defineComponent(
    {
        props:{
            var:{
                type:String,
                default:''
            },
            val:{


            },
            once:{
                type:Boolean,
                default:false
            }
        },
        setup(props, ctx) {
            watchEffect(()=>{
                WData.set(props.var,props.val)
                // console.log(props.var);

            })
        },
        render(){
            return this.$slots.default?.()
        }
        
    }
)
