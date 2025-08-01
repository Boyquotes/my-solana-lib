declare module 'bn.js' {
  class BN {
    constructor(number: number | string | BN | number[] | Uint8Array | Buffer | null, base?: number | 'hex', endian?: string);
    
    clone(): BN;
    toString(base?: number | string, length?: number): string;
    toNumber(): number;
    toJSON(): string;
    toArray(endian?: string, length?: number): number[];
    toBuffer(endian?: string, length?: number): Buffer;
    
    bitLength(): number;
    zeroBits(): number;
    byteLength(): number;
    isNeg(): boolean;
    isEven(): boolean;
    isOdd(): boolean;
    isZero(): boolean;
    
    neg(): BN;
    ineg(): BN;
    abs(): BN;
    iabs(): BN;
    
    add(b: BN): BN;
    iadd(b: BN): BN;
    addn(b: number): BN;
    iaddn(b: number): BN;
    
    sub(b: BN): BN;
    isub(b: BN): BN;
    subn(b: number): BN;
    isubn(b: number): BN;
    
    mul(b: BN): BN;
    imul(b: BN): BN;
    muln(b: number): BN;
    imuln(b: number): BN;
    
    sqr(): BN;
    isqr(): BN;
    
    div(b: BN): BN;
    idiv(b: BN): BN;
    divn(b: number): BN;
    idivn(b: number): BN;
    
    mod(b: BN): BN;
    imod(b: BN): BN;
    modn(b: number): number;
    
    pow(b: BN): BN;
    
    gcd(b: BN): BN;
    
    eq(b: BN): boolean;
    ne(b: BN): boolean;
    gt(b: BN): boolean;
    gte(b: BN): boolean;
    lt(b: BN): boolean;
    lte(b: BN): boolean;
    
    cmp(b: BN): number;
    ucmp(b: BN): number;
    
    iushln(bits: number): BN;
    ishln(bits: number): BN;
    iushrn(bits: number, hint?: number, extended?: BN): BN;
    ishrn(bits: number, hint?: number, extended?: BN): BN;
    
    shln(bits: number): BN;
    ushln(bits: number): BN;
    shrn(bits: number): BN;
    ushrn(bits: number): BN;
    
    testn(bit: number): boolean;
    maskn(bits: number): BN;
    bincn(bit: number): BN;
    
    notn(width: number): BN;
    
    setn(bit: number, val: boolean): BN;
    
    or(b: BN): BN;
    ior(b: BN): BN;
    
    and(b: BN): BN;
    iand(b: BN): BN;
    
    xor(b: BN): BN;
    ixor(b: BN): BN;
    
    fromTwos(width: number): BN;
    toTwos(width: number): BN;
    
    toArrayLike(ArrayType: any, endian?: string, length?: number): Buffer | any[];
  }
  
  namespace BN {
    function isBN(b: any): b is BN;
    function max(left: BN, right: BN): BN;
    function min(left: BN, right: BN): BN;
  }
  
  export = BN;
}
