const bar = 40 + 2;

function add(a, b) {
  return a + b;
}

function maybeAdd(a, b, c){
  return c > .5? add(a, b) : c;
}

add(40, 2);

console.log(JSON.stringify(global.__mutationCoverage__));
