






// let test = {
//     A: {
//         first: "A B C",
//         second: "A C D E",
//         third: "F G e F"
//     },
//     B: {
//         first: "G A B C",
//         second: "A C U F",
//         third: "F G e F"
//     }
// }
// let answer = "";

// const dfs = object => {
//     for (const key in object) {
//         if (object.hasOwnProperty(key)) {
//             if(typeof object[key] === "string") {
//                 console.log(object[key]);
//                 if(object[key].split(" ").length === 3) answer = object[key];
//             }
//             else dfs(object[key]);
//         }
//     }
// }

// // var dfs = function(obj, str) {
// //     for (var key in obj) {
// //       if (obj.hasOwnProperty(key)) {
// //         if (typeof obj[key] === 'string')
// //           hash[str + key] = obj[key];
// //         else {
// //           dfs(obj[key], str + key + '.');
// //         }
// //       }
// //     }
// //   };

// dfs(test);
// console.log(answer);