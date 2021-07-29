import { createSlice } from "@reduxjs/toolkit"; 
import { createSelector} from "reselect";

let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        bugAssigned: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugId);
            bugs[index].userId = userId;
        },
        bugAdded: (bugs, action) => {
            bugs.push( {
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            })
        },
        bugResolved: (bugs, action) =>{
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },
        bugRemoved:  (bugs, action) => {
            return bugs.filter(bug => {
                bug.id !== action.payload.id
           });
        }
    }
})



export const {bugAdded, bugRemoved, bugAssigned,  bugResolved} = slice.actions
export default slice.reducer;


//selector function
// export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved)

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId =>createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
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