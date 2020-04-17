const a = Math.random() * 10;
const b = 3;
const c = 5;

const d = a < 3 ? b : c;

if (a < 3) {
  console.log('A < 3');
}

const items = new Array(20).fill(0);
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
