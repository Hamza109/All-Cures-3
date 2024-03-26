import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articleId:0,
}

export const articleIdSlice = createSlice({
    name:'article',
    initialState,
    reducers:{
       articleId:(state,action)=>{
                state.articleId=action.payload
        }

    }


})
export const {articleId} = articleIdSlice.actions;
export default articleIdSlice.reducer;