export class Item {
  public value: any;
  public label: string;
  public locked: boolean;

  public constructor(value?: any, label?: string, locked?: boolean) {
    this.value = value;
    this.label = label;
    this.locked = locked || false;
  }

  public equal?(that: Item): boolean {
    return (
      this.value === that.value &&
      this.label === that.label &&
      this.locked === that.locked
    );
  }
}
