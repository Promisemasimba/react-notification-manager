import React from "react";

import { storiesOf } from "@storybook/react";

import { NotificationProvider, useNotificationManager } from "../src/index.js";

function SampleNotification({ close }) {
    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#ccc",
                padding: "5em",
            }}>
            <button onClick={close}>Close</button>
        </div>
    );
}

function NotificationCreator() {
    const { createNotification } = useNotificationManager();
    return (
        <button
            onClick={() => createNotification(({ close }) => <SampleNotification close={close} />)}>
            Open Notification
        </button>
    );
}

function NotificationEffect() {
    const { createNotification } = useNotificationManager();
    const [ready, setReady] = React.useState(false);

    // This doesn't cover edge cases but is good enough for demo purposes
    React.useEffect(() => {
        if (ready) {
            setTimeout(() => {
                const {close} = createNotification(SampleNotification)
                setReady(false);

                setTimeout(() => {
                    close();
                }, 1000)
            }, 1000)
        }
    }, [ready])

    return <button onClick={() => setReady(true)} disabled={ready}>Start timer</button>;
}

const stories = storiesOf("NotificationManager", /*eslint-disable-line no-undef*/ module);
stories.add("basic", () => {
    return (
        <NotificationProvider>
            <NotificationCreator />
            {/* <NotificationEffect /> */}
        </NotificationProvider>
    );
});
