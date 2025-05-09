
export type pxT = [StringConstructor,NumberConstructor]
export type buttonEffectType = 'box'|'text'|'none'|'biger'|'small'|'rotate'
// type flexT = string|boolean|string[]
export type buttonType = 'default'|'primary'|'info'|'success'|'warning'|'error'|'tertiary'|'none'
export type buttonAbstractType = 'default'|'unseen'|'dash'|'glass'|'round'
export type buttonSizeType = 'mini'|'small'|'default'|'biger'
export type groupCusPropsType = [string,any][]
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
        grid:{
            type:[StringConstructor,ArrayConstructor,BooleanConstructor],
            default:boolean
        }

        hover:[StringConstructor,ArrayConstructor]

        flex:{
            type:[StringConstructor,ArrayConstructor,BooleanConstructor],
            default:boolean
        }
        transition:{
            type:[StringConstructor,NumberConstructor,BooleanConstructor],
            default:boolean
        }
        position:{
            type:[StringConstructor,ArrayConstructor]
            default:undefined
        }
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
            type:PropType<buttonSizeType>,
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
        _class:{
            type:StringConstructor
        }
        _style:{
            type:StringConstructor
        }
    },
    ghostProps:{
        ghost:{
            type:[BooleanConstructor,StringConstructor],
            default:false
        }
    }

}