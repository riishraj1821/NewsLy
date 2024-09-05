import React, {useContext,useReducer,useEffect} from "react"; 
import reducer from "./Reducer";
let API="https://hn.algolia.com/api/v1/search?";
const intialState={
    isLoading:true,
    query:"CSS",
    nbPages:0,
    page:0,
    hits:[]
}
const AppContext=React.createContext();
//to create a provider function
const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,intialState);

    const fetchApiData=async (url)=>{
        dispatch({
            type:"SET_LOADING",
        })
        try {
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            dispatch({
                type:"GET_STORIES",
                payload:{
                    hits:data.hits,
                    nbPages:data.nbPages
                }
            })
        } catch (error) {
            console.log(error);
        }

    };
    //to remove the post
    const removePost=(post_ID)=>{
        dispatch({type:"REMOVE_POST", payload:post_ID});
    }
    //search post
    const searchPost=(searchQuery)=>{
        dispatch({type:"SEARCH_QUERY",
    payload:searchQuery})
    }
    //pagination
    const getNextPage=()=>{
        dispatch({type:"NEXT_PAGE"})
    }
    const getPrevPage=()=>{
        dispatch({type:"PREV_PAGE"})
    }
    useEffect(()=>{
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    },[state.query,state.page]);
     return(
        <AppContext.Provider value={{...state,removePost,searchPost,getPrevPage,getNextPage}}>
            {children}
        </AppContext.Provider>
     );
};

//custom hook create
const useGlobalContext=()=>{
    //here using use keyword is very important in making this function
return useContext(AppContext);
};
export {AppContext,AppProvider,useGlobalContext};