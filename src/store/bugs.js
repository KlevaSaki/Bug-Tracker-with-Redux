import { createSlice } from "@reduxjs/toolkit"; 
import { createSelector} from "reselect";
import { apiCallBegan } from "./api"
import moment from "moment";


const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },

        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now()
        },

        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },

        bugAssigned: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push( action.payload)
        },
        bugResolved: (bugs, action) =>{
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
    }
})



export const {
    bugAdded, 
    bugAssigned,  
    bugResolved, 
    bugsReceived, 
    bugsRequested, 
    bugsRequestFailed
} = slice.actions
export default slice.reducer;

//action creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
    const {lastFetch} = getState().entities.bugs;
    
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if(diffInMinutes < 10) return;

    return dispatch(
        apiCallBegan({
            url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type,
        })
    );
}


export const addBug = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
});

export const resolveBug = id => apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: {resolved: true},
    onSuccess: bugResolved.type
});


export const asssignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId},
    onSuccess: bugAssigned.type
})

//selector function
// export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved)

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.list.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId =>createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
)



//Action Creators

// export const bugAdded = createAction("bugAdded");
// console.log(bugAdded.type);

// export const bugRemoved = createAction("bugRemoved")

// export const bugResolved = createAction("bugResolved");


//Reducer

// let lastId = 0;

// export default createReducer([], {
//     [bugAdded.type]: (bugs, action) => {
//         bugs.push( {
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false,
//         })
//     },
//     [bugRemoved.type]: (bugs, action) => {
//         return bugs.filter(bug => {
//             bug.id !== action.payload.id
//        });
//     },
//     [bugResolved.type]: (bugs, action) =>{
//         console.log(action);

//         const index = bugs.findIndex(bug => bug.id === action.payload.id);
//         bugs[index].resolved = true;
//     }
// })

// export default function reducer (state = [], action) {
//     switch(action.type){
//         case bugAdded.type :
//             return [
//                 ...state, 
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false,
//                 }
//             ]
//         case bugResolved.type :
//             return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true});

//         case bugRemoved.type :
//             return state.filter(bug => {
//                 bug.id !== action.payload.id
//            });

//         default:
//             return state;
//     }

    
// }