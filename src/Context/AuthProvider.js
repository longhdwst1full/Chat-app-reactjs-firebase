

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// history= useNavigate 
import { auth } from '../firebase/config';
import { Spin } from 'antd';
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const history = useNavigate();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                history('/');
                return;
            }

            // reset user info
            setUser({});
            setIsLoading(false);
            history('/login');
        });

        // clean function
        return () => {
            unsubscibed();
        };
    }, [history]);



    return (
        <AuthContext.Provider value={{ user }}>

            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>

    )
}
