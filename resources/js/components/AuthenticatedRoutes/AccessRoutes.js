import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";

function AccessRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authed === true ? (
                    <Component {...props} exact={true} />
                ) : (
                        <Redirect
                            to={{
                                pathname: `${PUBLIC_URL}loginuser`,
                                state: { from: props.location },
                            }}
                        />
                    )
            }
        />

    //     <Route path={path}
    //    {...rest}
    //    render={props =>authed === true? (
    //    <Component {...props} />) : (<Redirect to={{
    //    pathname: "/OARS/loginuser",
    //    state: {
    //      prevLocation: path,
    //      error: "You need to login first!",
    //    },
    //   }}
    //   />
    );
}

export default AccessRoute;

