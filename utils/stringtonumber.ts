export default function stringToNumber(input: string, base: number = 40, M: number= 2**64): number {
    const charToValue = (char: string): number => {
        if (/[0-9]/.test(char)) {
            return parseInt(char, 10);
        } else if (/[a-z]/.test(char)) {
            return char.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        } else if (/[A-Z]/.test(char)) {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        } else {
            return 0 ;
            // throw new Error(`Invalid character: ${char}`);
        }
    };

    let value = 0 ;
    for(let i=0;i<input.length;i++){
        const val = charToValue(input[i])%M ;
        value = (value*base + val)%M ;
    }
    return value;
}

