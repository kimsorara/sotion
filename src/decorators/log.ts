function Log(
  _: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    value: function (...arg: any[]): any {
      console.log(name);
      console.dir(arg);
      const result = descriptor.value.apply(this, arg);
      return result;
    },
  };
  return newDescriptor;
}
class Calc {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}
const calc = new Calc();
calc.add(5, 5);
