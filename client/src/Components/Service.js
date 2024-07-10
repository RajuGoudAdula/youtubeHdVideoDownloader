import React from 'react';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
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
  list: {
    paddingLeft: '20px',
    marginBottom: '10px',
  },
  listItem: {
    marginBottom: '5px',
  }
};

function Service() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Our Services</h1>
      <p style={styles.paragraph}>
        At HD Downloader, we provide a range of services designed to make downloading educational videos from YouTube easy and convenient. Our services are tailored to meet the needs of students, educators, and lifelong learners who require high-quality video content for offline use.
      </p>

      <h2 style={styles.subheading}>Video Download Services</h2>
      <p style={styles.paragraph}>
        We offer a robust video downloading service that allows users to download YouTube videos in various formats and resolutions, ensuring compatibility with different devices and preferences.
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}><strong>HD and 4K Video Downloads:</strong> Access high-definition (HD) and 4K video content to ensure the best viewing experience.</li>
        <li style={styles.listItem}><strong>Multiple Formats:</strong> Download videos in various formats such as MP4, AVI, and more to suit your needs.</li>
        <li style={styles.listItem}><strong>Batch Downloading:</strong> Download multiple videos simultaneously, saving you time and effort.</li>
        <li style={styles.listItem}><strong>Subtitle Support:</strong> Download subtitles along with videos to enhance your learning experience.</li>
      </ul>

      <h2 style={styles.subheading}>User-Friendly Interface</h2>
      <p style={styles.paragraph}>
        Our platform is designed to be user-friendly, making it easy for anyone to download videos with just a few clicks. The intuitive interface ensures that even users with minimal technical knowledge can navigate and use our services effectively.
      </p>

      <h2 style={styles.subheading}>Fast and Reliable</h2>
      <p style={styles.paragraph}>
        Enjoy quick download speeds and reliable service. Our platform is optimized to handle large files and multiple downloads without compromising on speed or performance.
      </p>

      <h2 style={styles.subheading}>Secure and Private</h2>
      <p style={styles.paragraph}>
        We prioritize your privacy and security. Our services are designed to protect your data and ensure that your downloads are secure. We do not track your download activities, and we use secure connections to safeguard your information.
      </p>

      <h2 style={styles.subheading}>Dedicated Support</h2>
      <p style={styles.paragraph}>
        Our dedicated support team is here to help you with any issues or questions you may have. Whether you need assistance with downloading videos or have queries about our services, we are here to provide you with the support you need.
      </p>

      <p style={styles.paragraph}>
        Thank you for choosing HD Downloader. We are committed to providing you with the best possible service and helping you achieve your educational goals through easy access to high-quality video content.
      </p>
    </div>
  );
}

export default Service;
