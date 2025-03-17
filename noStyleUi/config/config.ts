
import {type configT} from './interface'
import type {PropType} from 'vue'

export type flexT = string|boolean|string[]
export type buttonType = 'default'|'primary'|'info'|'success'|'warning'|'error'|'tertiary'|'none'
export type buttonEffectType = 'box'|'text'|'none'|'biger'|'small'|'rotate'
export type buttonAbstractType = 'default'|'unseen'|'dash'|'glass'|'round'
export type buttonSizeType = 'mini'|'small'|'defalut'|'biger'
export type groupCusPropsType = [string,string][]
export const config:configT = {
    colors:{
        primary:'#365636'
    },
    props:{
        //像素
        w:[String,Number],
        h:[String,Number],
        x:[String,Number],
        y:[String,Number],
        f:[String,Number],
        fw:[String,Number],
        radius:[String,Number],
        p:[String,Number],
        pt:[String,Number],
        pb:[String,Number],
        pl:[String,Number],
        pr:[String,Number],
        px:[String,Number],
        py:[String,Number],
        m:[String,Number],
        mt:[String,Number],
        mb:[String,Number],
        ml:[String,Number],
        mr:[String,Number],
        mx:[String,Number],
        my:[String,Number],
        
        bd:[String,Array],

        //颜色
        c:String,
        bc:String,
        bg:{
            type:[String,Array],
            default:undefined
        },
        hover:[String,Array],

        flex:[String,Boolean,Array]
    },
    buttonProps:{
        type:{
            type:String as PropType<buttonType>,
            default:'default'
        },
        effect:{
            type:String as PropType<buttonEffectType>,
            default:'box'
        },
        abstract:{
            type:String as PropType<buttonAbstractType>,
            default:'default'
        },
        disabled:{
            type:Boolean,
            default:false
        },
        loading:{
            type:Boolean,
            default:false
        },
        round:{
            type:Boolean,
            default:false
        },
        size:{
            type:String,
            default:'default'
        },
 
        onClick:{
            type:Function,
            default:()=>{}
        }
    },
    groupProps:{
        cusProps:{
            type:Array as PropType<groupCusPropsType>
        }
    }
}



export function SetConfig(){

}