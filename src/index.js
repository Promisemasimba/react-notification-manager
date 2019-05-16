//@flow
import * as React from "react";
import { Portal } from "reakit/Portal";

type NotificationRender = ({|
    close: () => void,
|}) => React.Node;

type NotificationContextType = {|
    createNotification: (render: NotificationRender) => void,
    closeNotification: () => void,
|};

type NotificationManagerReducerState = {|
    active: ?React.Node,
    queue: Array<() => React.Node>,
|};

type NotificationManagerReducerActions =
    | {|
          type: "CREATE",
          render: () => React.Node,
      |}
    | {|
          type: "CLOSE",
      |};

const NotificationContext = React.createContext<NotificationContextType | void>();

export const useNotificationManager = () => {
    const context = React.useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotificationManager and NotificationConsumer must be used within a NotificationProvider"
        );
    }
    return context;
};

const initialState = {
    active: null,
    queue: [],
};

function NotificationManagerReducer(
    state: NotificationManagerReducerState = initialState,
    action: NotificationManagerReducerActions
) {
    switch (action.type) {
        case "CREATE": {
            if (!state.active && state.queue.length === 0) {
                return {
                    ...state,
                    active: action.render(),
                };
            }
            return {
                ...state,
                queue: [...state.queue, action.render],
            };
        }
        case "CLOSE": {
            const queue = state.queue.slice(1);
            const active = queue.length > 0 ? queue[0]() : null;
            return {
                ...state,
                active,
                queue,
            };
        }
        default:
            return state;
    }
}

export function NotificationProvider({ children }: { children: React.Node }) {
    const [{ active }, dispatch] = React.useReducer(NotificationManagerReducer, initialState);

    const closeNotification = React.useCallback(() => dispatch({ type: "CLOSE" }), [dispatch]);

    const createNotification = React.useCallback(
        render => dispatch({ type: "CREATE", render: () => render({ close: closeNotification }) }),
        [closeNotification, dispatch]
    );

    const contextValue = React.useMemo(() => ({ createNotification, closeNotification }), [
        createNotification,
        closeNotification,
    ]);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            <Portal>{active}</Portal>
        </NotificationContext.Provider>
    );
}
