# conditional-chain
Bring some logic to js waterfalls


**Before:**
```js
let num = Math.pow(2, 10)

if (isEngineeringMode) {
  num = num.toExponential()
}

if (toUpper) {
  num = num.toUpperCase()
}

num += 'um'

num += 'numnum'

return num
```

**After:**
```js
return cond(Math.pow(2, 10))
  .if(isEngineeringMode, num => num.toExponential())
  .if(toUpper, num => num.toUpperCase())
  .chain(num => num + 'um')
  .pipe(num => num + 'numnum')
  .end
```
