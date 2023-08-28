export default class Random{
    seed: number; 

    constructor(seed:number) {
      this.seed = seed;
    }
    rand():number {
        var x:number=this.seed; 
        x ^= x << 13 ;
        x ^= x >> 7 ;
        x ^= x << 17 ;    
        this.seed = x;   
        return x;   
    } 
    randrange(lo:number,hi:number): number {
        let x = this.rand() ;
        let len = hi-lo+1;
        x = x%len; 
        if( x < 0 ) x = x+len; 
        return x + lo ;
    }
  };