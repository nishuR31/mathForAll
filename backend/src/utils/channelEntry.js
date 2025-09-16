import fs from "fs";

export let videoData = async () => {
  try {
    let res = await fetch(
      "https://www.googleapis.com/youtube/v3/search?key=AIzaSyC4CmvLNvIsNNNz1Xf5J6avtBdA8izw2go&channelId=UCAbXT1aYSDiXHHkakobyLsg&part=snippet,id&order=date&maxResults=30"
    );
    let data = await res.json();
    let info = JSON.stringify(data.items);
    let done = fs.writeFileSync("../data/videos.json", info);
    console.log(`Data written to file`);
    return 1;
  } catch (err) {
    console.error(`Error writing data to file.`, err.message);
    return 0;
  }
};

export let channelData = async () => {
  try {
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCAbXT1aYSDiXHHkakobyLsg&key=AIzaSyC4CmvLNvIsNNNz1Xf5J6avtBdA8izw2go`
    );
    let data = await res.json();
    let info = JSON.stringify(data.items);
    let done = fs.writeFileSync("../data/channel.json", info);
    console.log(`Data written to file`);
    return 1;
  } catch (err) {
    console.error(`Error writing data to file.`, err.message);
    return 0;
  }
};
