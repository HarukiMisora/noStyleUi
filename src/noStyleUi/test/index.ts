



export function isValidColor(color:string) {
    const hexColor = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    const rgbColor = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    const rgbaColor = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0\.\d+|1\.0)\s*\)$/;
    const hslColor = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    const hslaColor = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0\.\d+|1\.0)\s*\)$/;
 
    return hexColor.test(color) || rgbColor.test(color) || rgbaColor.test(color) || hslColor.test(color) || hslaColor.test(color);
}

export function isImage(url:string){
    return new RegExp('^.*.(jpg|png|gif|webp|avif|svg)$').test(url)
}