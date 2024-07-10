import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from 'react-bootstrap';
import Steps from "./Steps";

const styles={
  inputField:{
          height: '44px',
          width: '500px',
          borderRadius: '24px 0 0 24px',
          border: '1px solid #dfe1e5',
          boxShadow: 'none',
          paddingLeft: '20px',
          paddingRight: '20px',
          lineHeight: "1.25rem",
          letterSpacing: ".0178571429em",
          fontSize: ".91rem",
          color: "rgb(95, 99, 104)",
          fontWeight: "550",
  },
  submitButton:{
          height: '44px',
          borderRadius: '0 24px 24px 0',
          border: '1px solid #dfe1e5',
          borderLeft: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
  },
  imageDiv:{
     padding:"10px",
     lineHeight: "1.25rem",
     letterSpacing: ".0178571429em",
     fontSize: ".91rem",
     color: "rgb(95, 99, 104)",
     fontWeight: "550",
    
  },
  imgField:{
      height:"150px",
      width:"100%",
      objectFit: "cover",
      borderRadius:"7px 7px 0px 0px",
     
      
  },
  qualityItems:{
    fontSize: ".91rem",
    fontWeight: "600",
  },
  progressField:{
     maxWidth: '600px',
      margin: 'auto' ,
      lineHeight: "1.25rem",
      letterSpacing: ".0178571429em",
      fontSize: ".91rem",
      color: "rgb(95, 99, 104)",
      fontWeight: "550",
  },
  divStyleField:{
    position: "absolute",
        width: "100%",
        backgroundColor: "rgb(232, 234, 237)",
        zIndex: "-1",
        bottom: "0",
        height: "266px",
  },
  title:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   lineHeight:"normal",
   fontSize:"55px",
   fontWeight:"700",
   color:"black"

  },
  // note:{
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding:"10px",
  //    lineHeight: "1.25rem",
  //    letterSpacing: ".0178571429em",
  //    fontSize: ".91rem",
  //    color: "rgb(95, 99, 104)",
  //    fontWeight: "550",

  // }

}


function Form() {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(secs)}`;
  }

  function padWithZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  const filterAndRemoveDuplicates = (qualities) => {
    const allowedQualities = [
      { qualityLabel: '2160p', container: 'webm' },
      { qualityLabel: '1440p', container: 'webm' },
      { qualityLabel: '1080p', container: 'mp4' },
      { qualityLabel: '720p', container: 'mp4' },
      { qualityLabel: '480p', container: 'mp4' },
      { qualityLabel: '360p', container: 'mp4' },
      { qualityLabel: '240p', container: 'mp4' },
      { qualityLabel: '144p', container: 'mp4' },
    ];

    const filtered = qualities.filter(q => 
      allowedQualities.some(aq => aq.qualityLabel === q.qualityLabel && aq.container === q.container)
    );

    const unique = filtered.reduce((acc, current) => {
      const x = acc.find(item => item.qualityLabel === current.qualityLabel && item.container === current.container);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return unique;
  };

  function isInstagramUrl(url) {
    // Regular expression to match Instagram URLs
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/.+/i;

    return instagramRegex.test(url);
}


  async function handlesubmit(e) {
    e.preventDefault();
    try {
      if(isInstagramUrl(url)){
        await setDownloaded(false);
        await setIsDownloading(true);
        alert('You are downloading instagram reel/post');
        const response = await axios.post('http://127.0.0.1:5000/instaLink', { url });
        downloadVideos(response.data.url_list);

        async function downloadVideos(videoUrls) {
          for (let index = 0; index < videoUrls.length; index++) {
              const videourl = videoUrls[index];              
              const response = await fetch(videourl);
              const blob = await response.blob();
              
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.setAttribute('download', `instagram_reel_${Date.now()}_${index}.mp4`);
              document.body.appendChild(link);
              
              link.click();
              
              document.body.removeChild(link);
              
              // Clean up the object URL
              URL.revokeObjectURL(link.href);
              
              // Wait for a short period to ensure the download starts before proceeding to the next one
              await new Promise(resolve => setTimeout(resolve, 1000));
          }
      }
          // console.log("downloaded"); // Clean up the link after clicking
          await setIsDownloading(false);
          await setDownloaded(true);
      }else{
        setVideoDetails(null);
        const response = await axios.post('http://127.0.0.1:5000/submitLink', { url });
        // console.log(response);
        setVideoDetails(response);
        setShowAll(false);
        setDownloaded(false);
        // console.log('Link submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting link:', error.message);
    }
  }

  async function handledownload(url, quality, container) {
    alert(`Your are started downloading video in ${quality}.${container}`);
    setDownloadProgress(0); // Reset progress bar before new download
    setIsDownloading(true);
    setDownloaded(false);

    

    try {

      const eventSource = new EventSource('http://127.0.0.1:5000/increment');
        
      eventSource.onmessage =async function (event) {
          await setDownloadProgress(event.data);
      };

      eventSource.onerror = function () {
          eventSource.close();
      };
     


      const response = await axios.post('http://127.0.0.1:5000/videoDetails', { url, quality, container }, {
        responseType: 'blob',
        onDownloadProgress:async (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          let percentCompleted =75 + Math.floor((current / total) * 25);
          // Ensure it reaches 100% at the end
          if (downloaded) {
            percentCompleted = 100;
          }

          // Log progress for debugging
          // console.log(`Progress: ${percentCompleted}%`);

          await setDownloadProgress(percentCompleted);
        }
      });

      

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', `${videoDetails.data.title}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setIsDownloading(false);
      setDownloaded(true);
      // console.log("Downloaded");
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  }

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="container mt-5" style={{fontFamily:"Google Sans,Roboto,Arial,sans-serif"}}>
      <h2 style={styles.title}>HD Downloader</h2>
      {/* <h5 style={styles.note} >
        NOTE:Please download videos if you have permission from video owner or own videos.
      </h5> */}
      <div className=" p-4 mb-3" style={{ maxWidth: '600px', margin: 'auto' }}>
        <form onSubmit={handlesubmit}>
          <div className="form-group d-flex">
            <input
              value={url}
              placeholder="Paste YouTube link here"
              className="form-control form-control-sm"
              style={styles.inputField}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-danger ml-2" style={styles.submitButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
              
            </button>
          </div>
        </form>
      </div>
       {/* {!videoDetails && <div style={styles.imageDiv}><p>Fetching....</p></div>} */}
      {videoDetails && (
        
        <div className="border rounded p-4 d-flex flex-column flex-md-row" style={{ maxWidth: '600px', margin: 'auto' }}>
          <div className="d-flex flex-column align-items-start mb-3 mb-md-0" style={styles.imageDiv}>
            <img src={videoDetails.data.thumbnailUrl} alt="Thumbnail" className="img-fluid mb-2" style={styles.imgField} />
            <p className="mb-2">Title: {videoDetails.data.title}</p>
            <p>Duration: {secondsToTime(videoDetails.data.duration)}</p>
          </div>
          <div className="d-flex flex-column" >
            {filterAndRemoveDuplicates(videoDetails.data.videoQualities).slice(0, showAll ? undefined : 3).map((quality, index) => (
              <div key={index} className="my-2 d-flex justify-content-between align-items-center" >
                <h5 className="mb-0" style={{fontWeight:"600"}}>{quality.qualityLabel || 'Audio Only'} {quality.container}</h5>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => handledownload(videoDetails.data.videoLink, quality.qualityLabel, quality.container)}
                >
                  Download
                </button>
              </div>
            ))}
            {filterAndRemoveDuplicates(videoDetails.data.videoQualities).length > 3 && (
              <button className="btn btn-secondary mt-2" onClick={handleShowMore}>
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
        
      
      )}

      {downloadProgress > 0 && isDownloading && (
        <div className="mt-3" style={styles.progressField}>
          {isDownloading && <p>Downloading.....</p>}
          <ProgressBar now={downloadProgress} label={`${downloadProgress}%`} />
        </div>
      )}
      <div className="mt-3" style={styles.progressField}>
      {downloaded && <p>Download completed successfully!</p>}
      </div>
      <Steps />
    </div>
  );
}

export default Form;
