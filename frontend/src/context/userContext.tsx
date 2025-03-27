import { createContext } from "react";

interface TypeUserContext {
    isAdm: boolean;
    setIsAdm: (isAdm: boolean) => void;
    userId: number | null;
    setUserId: (id: number) => void;
}

// Criando o contexto com valor inicial false
export const userContext = createContext<TypeUserContext>({isAdm: false, setIsAdm: () => {}, userId: null, setUserId: () => {}})
