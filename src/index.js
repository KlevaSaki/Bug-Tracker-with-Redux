import store from "./store"
import { bugAdded, bugRemoved, bugResolved } from "./actionCreator";

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
})

store.dispatch(bugAdded("Bug 1"));

unsubscribe();

// store.dispatch(bugRemoved(1));

store.dispatch(bugResolved(1));

console.log(store.getState());