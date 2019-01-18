# conditional-chain
Bring some logic to js waterfalls


**Before:**
```js
let num = Math.pow(2, 10)

if (isEngineeringMode) {
  num = num.toExponential()
}

if (typeof n === 'number') {
  num = num.toString()
}

num += ' um'

num += '-num-num'

try {
  num = Number('a' + num)
} catch (err) { }

return num // -> 1024 um-num-num
```

**After:**
```js
return cond(Math.pow(2, 10))
  .if(isEngineeringMode, num => num.toExponential())
  .if(n => typeof n === 'number', num => num.toString())
  .chain(num => num + ' um')
  .pipe(num => num + '-num-num')
  .try(n => Number('a' + n))
  .catch((err, n) => n)
  .end
```
