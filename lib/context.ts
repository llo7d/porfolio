import { User, UserInfo } from "firebase/auth";
import { createContext } from "react"; 

// Export firebase context with typescript User type
export const FirebaseContext = createContext(
    {
        user: null,
        loadingUser: false
    } as {
        user: User | null | undefined;
        loadingUser: boolean;
    }
)
