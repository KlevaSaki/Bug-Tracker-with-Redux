import configureStore from "./store/configStore";
import { 
    bugAdded, 
    bugRemoved, 
    bugAssigned, 
    bugResolved, 
    getUnresolvedBugs ,
    getBugsByUser
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
})

//user actions
store.dispatch(userAdded({name: "user 1"}))
store.dispatch(userAdded({name: "user 2"}))

//project actions
store.dispatch(projectAdded({name: "project 1"}));

//bug actions
store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "bug2"}));
store.dispatch(bugAdded({ description: "bug3"}));

store.dispatch(bugAssigned({bugId: 1, userId: 1}));

store.dispatch(bugResolved({id: 1}));

// store.dispatch(bugRemoved(1));

const bugs = getBugsByUser(2)(store.getState());
console.log(bugs);