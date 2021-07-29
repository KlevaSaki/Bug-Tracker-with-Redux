import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const users = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        userAdded: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name
            })
        }
    }
})


export const {userAdded} = users.actions
export default users.reducer