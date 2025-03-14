import { useContext } from "react";
import { userContext } from "../context/userContext";

export default function useUserContext() {
    const context = useContext(userContext)

    
    if(context === undefined) {
        throw new Error('Não está dentro do contexto.')
    }

    return context
}