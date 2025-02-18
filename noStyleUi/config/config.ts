
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
        w:String,
        h:String,
        x:String,
        y:String,
        p:String,
        pt:String,
        pb:String,
        pl:String,
        pr:String,
        px:String,
        py:String,
        m:String,
        mt:String,
        mb:String,
        ml:String,
        mr:String,
        mx:String,
        my:String,

        //颜色
        c:String,
        bg:String,
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