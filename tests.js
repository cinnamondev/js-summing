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
    // "pairs method" non recursive
    "pairsOpt": (arr) => {
        if (arr.length % 2 == 1) {
            arr.push(0);
        }
        let i = arr.length-1;
        let res = 0;
        while (i>=1) {
            res += arr[i] + arr[i - 1]
            i-=2;
        }
        return res
    },
    // simple for loop (naive)
    "for": (arr) => {
        let ac=0;
        for (let i=0;i<arr.length;i++) {
            ac += arr[i];
        }
        return ac
    },
    // simple for loop optimised
    "forOpt": (arr) => {
        let ac=0;
        for (let i=arr.length;i--;) { // less 
            ac += arr[i];
        }
        return ac
    },
    // decrementing for loop
    "whiledec": (arr) => {
        let ac=0;
        let i = arr.length;
        while (i--) {
            ac += arr[i];
        }
        return ac
    },
    // decrementing for loop
    "whileinc": (arr) => {
        let ac=0;
        let i = 0;
        while (i<arr.length) {
            ac += arr[i];
            i++;
        }
        return ac
    }
}

function createRandomArray(n) {
    return Array(n).fill(0).map(() => Math.round(Math.random() * 5000))
}
let as = [createRandomArray(3),
    createRandomArray(10),
    createRandomArray(50),
    createRandomArray(75),
    createRandomArray(100),
    createRandomArray(500),
    createRandomArray(1000),
    createRandomArray(50000),
];

var suite = new Benchmark.Suite();
// add tests
as.forEach((a)=> {
    suite.add('sum#reduce#' + a.length, () => m.reduce(a))
    .add('sum#recursive' + a.length, () => m.recursive(a))
    .add('sum#pairs#' + a.length,() => m.pairs(a)) 
    .add('sum#pairsOpt#' + a.length,() => m.pairsOpt(a)) 
    .add('sum#for#' + a.length, () => m.for(a))
    .add('sum#forOpt#' + a.length, () => m.forOpt(a))
    .add('sum#whileDec#' + a.length, () => m.whiledec(a))
    .add('sum#whileInc#' + a.length, () => m.whileinc(a))
})

  // add listeners
  suite.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
