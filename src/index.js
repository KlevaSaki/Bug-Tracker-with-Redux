import configureStore from "./store/configStore";
import { 
    getUnresolvedBugs ,
    getBugsByUser,
    loadBugs,
    addBug,
    resolveBug,
    asssignBugToUser
} from "./store/bugs";

import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from "./store/api"

const store = configureStore();

// const unsubscribe = store.subscribe(() => {
//     console.log("Store changed", store.getState());
// })

//user actions
// store.dispatch((dispatch, getState) => {
//     dispatch({type: "bugsReceived", bugs: [1,2,3]})
//     console.log(getState());
// })

// store.dispatch(
//     {
//         type: "error",
//         payload: {
//             message: "An error occured"
//         }
//     }
// )

 
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(asssignBugToUser(1, 4)), 2000);


// store.dispatch(userAdded({name: "user 1"}))
// store.dispatch(userAdded({name: "user 2"}))

// //project actions
// store.dispatch(projectAdded({name: "project 1"}));

// //bug actions
// store.dispatch(bugAdded({ description: "Bug1" }));
// store.dispatch(bugAdded({ description: "bug2"}));
// store.dispatch(bugAdded({ description: "bug3"}));

// store.dispatch(bugAssigned({bugId: 1, userId: 1}));

// store.dispatch(bugResolved({id: 1}));

// store.dispatch(bugRemoved(1));

// const bugs = getBugsByUser(2)(store.getState());
// console.log(bugs);