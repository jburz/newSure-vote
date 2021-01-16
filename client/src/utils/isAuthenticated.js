import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useGlobalContextAuthUser } from "./GlobalContextAuthUser";

export const IsAuthenticated = () => {

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const userId = useGlobalContextAuthUser();
    if (userId) {
        setRedirectToReferrer(true)
    }

    if (redirectToReferrer === true) {
        return <Redirect to="/profile" />
    }
}