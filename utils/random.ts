
var seed:number; 

export function rand_seed(seed2:number){
    seed = seed2; 
}
export default function random():number {
    return xorshift();    
}  


function xorshift():number {
 var x:number=seed; 
    x ^= x << 13 ;
    x ^= x >> 7 ;
    x ^= x << 17 ;    
    seed = x;   
    return x;   
}