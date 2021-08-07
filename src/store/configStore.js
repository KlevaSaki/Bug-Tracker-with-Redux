import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./bugs"
import reducer from "./reducer"
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api"
// import func from "./middleware/func";


export default function configureAppStore(){
    return configureStore({ 
        reducer, 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger("console"), toast, api)
    });
}