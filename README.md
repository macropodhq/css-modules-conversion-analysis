## Crudely analyse your bad css to modular css

### Run

**Globally:**
`cmca`

**Module:**
`node_modules/.bin/cmca`

**Alternativly, reference in your `package.json`:**
```js
"scripts": {
  "analyse": "cmca"
},
```

##### Options
- `-p`: path of the folder to check. default: `.`.
- `-o`: the extension for `old` css. default: `.scss`.
- `-m`: the extension for `modular` css. default: `.mcss`.
- `-i`: detect `inline` styles. default: `false`.
- `-v`: `verbose` output, includes file paths. default: `false`.

**example**
`cmca -p packages/modal -o .less -m .css -i`

### Output

- **total**: Total number of React components, detected via `react.createclass(`.
- **none**: No reference to `old`, `modular` or `inline`.
- **inline**: Inline css, detected via `style={`.
- **notModular**: `old` files.
- **modular**: `modular` files.
- **combination**: more than one of `old`, `modular` or `inline`.

```
total  none  inline  notModular  modular  combination
-----  ----  ------  ----------  -------  -----------
162    66    16      57          22       1

You're 22% of the way there!
```

_i did say it was crude, didn't i?_

