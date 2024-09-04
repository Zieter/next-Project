import { add } from './add';

describe('add function', () => {
    it('should return the correct sum of two numbers', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
        expect(add(1000, 2000)).toBe(3000);
    });

    it('should throw a TypeError if either argument is not a number', () => {
        expect(() => add('1' as any, 2)).toThrow(TypeError);
        expect(() => add(1, '2' as any)).toThrow(TypeError);
        expect(() => add('1' as any, '2' as any)).toThrow(TypeError);
        expect(() => add(true as any, 2)).toThrow(TypeError);
        expect(() => add(1, false as any)).toThrow(TypeError);
        expect(() => add(null as any, 2)).toThrow(TypeError);
        expect(() => add(1, undefined as any)).toThrow(TypeError);
    });
});