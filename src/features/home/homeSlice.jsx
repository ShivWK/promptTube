import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHomeLoading: true,
    videos: [],
};

const homeSlice = createSlice({
    name: "home",
    initialState,

    reducers: {
        setHomeLoading: (state,action) => {
            state.isHomeLoading = action.payload
        },

        setHomeVideos: (state, action) => {
            state.videos = action.payload
        }
    }
});

export default homeSlice.reducer;

export const selectHomeLoading = (state) => state.home.isHomeLoading;
export const selectHomeVideos = state => state.home.videos;

export const {
    setHomeLoading,
    setHomeVideos
} = homeSlice.actions;

[
    {
        "kind": "youtube#video",
        "etag": "LMeMnGf9gvB02R0dant7dnimgs4",
        "id": "Ks-_Mh1QhMc",
        "snippet": {
            "publishedAt": "2012-10-01T15:27:35Z",
            "channelId": "UCAuUUnT6oDeKwE6v1NGQxug",
            "title": "Your Body Language May Shape Who You Are | Amy Cuddy | TED",
            "description": "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
                "standard": {
                    "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/sddefault.jpg",
                    "width": 640,
                    "height": 480
                },
                "maxres": {
                    "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                }
            },
            "channelTitle": "TED",
            "tags": [
                "Amy Cuddy",
                "TED",
                "TEDTalk",
                "TEDTalks",
                "TED Talk",
                "TED Talks",
                "TEDGlobal",
                "brain",
                "business",
                "psychology",
                "self",
                "success"
            ],
            "categoryId": "22",
            "liveBroadcastContent": "none",
            "defaultLanguage": "en",
            "localized": {
                "title": "Your Body Language May Shape Who You Are | Amy Cuddy | TED",
                "description": "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED"
            },
            "defaultAudioLanguage": "en"
        },
        "contentDetails": {
            "duration": "PT21M3S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "true",
            "licensedContent": true,
            "contentRating": {},
            "projection": "rectangular"
        },
        "statistics": {
            "viewCount": "27519301",
            "likeCount": "510108",
            "favoriteCount": "0",
            "commentCount": "10542"
        }
    },
    {
        "kind": "youtube#video",
        "etag": "UfoDH4NVh7qxgb5ljRaK36E_CBQ",
        "id": "c0KYU2j0TM4",
        "snippet": {
            "publishedAt": "2012-03-02T19:03:16Z",
            "channelId": "UCAuUUnT6oDeKwE6v1NGQxug",
            "title": "The power of introverts | Susan Cain | TED",
            "description": "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nIn a culture where being social and outgoing are prized above all else, it can be difficult, even shameful, to be an introvert. But, as Susan Cain argues in this passionate talk, introverts bring extraordinary talents and abilities to the world, and should be encouraged and celebrated.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. \n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\nSubscribe to our channel: http://youtube.com/TED\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy (https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy). For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
                "standard": {
                    "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/sddefault.jpg",
                    "width": 640,
                    "height": 480
                },
                "maxres": {
                    "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                }
            },
            "channelTitle": "TED",
            "tags": [
                "Susan Cain",
                "culture",
                "psychology",
                "introvert",
                "Quiet",
                "Power of Introverts Book",
                "extravert",
                "TED",
                "TED2012",
                "TEDTalk",
                "TEDTalks",
                "TED Talk",
                "TED Talks"
            ],
            "categoryId": "22",
            "liveBroadcastContent": "none",
            "defaultLanguage": "en",
            "localized": {
                "title": "The power of introverts | Susan Cain | TED",
                "description": "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nIn a culture where being social and outgoing are prized above all else, it can be difficult, even shameful, to be an introvert. But, as Susan Cain argues in this passionate talk, introverts bring extraordinary talents and abilities to the world, and should be encouraged and celebrated.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. \n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\nSubscribe to our channel: http://youtube.com/TED\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy (https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy). For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com"
            },
            "defaultAudioLanguage": "en"
        },
        "contentDetails": {
            "duration": "PT19M5S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "true",
            "licensedContent": true,
            "contentRating": {},
            "projection": "rectangular"
        },
        "statistics": {
            "viewCount": "17165731",
            "likeCount": "432454",
            "favoriteCount": "0",
            "commentCount": "18871"
        }
    },
    {
        "kind": "youtube#video",
        "etag": "n1p5gdknl8VxOgrd-wYEvt6g1P4",
        "id": "eIho2S0ZahI",
        "snippet": {
            "publishedAt": "2014-06-27T15:10:18Z",
            "channelId": "UCAuUUnT6oDeKwE6v1NGQxug",
            "title": "How to Speak So That People Want to Listen | Julian Treasure | TED",
            "description": "Have you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding. (Recorded at TEDGlobal 2013 on June 10, 2013)\n\nIf you love watching TED Talks like this one, become a TED Member to support our mission of spreading ideas: https://ted.com/membership\n\nFollow TED! \nX: https://twitter.com/TEDTalks\nInstagram: https://www.instagram.com/ted\nFacebook: https://facebook.com/TED\nLinkedIn: https://www.linkedin.com/company/ted-conferences\nTikTok: https://www.tiktok.com/@tedtoks\n\nThe TED Talks channel features talks, performances and original series from the world's leading thinkers and doers. Subscribe to our channel for videos on Technology, Entertainment and Design — plus science, business, global issues, the arts and more. Visit https://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nWatch more: https://go.ted.com/juliantreasure\n\nhttps://youtu.be/eIho2S0ZahI\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy: https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy. For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com\n\n#TED #TEDTalks #speech",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/eIho2S0ZahI/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/eIho2S0ZahI/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/eIho2S0ZahI/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
                "standard": {
                    "url": "https://i.ytimg.com/vi/eIho2S0ZahI/sddefault.jpg",
                    "width": 640,
                    "height": 480
                },
                "maxres": {
                    "url": "https://i.ytimg.com/vi/eIho2S0ZahI/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                }
            },
            "channelTitle": "TED",
            "tags": [
                "TEDTalk",
                "TEDTalks",
                "TED Talk",
                "TED Talks",
                "TED",
                "Julian Treasure",
                "culture",
                "sound",
                "speech",
                "TEDGlobal"
            ],
            "categoryId": "26",
            "liveBroadcastContent": "none",
            "defaultLanguage": "en",
            "localized": {
                "title": "How to Speak So That People Want to Listen | Julian Treasure | TED",
                "description": "Have you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding. (Recorded at TEDGlobal 2013 on June 10, 2013)\n\nIf you love watching TED Talks like this one, become a TED Member to support our mission of spreading ideas: https://ted.com/membership\n\nFollow TED! \nX: https://twitter.com/TEDTalks\nInstagram: https://www.instagram.com/ted\nFacebook: https://facebook.com/TED\nLinkedIn: https://www.linkedin.com/company/ted-conferences\nTikTok: https://www.tiktok.com/@tedtoks\n\nThe TED Talks channel features talks, performances and original series from the world's leading thinkers and doers. Subscribe to our channel for videos on Technology, Entertainment and Design — plus science, business, global issues, the arts and more. Visit https://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nWatch more: https://go.ted.com/juliantreasure\n\nhttps://youtu.be/eIho2S0ZahI\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy: https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy. For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com\n\n#TED #TEDTalks #speech"
            },
            "defaultAudioLanguage": "en"
        },
        "contentDetails": {
            "duration": "PT9M59S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "true",
            "licensedContent": true,
            "contentRating": {},
            "projection": "rectangular"
        },
        "statistics": {
            "viewCount": "47127314",
            "likeCount": "1061124",
            "favoriteCount": "0",
            "commentCount": "14546"
        }
    }
]
