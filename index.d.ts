type F<I, O = I> = (v: I) => O;
type Condition<I> = boolean | ((v: I) => boolean);
type ChainFunctionWrapper<T> = <U extends F<T>>(f: U) => (U extends F<T, infer R> ? Chain<R> : T);

interface Chain<T> {
  if: {
    <Then extends F<T, any>>(
      condition: Condition<T>,
      thenF: Then
    ): Chain<ReturnType<Then> | T>;
    <Then extends F<T, any>, Else extends F<T, any>>(
      condition: Condition<T>,
      thenF: Then,
      elseF: Else
    ): Chain<ReturnType<Then> | ReturnType<Else>>;
  };
  chain: ChainFunctionWrapper<T>;
  pipe: ChainFunctionWrapper<T>;
  readonly end: T;
  readonly result: T;
}

declare function cond<T>(value: T): Chain<T>;

export = cond;
