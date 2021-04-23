import {useCallback} from "react";

//User notification Toast from materialize
//Gets parameter 'text'
export const useMessage = (text) => {
    //Calls a hook useCallback with parameter 'text'
    return useCallback((text) => {
        // If exists Materialize (window.M) and parameter 'text'
        if(window.M && text) {
            //Will display it at window.M.toast
            window.M.toast({html: text})
        }
    }, [])
}
