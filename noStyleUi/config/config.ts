
import {type configT} from './interface'
import type {PropType} from 'vue'

export type flexT = string|boolean|string[]
export type buttonType = 'default'|'primary'|'info'|'success'|'warning'|'error'|'tertiary'|'none'
export type buttonEffectType = 'box'|'text'|'none'|'biger'|'small'|'rotate'
export type buttonAbstractType = 'solid'|'dash'|'galss'|'cut'
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

        //颜色
        c:String,
        bg:[String,Array],
        bc:String,

        flex:[String,Boolean,Array]
    },
    buttonProps:{
        type:String as PropType<buttonType>,
        effect:{
            type:String as PropType<buttonEffectType>,
            default:'box'
        },
        abstract:{
            type:String as PropType<buttonAbstractType>,
            default:'solid'
        }
        
        
    }
}



export function SetConfig(){

}