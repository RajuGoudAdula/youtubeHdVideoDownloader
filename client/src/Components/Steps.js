import React from "react";

function Steps() {
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
        section: {
            width: "80%",
            padding: "20px",
            lineHeight: "1.25rem",
            letterSpacing: ".0178571429em",
            fontSize: ".91rem",
            color: "rgb(95, 99, 104)",
            fontWeight: "550",
            marginBottom: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        },
        leftStep: {
            textAlign: "left",
        },
        rightStep: {
            textAlign: "right",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h2>Steps to download Youtube videos</h2>
                <div style={styles.leftStep}>
                    <p>Step 1</p>
                    <p>Step 3</p>
                </div>
                <div style={styles.rightStep}>
                    <p>Step 2</p>
                    <p>Step 4</p>
                </div>
            </div>
            <div style={{ ...styles.section, marginTop: "20px" }}>
                <h2>Steps to download Instagram videos</h2>
                <div style={styles.leftStep}>
                    <p>Step 1</p>
                    <p>Step 3</p>
                </div>
                <div style={styles.rightStep}>
                    <p>Step 2</p>
                </div>
            </div>
        </div>
    );
}

export default Steps;
