export class Mixin {
  public static Apply(derived: any, bases: Array<any>) {
    bases.forEach((base) => {
      Object.getOwnPropertyNames(base.prototype).forEach((name) => {
        if (name !== 'constructor') {
          derived.prototype[name] = base.prototype[name];
        }
      });
    });
  }
}
