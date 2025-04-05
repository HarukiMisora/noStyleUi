
type pxT = [StringConstructor,NumberConstructor]
type buttonEffectType = 'box'|'text'|'none'|'biger'|'small'|'rotate'
type flexT = string|boolean|string[]
type buttonType = 'default'|'primary'|'info'|'success'|'warning'|'error'|'tertiary'|'none'
type buttonAbstractType = 'default'|'unseen'|'dash'|'glass'|'round'
type buttonSizeType = 'mini'|'small'|'defalut'|'biger'
type groupCusPropsType = [string,string][]



interface configT{ 
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
            default:undefined
        }

        hover:[StringConstructor,ArrayConstructor]

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