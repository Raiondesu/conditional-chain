type F<I, O = I> = (v: I) => O;
type FC<E, I, O = I> = (reason: E, v: I) => O;
type Condition<I> = boolean | ((v: I) => boolean);
type CatchFunctionWrapper<T> = <U extends F<T>>(f: U) => (U extends F<T, infer R> ? ChainCatch<R, T> : T);
type ChainFunctionWrapper<T> = <U extends F<T>>(f: U) => (U extends F<T, infer R> ? Chain<R> : T);

interface ChainCatch<R, T> extends Chain<T> {
  catch<U extends FC<any, T>>(catchF: U): Chain<T | R>;
}

interface Chain<T> {
  if: {
    <Then extends F<T, any>, C extends Condition<T>>(
      condition: C,
      thenF: Then
    ): Chain<ReturnType<Then> | T>;
    <Then extends F<T, any>, Else extends F<T, any>, C extends Condition<T>>(
      condition: C,
      thenF: Then,
      elseF: Else
    ): Chain<ReturnType<Then> | ReturnType<Else>>;
  };
  try: CatchFunctionWrapper<T>;
  chain: ChainFunctionWrapper<T>;
  pipe: ChainFunctionWrapper<T>;
  end(): T;
  readonly _: T;
}

declare function cond<T>(value: T): Chain<T>;

export = cond;
