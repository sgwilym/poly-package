export function makeHowdy(InternetTimeDep) {
  return function Howdy() {
    console.log(`The time is ${InternetTimeDep.now()}`);
  }
}