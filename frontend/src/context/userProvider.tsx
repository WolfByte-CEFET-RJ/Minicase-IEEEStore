import { userContext } from "./userContext";
import { ReactNode, useState } from "react";

interface UserProviderProps {
    children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    const [isAdm, setIsAdm] = useState<boolean>(false); // Agora começa apenas como false
    const [userId, setUserId] = useState<number | null>(null) 

    return (
        <userContext.Provider value={{ isAdm, setIsAdm, userId, setUserId }}>
            {children}
        </userContext.Provider>
    );
}
