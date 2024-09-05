const reducer=(state,action)=>
{
    switch(action.type)
    {
        case "SET_LOADING"://data abhi nhi mila
        return{
             ...state,
             isLoading:true,
        }
        case "GET_STORIES"://ab data milgya
        return{
            ...state,
            isLoading:false,
            hits:action.payload.hits,
            nbPages:action.payload.nbPages,
        }
        case "REMOVE_POST":
        return{
            ...state,
            hits:state.hits.filter((curElem)=>{
                return curElem.objectID!=action.payload;
            })
        }
        case "SEARCH_QUERY":
            return{
                ...state,
                query:action.payload,
            }
            case "PREV_PAGE":
                let page_num=state.page-1;
                if(page_num<=0)
                {
                    page_num=0;
                }
                return{
                    ...state,
                    page:page_num,
                }
                case "NEXT_PAGE":
                    let page_inc=state.page+1;
                    if(page_inc>=state.nbPages)
                    {
                        page_inc=0;
                    }
                    return{
                        ...state,
                        page:page_inc,
                    }
    }
    return state;
};
export default reducer;