export const TABS = ["All", "Music", "Mixes", "JavaScript" , "Data Structure", "Live", "Presentation", "Body-building", "New to your", "Music", "Mixes", "JavaScript" , "Data Structure", "Live", "Presentation"]

export const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  

// --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
//   --header 'Accept: application/json' \
//   --compressed