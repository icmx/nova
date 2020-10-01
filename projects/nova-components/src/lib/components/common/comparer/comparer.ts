// TODO: Add better comparison methods for strings

export class Comparer {
  private static _minRatio: number = 0.49;
  private static _minRatioStrings: number = Comparer._minRatio;

  private static _compareStrings(a: string, b: string): number {
    return a.toLowerCase().includes(b.toLowerCase()) ? 1 : 0;
  }

  public static areStringsSame(a: string, b: string): boolean {
    return Comparer._compareStrings(a, b) > Comparer._minRatioStrings;
  }
}
