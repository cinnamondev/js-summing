var Benchmark = require('benchmark');

// Test methods

let m = {
    "reduce": (arr) => {
        return arr.reduce((a,c)=>a+c,0)
    },
    // Recursive "pairs method" from chat
    "recursive": (arr) => {
        if (arr.length <= 1) return arr;
        if (arr.length % 2 != 0) arr.push(0);
        let tmp = [];

        for (let i=0;i<arr.length;i+=2) {
            tmp.push(arr[i]+arr[i+1]);
        }

        return m.recursive(tmp)
    },
    // "pairs method" non recursive
    "pairs": (arr) => {
        if (arr.length % 2 == 1) {
            arr.push(0);
        }
        let i = -1;
        let res = 0;
    
        while (i < arr.length - 1) {
            i += 2;
            res += arr[i] + arr[i - 1]
        }
        return res
    },
    // simple for loop
    "for": (arr) => {
        let ac=0;
        for (let i=0;i<arr.length;i++) {
            ac += arr[i];
        }
        return ac
    }
}

let a=[1,2,3,4,5,6,23,46,2,56,7,8,3,2,5,67,8,3,2,2,56];
var suite = new Benchmark.Suite();
// add tests
suite.add('sum#reduce', () => m.reduce(a))
  .add('sum#recursive', () => m.recursive(a))
  .add('sum#pairs',() => m.pairs(a)) 
  .add('sum#for', () => m.for(a))
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
