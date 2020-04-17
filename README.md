# Mutation switch instrumenter

> An example implementation for [mutation switching](https://stryker-mutator.io/blog/2018-10-6/mutation-switching) in JavaScript and TypeScript.

This is a proof of concept implementation for [mutation switching](https://stryker-mutator.io/blog/2018-10-6/mutation-switching) in JavaScript and TypeScript.
Mutation switching is a technique that can be used to accelerate [mutation testing](https://stryker-mutator.io).

## Why?

This is a proof of concept that the [Stryker](https://stryker-mutator.io) team will use to test out mutation switching in the wild.

## Install

Install is recommended either globally or not at all (using `npx to run`).

```shell
> npm i -g mutation-switch-instrumenter
```

## Features

👽 Mutate both JavaScript and TypeScripts  
👾 Mutator support for [Arithmetic operator](https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md#arithmetic-operator), [Block statement](https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md#block-statement), [Conditional expression](https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md#conditional-expression) and [String literal](https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md#string-literal)  
📚 Supports js, ts, html and vue files  
🧥 Adds mutation coverage syntax  
🎨 Outputs the instrumented mutants to console

## Usage

Run it with:

```shell
> mutation-switch-instrumenter src/*.js
```

or

```shell
> npx mutation-switch-instrumenter src/*.js
```

Full help

```
  mutation-switch-instrumenter [glob..]

  Instrument JavaScript/TypeScript code for mutation testing as a Proof of Concept

  Options:
    --help, -h        Show this help
    --out-dir <path>  The out directory to instrument to (default: "instrumented").
                      Set to "." to replace the input files (warning!!!)
```

## Example

This input:

```js
function add(a, b) {
  return a + b;
}

add(40, 2);
```

Will be instrumented as:

```js
var __global_69fa48 = function (g) {
  g.__mutationCoverage__ = g.__mutationCoverage__ || {
    static: {}
  };

  g.__coverMutant__ = g.__coverMutant__ || function () {
    var c = g.__mutationCoverage__.static;

    if (g.__currentTestId__) {
      c = g.__mutationCoverage__[g.__currentTestId__];
    }

    var a = arguments;

    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  };

  return g;
}(new Function("return this")());

function add(a, b) {
  switch (__global_69fa48.activeMutant) {
    case 0:
      {}
      break;

    default:
      __global_69fa48.__coverMutant__(0);
      {
        return __global_69fa48.activeMutant === 1 ? a - b : (__global_69fa48.__coverMutant__(1), a + b);
      }
      break;
  }
}

add(40, 2);
```


## License

Copyright 2020 Nico Jansen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.