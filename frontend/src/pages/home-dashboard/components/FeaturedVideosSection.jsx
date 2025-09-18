import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const FeaturedVideosSection = () => {
  const featuredVideos = [
    {
      vid: 1,
      kind: "youtube#searchResult",
      etag: "djk034afBmN4XBkm7u6gSFRMmc4",
      id: { kind: "youtube#video", videoId: "LTw146DxO2c" },
      snippet: {
        publishedAt: "2020-04-10T10:11:20Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Determinants: Minors n cofactors",
        description:
          "Hello everyone, this is Dr Samir Pandey, you can learn how to find minors and cofactors of Determinants. Please like, suggest ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/LTw146DxO2c/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/LTw146DxO2c/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/LTw146DxO2c/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-04-10T10:11:20Z",
      },
    },
    {
      vid: 2,

      kind: "youtube#searchResult",
      etag: "U_TEpP8LnnDqSgClPvidGwPkYnw",
      id: { kind: "youtube#video", videoId: "WV5VF676JU4" },
      snippet: {
        publishedAt: "2020-04-07T11:31:09Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Determinants: Cramer&#39;s Rule",
        description:
          "Hello Guys, this is Dr Samir Pandey, in this video lecture you can understand how to solve the equations using Cramer's Rule.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WV5VF676JU4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WV5VF676JU4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WV5VF676JU4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-04-07T11:31:09Z",
      },
    },
    {
      vid: 3,

      kind: "youtube#searchResult",
      etag: "EXRKnt1GuHdlf3JJAlFTMJEGYXQ",
      id: { kind: "youtube#video", videoId: "Py8qN9Nnfoc" },
      snippet: {
        publishedAt: "2020-04-06T11:53:03Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Determinants !",
        description:
          "Hello everyone, this is Dr Samir Pandey. In this part, you can learn the basics of determinants.. Please like, suggest, share and ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Py8qN9Nnfoc/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Py8qN9Nnfoc/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Py8qN9Nnfoc/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-04-06T11:53:03Z",
      },
    },
    {
      vid: 4,

      kind: "youtube#searchResult",
      etag: "UFy1MVuijXpRVZ2WC9zP-43Ndhc",
      id: { kind: "youtube#video", videoId: "9v2xqhq-xx8" },
      snippet: {
        publishedAt: "2020-04-03T08:53:59Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Complex Number IV",
        description:
          "Hello everyone, please like, comment, suggest n subscribe. Stay at home, be healthy, take care.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/9v2xqhq-xx8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/9v2xqhq-xx8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/9v2xqhq-xx8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-04-03T08:53:59Z",
      },
    },
    {
      vid: 5,

      kind: "youtube#searchResult",
      etag: "CC2mvGIsATDNcmtTvLkWQSjOegI",
      id: { kind: "youtube#video", videoId: "0fiDrgHSlJI" },
      snippet: {
        publishedAt: "2020-04-01T10:47:02Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Complex Number III",
        description:
          "Hello everyone, this is Dr Samir Pandey, welcome all. Discussing about DeMoiver's theorem, cube/nth roots of unity. Please like ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/0fiDrgHSlJI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/0fiDrgHSlJI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/0fiDrgHSlJI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-04-01T10:47:02Z",
      },
    },
    {
      vid: 6,

      kind: "youtube#searchResult",
      etag: "g1ZerLFL1xXyfzM1rxxPhhh314c",
      id: { kind: "youtube#video", videoId: "f3RrxmLjxZU" },
      snippet: {
        publishedAt: "2020-03-30T10:29:47Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Complex Number II",
        description:
          "Hello everyone, this is Dr Samir Pandey, happy welcome to all of you. In this video you can understand Argument and its Principal ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/f3RrxmLjxZU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/f3RrxmLjxZU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/f3RrxmLjxZU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-03-30T10:29:47Z",
      },
    },
    {
      vid: 7,

      kind: "youtube#searchResult",
      etag: "NClIdo1iXEKX_doW3zHhE1jSHno",
      id: { kind: "youtube#video", videoId: "ZYA_5tn-4EI" },
      snippet: {
        publishedAt: "2020-03-27T11:44:08Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Complex Number - I",
        description:
          "Hello everyone, this is Dr Samir Pandey. Please like, comments, suggest and subscribe.. Be Happy.. Always..",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ZYA_5tn-4EI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ZYA_5tn-4EI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ZYA_5tn-4EI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-03-27T11:44:08Z",
      },
    },
    {
      vid: 8,

      kind: "youtube#searchResult",
      etag: "y2o8x-H--l7SLYJGCCWnEsKgxsk",
      id: { kind: "youtube#video", videoId: "VObfqTKmrL8" },
      snippet: {
        publishedAt: "2020-03-25T12:58:01Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Function: Just an Introduction.",
        description:
          'Hello everyone, this is just an introduction of "Function". Lots of relative videos about to come.. please like, comments, subscribe ...',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/VObfqTKmrL8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/VObfqTKmrL8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/VObfqTKmrL8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-03-25T12:58:01Z",
      },
    },
    {
      vid: 9,

      kind: "youtube#searchResult",
      etag: "dOM-G3o4blCK3kkyGchR6aczGn0",
      id: { kind: "youtube#video", videoId: "RtVniFP1eZg" },
      snippet: {
        publishedAt: "2020-03-20T16:35:10Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Introduction...",
        description:
          "Hello everyone.. I am Dr Samir Pandey.. welcome to my youtube channel.. Here you will get find how to make Mathematics easier.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/RtVniFP1eZg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/RtVniFP1eZg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/RtVniFP1eZg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-03-20T16:35:10Z",
      },
    },
    {
      vid: 10,

      kind: "youtube#searchResult",
      etag: "a5ArEGrVLxcV6VdoFxh0CLp6L_w",
      id: {
        kind: "youtube#channel",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
      },
      snippet: {
        publishedAt: "2020-01-10T10:25:43Z",
        channelId: "UCAbXT1aYSDiXHHkakobyLsg",
        title: "Samir Kumar Pandey",
        description: "Mathematics up to Higher Education.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AIdro_kO5sUe1jnzUDf98f6-WNuzTW7dyAdyqkYcqVsGE1Bf-g=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AIdro_kO5sUe1jnzUDf98f6-WNuzTW7dyAdyqkYcqVsGE1Bf-g=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AIdro_kO5sUe1jnzUDf98f6-WNuzTW7dyAdyqkYcqVsGE1Bf-g=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Samir Kumar Pandey",
        liveBroadcastContent: "none",
        publishTime: "2020-01-10T10:25:43Z",
      },
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-success bg-success/10";
      case "Intermediate":
        return "text-warning bg-warning/10";
      case "Advanced":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Popular Video Lessons
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engaging video content that makes complex mathematical concepts easy
            to understand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredVideos?.map((video) => (
            <div
              key={video?.vid}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth"
            >
              <div className="relative aspect-video bg-muted">
                <img
                  src={`https://img.youtube.com/vi/${video?.id?.channelId}/maxresdefault.jpg`}
                  alt={video?.snippet?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Play" size={24} color="white" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {video?.snippet?.title}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                  {video?.snippet?.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {video?.snippet?.description}
                </p>

                <Link to={`/video-learning-center?v=${video?.id?.channelId}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    className="w-full"
                  >
                    Watch Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/video-learning-center">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore All Videos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideosSection;
