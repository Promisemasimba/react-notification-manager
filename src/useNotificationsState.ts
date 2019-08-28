import * as React from "react";
//@ts-ignore
import shortid from "shortid";
import { NotificationsReducer, INITIAL_STATE } from "./NotificationsReducer";

import { NotificationsContext } from "./createScopedNotificationsManager";

export function useNotificationsState() {
    const [state, dispatch] = React.useReducer(NotificationsReducer, INITIAL_STATE);
    const actions = React.useMemo<NotificationsContext>(
        () => ({
            create: (component: () => React.ReactElement<any>) => {
                const id = shortid.generate();
                const destroy = () => dispatch({ type: "DESTROY", id });
                dispatch({
                    type: "CREATE",
                    id,
                    component,
                    destroy,
                });
                return { destroy };
            },
            destroy: (id: string) => {
                dispatch({
                    type: "DESTROY",
                    id,
                });
            },
            pop: () => {
                dispatch({
                    type: "POP",
                });
            },
        }),
        []
    );

    return { state, dispatch, actions };
}
