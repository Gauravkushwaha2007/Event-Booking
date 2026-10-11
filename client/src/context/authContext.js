import React from "react";
const authContext = React.createContext();
import api from '../utils/axios'

export authProvider = ({ children }) =>{
    const {user, setUser } = React.useState(null);
    const {loading, setLoading} = React.useState(true);

    React.useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) =>{
        try{
            const data = api.post('/auth/login', {email, password});
            setUser(data);

            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        }
        catch(e){
            console.log('error', e);
            throw e;
        }
    }
}


export default AuthContext;
