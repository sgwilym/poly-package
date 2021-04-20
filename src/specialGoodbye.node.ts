import {
  time
} from './time'

// Imagine this is a Node specific implementation of StorageSqlite.
export function specialGoodbye() {
  console.log('Goodbye, from Node!')
  console.log(`Node says it's ${time()}`)
}