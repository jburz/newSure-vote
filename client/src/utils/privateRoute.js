import { Redirect, Route } from 'react-router-dom';
import { useGlobalContextAuthUser } from './GlobalContextAuthUser';

export const PrivateRoute = ({ children, ...rest }) => {
    const userId = useGlobalContextAuthUser();
    console.log("private route userId object: ", userId);
    console.log("private route userId: ", userId[0].id);
    return (
        <Route {...rest} render={() => {
            if (userId.id !== null) {
                return children
            } else return <Redirect to="/signin" />
        }}
        />
    )
}