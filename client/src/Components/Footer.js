import React from "react";
import { Link } from "react-router-dom";
import Logo from './StepsImages/Logo.png'; // Replace with your actual logo path

const Footer = () => {
    const styles = {
        footerContainer: {
            backgroundColor: "#f0f0f0",
            padding: "20px",
            textAlign: "center",
            lineHeight: "1.25rem",
            letterSpacing: ".0178571429em",
            fontSize: ".91rem",
            color: "rgb(95, 99, 104)",
            fontWeight: "550",
        },
        footerDiv: {
            marginBottom: "10px",
        },
        logo: {
            maxWidth: "100px",
            height: "auto",
            marginRight: "10px",
        },
        rows:{
            display:"flex",
            alignItems:"center",
            justifyContent:"space between"
        }
    };

    return (
        <footer className="footer" style={styles.footerContainer}>
            <div className="container">
                <div className="row" style={styles.rows}>
                    <div className="col-md-4">
                        <Link to="/" className="footer-logo">
                            <img src={Logo} alt="Logo" style={styles.logo} />
                        </Link>
                    </div>
                    <div className="col-md-8">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <Link to="/privacypolicy" className="footer-link" style={{ textDecoration: "none" }}>Privacy Policy</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/terms" className="footer-link" style={{ textDecoration: "none" }}>Terms and Conditions</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/contact" className="footer-link" style={{ textDecoration: "none" }}>Contact us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p style={{ margin: "0px", fontSize: "13px" }}>&copy; 2024 HD Downloader. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
