type ChainFunction<T> = <U>(f: (v: T) => U) => Chain<U>

interface Chain<T> {
  if: {
    <Then extends ChainFunction<T>>(
      condition: boolean,
      thenF: Then
    ): ReturnType<Then>;
    <Then extends ChainFunction<T>, Else extends ChainFunction<T>>(
      condition: boolean,
      thenF: Then,
      elseF: Else
    ): ReturnType<Then> | ReturnType<Else>;
    <Then extends ChainFunction<T>, Else extends ChainFunction<T>>(
      condition: true,
      thenF: Then,
      elseF: Else
    ): ReturnType<Then>;
    <Then extends ChainFunction<T>, Else extends ChainFunction<T>>(
      condition: false,
      thenF: Then,
      elseF: Else
    ): ReturnType<Else>;
  };
  chain: ChainFunction<T>;
  pipe: ChainFunction<T>;
  readonly end: T;
  readonly result: T;
}

export = function cond<T>(value: T): Chain<T>;
