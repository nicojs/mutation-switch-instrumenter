function cov_23g0vmhrj2() {
  var path = 'C:\\z\\github\\nicojs\\mutation-switching-poc\\samples\\js\\js-sample.js';
  var hash = '7459a5e70bd0a560db9fc9fa7224d63e1ec49a62';
  var global = new Function('return this')();
  var gcv = '__coverage__';
  var coverageData = {
    path: 'C:\\z\\github\\nicojs\\mutation-switching-poc\\samples\\js\\js-sample.js',
    statementMap: {
      '0': { start: { line: 3, column: 12 }, end: { line: 3, column: 18 } },
      '1': { start: { line: 6, column: 2 }, end: { line: 6, column: 15 } },
      '2': { start: { line: 10, column: 2 }, end: { line: 10, column: 31 } },
    },
    fnMap: {
      '0': {
        name: 'add',
        decl: { start: { line: 5, column: 9 }, end: { line: 5, column: 12 } },
        loc: { start: { line: 5, column: 19 }, end: { line: 7, column: 1 } },
        line: 5,
      },
      '1': {
        name: 'maybeAdd',
        decl: { start: { line: 9, column: 9 }, end: { line: 9, column: 17 } },
        loc: { start: { line: 9, column: 26 }, end: { line: 11, column: 1 } },
        line: 9,
      },
    },
    branchMap: {
      '0': {
        loc: { start: { line: 10, column: 9 }, end: { line: 10, column: 30 } },
        type: 'cond-expr',
        locations: [
          { start: { line: 10, column: 17 }, end: { line: 10, column: 26 } },
          { start: { line: 10, column: 29 }, end: { line: 10, column: 30 } },
        ],
        line: 10,
      },
    },
    s: { '0': 0, '1': 0, '2': 0 },
    f: { '0': 0, '1': 0 },
    b: { '0': [0, 0] },
    _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
    hash: '7459a5e70bd0a560db9fc9fa7224d63e1ec49a62',
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  cov_23g0vmhrj2 = function () {
    return actualCoverage;
  };
  return actualCoverage;
}
cov_23g0vmhrj2();
const bar = (cov_23g0vmhrj2().s[0]++, 40 + 2);
function add(a, b) {
  cov_23g0vmhrj2().f[0]++;
  cov_23g0vmhrj2().s[1]++;
  return a + b;
}
function maybeAdd(a, b, c) {
  cov_23g0vmhrj2().f[1]++;
  cov_23g0vmhrj2().s[2]++;
  return c > 0.5 ? (cov_23g0vmhrj2().b[0][0]++, add(a, b)) : (cov_23g0vmhrj2().b[0][1]++, c);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLXNhbXBsZS5qcyJdLCJuYW1lcyI6WyJibGFhdCIsImJhciIsImFkZCIsImEiLCJiIiwibWF5YmVBZGQiLCJjIl0sIm1hcHBpbmdzIjoibTNDQUFBLE1BQU9BLENBQUFBLEtBQVAsS0FBa0IsT0FBbEIsQ0FFQSxLQUFNQyxDQUFBQSxHQUFHLDBCQUFHLEdBQUssQ0FBUixDQUFULENBRUEsUUFBU0MsQ0FBQUEsR0FBVCxDQUFhQyxDQUFiLENBQWdCQyxDQUFoQixDQUFtQixpREFDakIsTUFBT0QsQ0FBQUEsQ0FBQyxDQUFHQyxDQUFYLENBQ0QsQ0FFRCxRQUFTQyxDQUFBQSxRQUFULENBQWtCRixDQUFsQixDQUFxQkMsQ0FBckIsQ0FBd0JFLENBQXhCLENBQTBCLGlEQUN4QixNQUFPQSxDQUFBQSxDQUFDLENBQUcsRUFBSiw2QkFBUUosR0FBRyxDQUFDQyxDQUFELENBQUlDLENBQUosQ0FBWCw4QkFBb0JFLENBQXBCLENBQVAsQ0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBibGFhdCBmcm9tICdibGFhdCc7XG5cbmNvbnN0IGJhciA9IDQwICsgMjtcblxuZnVuY3Rpb24gYWRkKGEsIGIpIHtcbiAgcmV0dXJuIGEgKyBiO1xufVxuXG5mdW5jdGlvbiBtYXliZUFkZChhLCBiLCBjKXtcbiAgcmV0dXJuIGMgPiAuNT8gYWRkKGEsIGIpIDogYztcbn1cbiJdfQ==
