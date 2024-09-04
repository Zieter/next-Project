export const add = (x:number, y:number,): Number => {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new TypeError('Both arguments must be numbers');
    }
    return (x + y);
}