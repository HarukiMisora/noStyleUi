
import type {PropType} from 'vue'
import type { buttonAbstractType, buttonEffectType, buttonSizeType, buttonType, configT, groupCusPropsType } from '../interface/compoment'


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
        grid:{
            type:[String,Array,Boolean],
            default:undefined
        },
        hover:[String,Array],

        flex:{
            type:[String,Array,Boolean],
            default:undefined
        },
        transition:{
            type:[String,Number,Boolean],
            default:undefined
        }
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
            type:String as PropType<buttonSizeType>,
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
        },
        _class:{
            type:String
        },
        _style:{
            type:String
        }
    },
    ghostProps:{
        ghost:{
            type:[Boolean,String],
            default:false
        }
    }
}



export function SetConfig(){

}