import {useCallback} from "react";


export const useMessage = (text) => {
    return useCallback((text) => {
        if(window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}
