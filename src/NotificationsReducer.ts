type Notification = {
    id: string;
    component: () => React.ReactElement<any>;
    destroy: () => void;
};

export type State = {
    queue: Array<Notification>;
};

type Actions =
    | { type: "CREATE"; id: string; component: () => React.ReactElement<any>; destroy: () => void }
    | { type: "DESTROY"; id: string }
    | { type: "POP" };

export const INITIAL_STATE: State = {
    queue: [],
};

export function NotificationsReducer(state: State = INITIAL_STATE, action: Actions) {
    switch (action.type) {
        case "CREATE": {
            const notification: Notification = {
                id: action.id,
                component: action.component,
                destroy: action.destroy,
            };
            return {
                ...state,
                queue: [...state.queue, notification],
            };
        }
        case "DESTROY": {
            return {
                ...state,
                queue: state.queue.filter((notification) => notification.id !== action.id),
            };
        }
        case "POP": {
            const [_, ...rest] = state.queue;
            return {
                ...state,
                queue: rest,
            };
        }
        default:
            return state;
    }
}
