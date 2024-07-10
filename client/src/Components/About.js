import React from 'react';

const styles = {
  container: {
    fontFamily: "Google Sans, Roboto, Arial, sans-serif",
    padding:"10px",
     lineHeight: "1.25rem",
     letterSpacing: ".0178571429em",
     fontSize: ".91rem",
     color: "rgb(95, 99, 104)",
     fontWeight: "550",
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.5',
    marginBottom: '10px',
  },
};

function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to HD Downloader, your number one source for downloading high-quality YouTube videos in HD and 4K. Our website is dedicated to providing a seamless and efficient way to download educational content from YouTube, enabling learners to access valuable resources anytime, anywhere.
      </p>
      
      <h2 style={styles.subheading}>Our Mission</h2>
      <p style={styles.paragraph}>
        At HD Downloader, we believe in the power of education and the importance of having access to high-quality learning materials. Our mission is to support students, educators, and lifelong learners by making it easy to download educational videos from YouTube. Whether you're studying for exams, learning a new skill, or preparing teaching materials, YT4K is here to assist you.
      </p>
      
      <h2 style={styles.subheading}>What We Offer</h2>
      <p style={styles.paragraph}>
        <strong>High Definition Video Downloads:</strong> Download videos in HD and 4K quality to ensure you have the best viewing experience.
      </p>
      <p style={styles.paragraph}>
        <strong>User-Friendly Interface:</strong> Our platform is designed to be intuitive and easy to use, allowing you to download videos with just a few clicks.
      </p>
      <p style={styles.paragraph}>
        <strong>Fast and Reliable:</strong> Enjoy quick download speeds and reliable service, ensuring you can access the videos you need without delay.
      </p>
      
      <h2 style={styles.subheading}>Why Choose HD Downloader?</h2>
      <p style={styles.paragraph}>
        <strong>Educational Focus:</strong> We specialize in providing tools for downloading educational content, making us the go-to resource for students and educators.
      </p>
      <p style={styles.paragraph}>
        <strong>Quality Assurance:</strong> We prioritize high-quality video downloads to ensure that you can enjoy clear and crisp educational content.
      </p>
      <p style={styles.paragraph}>
        <strong>Secure and Private:</strong> Your privacy is important to us. We ensure that your data is protected and that your downloads are secure.
      </p>
      
      <h2 style={styles.subheading}>Our Vision</h2>
      <p style={styles.paragraph}>
        We envision a world where quality education is accessible to everyone, regardless of their location or internet connection. By enabling the download of educational videos, we aim to bridge the gap between online resources and offline learning.
      </p>
      
      <p style={styles.paragraph}>
        Thank you for choosing HD Downloader. We are committed to supporting your educational journey and helping you achieve your learning goals. If you have any questions or feedback, please feel free to contact us.
      </p>
    </div>
  );
}

export default About;
