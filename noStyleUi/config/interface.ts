
type pxT = [StringConstructor,NumberConstructor]

import type {buttonEffectType, buttonType, buttonAbstractType, groupCusPropsType } from './config'
import type {PropType} from 'vue'

export interface configT{ 
    colors:{
        primary:string
    },
    props:{
        //像素相关
        w:pxT
        h:pxT
        x:pxT
        y:pxT
        f:pxT //font-size
        fw:pxT //font-weet
        radius:pxT //font-weet
        p:pxT
        pt:pxT
        pb:pxT
        pl:pxT
        pr:pxT
        px:pxT
        py:pxT
        m:pxT
        mb:pxT
        mt:pxT
        ml:pxT
        mr:pxT
        mx:pxT
        my:pxT

        bd:[StringConstructor,ArrayConstructor]

        //颜色相关
        c:StringConstructor
        bc:StringConstructor

        bg:{
            type:[StringConstructor,ArrayConstructor]
            default:undefined
        }

        flex:(StringConstructor|BooleanConstructor|ArrayConstructor)[]
    }
    buttonProps:{
        type:{
            type:PropType<buttonType>
            default:string
        }
        effect:{
           type:PropType<buttonEffectType>
           default:buttonEffectType
        },
        abstract:{
            type:PropType<buttonAbstractType>,
            default:buttonAbstractType
        },
        disabled:{
            type:BooleanConstructor,
            default:boolean
        },
        loading:{
            type:BooleanConstructor,
            default:boolean
        }
        round:{
            type:BooleanConstructor,
            default:boolean
        }
        size:{
            type:StringConstructor,
            default:string
        }
        onClick:{
            type:FunctionConstructor,
            default:Function
        }
    },
    groupProps:{
        cusProps:{
            type:PropType<groupCusPropsType>
        }
    }

}