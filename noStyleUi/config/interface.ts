
type typeT = StringConstructor|NumberConstructor|ObjectConstructor|ArrayConstructor

import type {buttonEffectType, buttonType, buttonAbstractType } from './config'
import type {PropType} from 'vue'

export interface configT{ 
    colors:{
        primary:string
    },
    props:{
        //像素相关
        w:StringConstructor
        h:StringConstructor
        x:StringConstructor
        y:StringConstructor
        p:StringConstructor
        pt:StringConstructor
        pb:StringConstructor
        pl:StringConstructor
        pr:StringConstructor
        px:StringConstructor
        py:StringConstructor
        m:StringConstructor
        mb:StringConstructor
        mt:StringConstructor
        ml:StringConstructor
        mr:StringConstructor
        mx:StringConstructor
        my:StringConstructor

        //颜色相关
        c:StringConstructor
        bg:StringConstructor
        bc:StringConstructor


        flex:(StringConstructor|BooleanConstructor|ArrayConstructor)[]
    }
    buttonProps:{
        type:PropType<buttonType>
        effect:{
           type:PropType<buttonEffectType>
           default:buttonEffectType
        },
        abstract:{
            type:PropType<buttonAbstractType>,
            default:buttonAbstractType
        }
    }

}