import colorValues from "../var/colorValues";




export function isValidColor(color:string) {
    const hexColor = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{8})$/;
    const rgbColor = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    const rgbaColor = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0\.\d+|1\.0)\s*\)$/;
    const hslColor = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    const hslaColor = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0\.\d+|1\.0)\s*\)$/;
    
    return hexColor.test(color) || rgbColor.test(color) || rgbaColor.test(color) || hslColor.test(color) || hslaColor.test(color);
}
export function isColor(color:string){
    if(isValidColor(color)||colorValues.includes(color)){
        return true
    }
    if(color.includes('+')){
        for(let c of color.split('+')){
            // console.log(c);
            if(!isValidColor(c)&&!colorValues.includes(c)){
                return false
            }
        }
        return true
    }
    return false
}


export function isImage(url:string){
    return new RegExp('^.*.(jpg|png|gif|webp|avif|svg)$').test(url)
}
export function isIntegerString(str:string) {
    
    return Number.isInteger(Number(str)) && str.trim() !== "";
}

// 检查是否为数字、带单位的数字、百分比或特殊值
export function isValidPixelValue(value:string) {
    return /^(auto|inherit|initial|unset|0|[-+]?[0-9]*\.?[0-9]+(px|rem|em|vh|vw|vmin|vmax|%|in|cm|mm|pt|pc)?)$/.test(String(value).trim());
}