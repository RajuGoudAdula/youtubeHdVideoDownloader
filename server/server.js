const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ytdl = require('ytdl-core');
const instagramGetUrl = require('instagram-url-direct');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const progress = require('progress-stream');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const port = 5000;


const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/submitLink', async (req, res) => {
  const { url } = req.body;
  try {
    const videoDetails = await getYouTubeVideoDetails(url);
    // console.log(videoDetails);
    res.json(videoDetails);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve video details' });
  }
});

app.post('/instaLink',async (req,res)=>{
  try {
    const { url } = req.body;
    const urlData = await instagramGetUrl(url);
    res.json(urlData); 
} catch (error) {
    console.error('Error in downloadMedia:', error);
    res.status(500).json({ error: 'Failed to download video ' });

}
})



app.post('/videoDetails', async (req, res) => {
  const { url, quality, container} = req.body;
  const outputDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  try {
    const videoInfo = await ytdl.getInfo(url);
    const videoFormats = ytdl.filterFormats(videoInfo.formats, 'video');
    
    const selectedVideoFormat = videoFormats.find(format => format.qualityLabel === quality && format.container === container);
    
    const videoLength=selectedVideoFormat.contentLength;
    if (!selectedVideoFormat) {
      throw new Error('Requested quality not available');
    }

    const videoTitle = videoInfo.videoDetails.title.replace(/[\/:*?"<>|]/g, '');
    const videoPath = path.join(outputDir, `${videoTitle}_video.${selectedVideoFormat.container}`);
    const audioPath = path.join(outputDir, `${videoTitle}_audio.mp4`);
    const outputPath = path.join(outputDir, `${videoTitle}_merged.mp4`);
    let combinedProgress=0,audioNumber=0,videoNumber=0;

    // Set up the progress stream
    const progressStream = progress({
      length: videoLength, // Assuming the length is fixed
      time: 100 // ms
    });

    
    progressStream.on('progress', async (progress) => {
      // Calculate the percentage completion relative to 100
      const percentageCompletion = (progress.transferred / videoLength) * 50;
      videoNumber = Math.round(percentageCompletion);
      // Combine with audio progress
      combinedProgress = videoNumber + audioNumber;

      // Send the combined number
      await sendNumber(combinedProgress);
      
      // Log  the progress percentage
      // console.log(`Progress: ${combinedProgress}%`);   
    });

    
    // Download video
    const videoStream = ytdl(url, { format: selectedVideoFormat }).pipe(progressStream).pipe(fs.createWriteStream(videoPath));
    await new Promise((resolve, reject) => {
      videoStream.on('finish', resolve);
      videoStream.on('error', reject);
    });
    
    const audioLength= ytdl.filterFormats(videoInfo.formats, 'audioonly')[0].contentLength;
    // console.log(audioLength);

    // Set up the progress stream
    const progressStreamOfAudio = progress({
      length: audioLength, // Assuming the length is fixed
      time: 100 // ms
    });
  
    progressStreamOfAudio.on('progress', async (progress) => {
      // Calculate the percentage completion relative to 100
      const percentageCompletion = (progress.transferred / audioLength) * 25;
      const audioNumber = Math.round(percentageCompletion);
      // Combine with video progress
      combinedProgress = videoNumber + audioNumber;

      // Send the combined number
      await sendNumber(combinedProgress);
      
      // Log  the progress percentage
      // console.log(`Progress: ${combinedProgress}%`);   
    });

    // Download audio in selected container
    const audioStream = ytdl(url, { filter: 'audioonly' }).pipe(progressStreamOfAudio).pipe(fs.createWriteStream(audioPath));
    await new Promise((resolve, reject) => {
      audioStream.on('finish', resolve);
      audioStream.on('error', reject);
    });
    console.log('Download successful');
   
    await sendNumber(-1);


    // Merge video and audio into MP4
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoPath)
        .input(audioPath)
        .outputOptions('-c:v copy') // Copy the video codec from the original file
        .outputOptions('-c:a aac') // Use AAC for audio
        .outputOptions('-shortest')
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('progress', (progress) => {
          // Assuming we have a fixed target size for simplicity
          
          const percentageCompletion = (progress.targetSize );
          const number = Math.round(percentageCompletion);
          
          // Log the progress percentage
          // console.log(`Processing: ${number}%`);
        })
        .on('end', () => {
          console.log('Merging finished!');
          fs.unlinkSync(videoPath);
          fs.unlinkSync(audioPath);
          resolve();
        })
        .on('error', (err) => {
          console.error('Error during merging:', err);
          reject(err);
        })
        .run();
    });
    
    res.download(outputPath, `${videoTitle}.mp4`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Failed to download video');
      } else {
        fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    // Delete the output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
    res.status(500).send('Failed to download video');
  }
});

let number=0;
function sendNumber(n){
  number=n;
}

app.get('/increment', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  

  const interval = setInterval(() => {
      
        if(number!=-1){
          // console.log(`Incrementing number: ${number}`);
          res.write(`data: ${number}\n\n`);
        }else{
          clearInterval(interval);
          number=0;
            res.end();
        }
      
      
  }, 100); // 100ms interval for demonstration

  req.on('close', () => {
      clearInterval(interval);
      res.end();
  });
});


async function getYouTubeVideoDetails(videoLink) {
  try {
    const videoInfo = await ytdl.getInfo(videoLink);
    const videoId = videoInfo.videoDetails.videoId;
    const title = videoInfo.videoDetails.title;
    const duration = videoInfo.videoDetails.lengthSeconds;
    const videoQualities = videoInfo.formats.map(items => {
      return {
        qualityLabel: items.qualityLabel,
        hasVideo: items.hasVideo,
        hasAudio: items.hasAudio,
        container: items.container,
        audioCodec:items.audioCodec,
        videoCodec:items.videoCodec,
        codecs:items.codecs
      }
    });
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    return {
      videoId: videoId,
      title: title,
      thumbnailUrl: thumbnailUrl,
      duration: duration,
      videoQualities: videoQualities,
      videoLink: videoLink
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Failed to retrieve video details');
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
