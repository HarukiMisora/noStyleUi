import { defineComponent, h , ref, onMounted, render} from "vue";

interface optionsT{startX?:number,startY?:number,endX?:number,endY?:number,moveEffect?:moveEffectT[],effect?:effectT,callBack?:Function}
type effectT = 'none'|'shake'|'flash'
type moveEffectT = 'rotate'|'small'
export const  recyclingBucket =  defineComponent({
    name: "WRecyclingBucket",
    props: {
      //动画时间
      duration: {
        type: Number,
        default: 750,
      },
      //动画延迟
      delay: {
        type: Number,
        default: 50,
      },
      //动画轨迹
      easing: {
        type:String as ()=> 'linear'|'charge'|'ease'|'ease-in'|'ease-out'|'ease-in-out'|string,
        default: "ease",
      },
      //移动效果
      moveEffect: {
        type:Array as ()=> moveEffectT[],
        default: ()=>[],
      },
      //动画结束效果
      effect: {
        type:String as ()=> effectT,
        default: "none",
      }
    },
    setup(props, context) {
      // console.log(props,context);
      const itemDom = context.slots.item?.()[0]||h('div',{class:'w-recycling-bucket-item',style:{backgroundColor:'#0008',width:'35px',height:'35px',borderRadius:'50%'}},'')
      // console.log(itemDom);
      const easingType:{[key:string]:string} = {
        charge:'cubic-bezier(0, 0.2, 0.97,-0.81)'
      }
      const bucketRef = ref<HTMLDivElement>()
      const position = ref<DOMRect>()
      // 回收
      function recycle(e:MouseEvent|Element,options:optionsT){
        if(!bucketRef.value)return;
        position.value = bucketRef.value.getBoundingClientRect();
        // 获取Ref中的DOM
        if('$el' in e && e.$el instanceof Element){
         e = e.$el
        }
        // 接收一个DOM
        if(e instanceof Element){
          const div = e.cloneNode(true) as HTMLElement
          const itemPosition = e.getBoundingClientRect()
          doIt(div,{
            startX:options?.startX||itemPosition.left,
            startY:options?.startY||itemPosition.top,
            endX:options?.endX||position.value.left,
            endY:options?.endY||position.value.top,
            moveEffect:options?.moveEffect,
            effect:options?.effect,
            callBack:options?.callBack
          })
        }else{
          // 接收一个鼠标事件
          const ct = document.createElement('div')
          render(itemDom,ct)
          const div = ct.children[0] as HTMLElement
          doIt(div,{
            startX:options?.startX||e.clientX,
            startY:options?.startY||e.clientY,
            endX:options?.endX||position.value.left,
            endY:options?.endY||position.value.top,
            moveEffect:options?.moveEffect,
            effect:options?.effect,
            callBack:options?.callBack
          })
        }
      }

      // 执行移动动画
      function doIt(div:HTMLElement,{startX,startY,endX,endY,moveEffect,effect,callBack}:optionsT){
        const easingValue   = props.easing in easingType? easingType[props.easing] : props.easing
          // console.log(moveEffect);
          
          div.style.position = 'absolute'
          div.style.top = (startY)+'px'
          div.style.left = (startX)+'px'
          div.style.zIndex = '9999'
          div.style.transition = `all ${props.duration}ms ${easingValue}`
          const moveEffectThis = moveEffect||props.moveEffect
          const effectThis = effect||props.effect
          document.body.appendChild(div)
          setTimeout(()=>{
            if((moveEffectThis).includes('small')){
              const thsSize = div.getBoundingClientRect()
              
              div.style.left = ((endX||0)-thsSize.width/2)+'px'
              div.style.top = ((endY||0)-thsSize.height/2)+'px'
              
            }else{
              div.style.left = (endX)+'px'
              div.style.top = (endY)+'px'
            }
            for (let i of moveEffectThis){
              moveEffectEvents[i]?.(div)
            }

          },props.delay)
          setTimeout(()=>{
            document.body.removeChild(div)
            effectEvents[effectThis]?.(bucketRef.value)
            callBack?.()
          },props.duration+props.delay)
      }
      const effectEvents:{[key in effectT]:Function} = {
        //震动
        shake:function(element?:HTMLDivElement) {
          // 检查是否是有效的DOM元素
          if (!(element instanceof Element)) {
            return;
          }
  
          // 添加震动类
          element.classList.add('w-recycling-bucket-shake-animation');
          
          // 动画结束后移除类
          element.addEventListener('animationend', function handler() {
            element.classList.remove('w-recycling-bucket-shake-animation');
            element.removeEventListener('animationend', handler);
          });
        },
        none:function(){},
        //闪烁
        flash(element?:HTMLDivElement) {
          // 检查是否是有效的DOM元素
          if (!(element instanceof Element)) {
            return;
          }
          // 保存原始样式
          const originalTransition = element.style.transition || '';
          
          // 添加平滑过渡
          element.style.transition = 'opacity 0.2s ease, box-shadow 0.2s ease';
          
          // 添加闪烁类
          element.classList.add('w-recycling-bucket-flash-animation');
          
          // 动画结束后清理
          element.addEventListener('animationend', function handler() {
            element.classList.remove('w-recycling-bucket-flash-animation');
            element.style.transition = originalTransition;
            element.removeEventListener('animationend', handler);
          });
        }
      }
      const moveEffectEvents:{[key in moveEffectT]:Function}={
        rotate(element:HTMLDivElement) {
          // 添加旋转类
          element.classList.add('w-recycling-bucket-rotate-animation');
        },
        small(element:HTMLDivElement) {
          element.style.scale = '0'
        }
      }
      


      onMounted(()=>{
        // console.log('mounted');
        // recycle()
      })
      
      return{
        recycle,
        bucketRef
      }
    },
    render(){
      // console.log(111);
      return h('div',{
        class:['w-recycling-bucket'],
        ref: (el) => {
            // 将 DOM 元素赋值给 this.bucketRef
            (this as any).bucketRef = el;
        },
      },this.$slots.default?.())
    },

})