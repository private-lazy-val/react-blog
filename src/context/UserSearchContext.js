import {createContext, useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAllUsers} from "../features/users/usersSlice";

// React Context is a way to pass data through the component tree without having to pass props down manually at every level.
const UserSearchContext = createContext({});

export const UserSearchProvider = ({children}) => {

    const [searchUser, setSearchUser] = useState('');
    const [searchUserResults, setSearchUserResults] = useState([]);

    const users = useSelector(selectAllUsers);

    useEffect(() => {
        const filteredResults = users.filter((user) =>
            (user.name && user.name.toLowerCase().includes(searchUser.toLowerCase())));

        setSearchUserResults(filteredResults.reverse());
    }, [users, searchUser]);

    // Reset search input when navigating to another section of the website
    const resetUserSearch = () => {
        setSearchUser('');
    }

    return (
        <UserSearchContext.Provider value={{searchUser, setSearchUser, searchUserResults, resetUserSearch}}>
            {children}
        </UserSearchContext.Provider>
    )
}

export default UserSearchContext;