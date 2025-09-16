import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import SearchBar from "./components/SearchBar";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./components/VideoPlayer";
import TopicCard from "./components/TopicCard";
import RelatedVideos from "./components/RelatedVideos";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";

const API_KEY = import.meta.env.VITE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const VideoLearningCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Channel Information - Updated with the Maths 4 All branding
  const [channelInfo, setChannelInfo] = useState({
    name: "Mathematics For All",
    handle: "@mathematicsforall9108",
    owner: "Samir Kumar Pandey",
    channelId: CHANNEL_ID,
    title: "Loading",
    description: "Loading",
    avatar: "/assets/images/logo.png",
    subscriberCount: "Loading",
    videoCount: "Loading",
    banner: [
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=120&h=30&fit=crop",
    ],
  });

  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        console.log("channel data fetching");

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCAbXT1aYSDiXHHkakobyLsg&key=AIzaSyC4CmvLNvIsNNNz1Xf5J6avtBdA8izw2go`
        );
        const data = await res.json();

        const channel = data.items[0];

        setChannelInfo({
          name: "Mathematics For All",
          handle: "@mathematicsforall9108",
          owner: "Samir Kumar Pandey",
          channelId: channel?.id ?? CHANNEL_ID,
          title: channel?.snippet.title,
          description: channel?.snippet?.description,
          avatar: "/assets/images/logo.png",
          subscriberCount: channel?.statistics?.subscriberCount,
          videoCount: channel?.statistics?.videoCount,
          banner: [
            "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&h=300&fit=crop",
            "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=120&h=30&fit=crop",
          ],
        });
        // setChannelInfo({
        //   name: "Mathematics For All",
        //   handle: "@mathematicsforall9108",
        //   owner: "Samir Kumar Pandey",
        //   channelId: channel?.id ?? CHANNEL_ID,
        //   title: channel?.snippet.title,
        //   description: channel?.snippet?.description,
        //   avatar: "/assets/images/logo.png",
        //   subscriberCount: channel?.statistics?.subscriberCount,
        //   videoCount: channel?.statistics?.videoCount,
        //   banner: [
        //     "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&h=300&fit=crop",
        //     "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=120&h=30&fit=crop",
        //   ],
        // });
        console.log("channel data fetched");
        console.table(data.items[0]);
      } catch (error) {
        console.error("Error fetching channel info:", error);
      }
    };
 
    fetchChannelInfo();
  }, []);

  // const channelInfo = {
  //   description:
  //     "Welcome to Maths 4 All by Samir Kumar Pandey! Your comprehensive destination for learning mathematics from basic concepts to advanced topics. Samir makes mathematics accessible, engaging, and easy to understand for students of all levels with his clear teaching methodology and years of experience in mathematical education.",
  //   subscriberCount: "150K",
  //   videoCount: "200+",
  //   avatar: "/assets/images/logo.png", // Updated to use the Maths 4 All logo

  // };

  let [rotatingBanner, setRotatingBanner] = useState(
    "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&h=300&fit=crop"
  );
  useEffect(() => {
    let i = 0;
    let timer = setInterval(() => {
      setRotatingBanner(channelInfo.banner[i % channelInfo.banner.length]);
      i++;
    }, 3000);
    return () => clearInterval(timer);
  }, [channelInfo]);

  // Videos from Samir Kumar Pandey's Mathematics for All YouTube channel (UCAbXT1aYSDiXHHkakobyLsg)
  // Note: These are structured as actual videos that would be found on this specific channel

  const [channelVideos, setChannelVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC4CmvLNvIsNNNz1Xf5J6avtBdA8izw2go&channelId=UCAbXT1aYSDiXHHkakobyLsg&part=snippet,id&order=date&maxResults=30`
        );

        const data = (await res.json()) ?? [];

        const formattedVideos = data.items.map((item, idx) => ({
          id: idx,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          videoId: item.id.videoId,
          publishedAt: item.snippet.publishedAt,
          topic: "General", // you can map topics later
        }));

        console.table(data.items);

        setChannelVideos(formattedVideos);
        setFilteredVideos(formattedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Topic categories for the Mathematics for All channel
  const topics = [
    {
      name: "Algebra",
      description:
        "Master algebraic equations, functions, and problem-solving techniques",
      videoCount: channelVideos?.filter((v) => v?.topic === "Algebra")?.length,
      icon: "Calculator",
    },
    {
      name: "Calculus",
      description: "From derivatives to integrals - complete calculus mastery",
      videoCount: channelVideos?.filter((v) => v?.topic === "Calculus")?.length,
      icon: "TrendingUp",
    },
    {
      name: "Geometry",
      description: "Shapes, angles, and spatial mathematics fundamentals",
      videoCount: channelVideos?.filter((v) => v?.topic === "Geometry")?.length,
      icon: "Square",
    },
    {
      name: "Trigonometry",
      description: "Trigonometric functions and their practical applications",
      videoCount: channelVideos?.filter((v) => v?.topic === "Trigonometry")
        ?.length,
      icon: "Triangle",
    },
    {
      name: "Statistics",
      description: "Data analysis, probability, and statistical methods",
      videoCount: channelVideos?.filter((v) => v?.topic === "Statistics")
        ?.length,
      icon: "BarChart3",
    },
    {
      name: "Linear Algebra",
      description: "Vectors, matrices, and linear transformations",
      videoCount: channelVideos?.filter((v) => v?.topic === "Linear Algebra")
        ?.length,
      icon: "Grid3X3",
    },
    {
      name: "Number Theory",
      description: "Prime numbers, divisibility, and number patterns",
      videoCount: channelVideos?.filter((v) => v?.topic === "Number Theory")
        ?.length,
      icon: "Hash",
    },
  ];

  // Filter videos based on search term and active topic
  useEffect(() => {
    let filtered = channelVideos;

    if (searchTerm) {
      filtered = filtered?.filter(
        (video) =>
          video?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          video?.description
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase()) ||
          video?.tags?.some((tag) =>
            tag?.toLowerCase()?.includes(searchTerm?.toLowerCase())
          ) ||
          video?.topic?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (activeTopic) {
      filtered = filtered?.filter(
        (video) =>
          video?.topic === activeTopic?.name ||
          video?.tags?.includes(activeTopic?.name)
      );
    }

    setFilteredVideos(filtered);
  }, [searchTerm, activeTopic]);

  // Initialize with all videos
  useEffect(() => {
    setFilteredVideos(channelVideos);
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleSearchSubmit = () => {
    // Search is handled by useEffect
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveTopic(null);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleTopicSelect = (topic) => {
    setActiveTopic(activeTopic?.name === topic?.name ? null : topic);
    setSearchTerm("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${channelInfo?.name} - Mathematics Video Learning Center`}</title>
        <meta
          name="description"
          content={`${channelInfo?.description} Follow ${channelInfo?.name} for comprehensive mathematics tutorials covering algebra, calculus, geometry, and more.`}
        />
        <meta
          name="keywords"
          content="mathematics videos, math tutorials, channel, algebra videos, calculus lessons, geometry tutorials, free math education, mathematics for all"
        />
        <link rel="icon" href="/assets/images/logo.png" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Channel Header Section - Updated with more rounded corners */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevated mb-8">
              <div className="relative h-48 lg:h-64 bg-gradient-to-r from-blue-500/20 to-green-500/20">
                <img
                  src={rotatingBanner}
                  alt={`${channelInfo?.name} banner`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <div className="relative -mt-16 px-6 pb-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-9">
                  <div className="flex-shrink-0">
                    <Image
                      src={channelInfo?.avatar}
                      alt={`${channelInfo?.name} logo`}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-[2px] shadow-2xl drop-shadow-2xl border-background  object-cover bg-transparent"
                    />
                  </div>

                  <div className="flex-1 mt-4 lg:mt-0">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                          {channelInfo?.name}
                        </h1>
                        <p className="text-popover text-sm mb-2">
                          {channelInfo?.handle}
                        </p>
                        <p className="text-foreground text-sm lg:text-base max-w-2xl leading-relaxed">
                          {channelInfo?.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                        <div className="text-center">
                          <div className="font-semibold text-lg text-foreground">
                            {channelInfo?.subscriberCount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Subscribers
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg text-foreground">
                            {channelInfo?.videoCount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Videos
                          </div>
                        </div>
                        <a
                          href="https://www.youtube.com/@mathematicsforall9108"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-medium transition-smooth flex items-center space-x-2"
                        >
                          <Icon name="UserPlus" size={20} />
                          <span>Follow</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              onClearSearch={handleClearSearch}
              placeholder={`Search ${channelInfo?.name} videos...`}
            />

            {/* Video Player Section */}
            {selectedVideo && (
              <div className="mt-8">
                <VideoPlayer
                  video={{
                    ...selectedVideo,
                    instructor: channelInfo?.owner, // Use channel owner name
                  }}
                  onClose={handleCloseVideo}
                />
                <RelatedVideos
                  videos={channelVideos}
                  currentVideo={selectedVideo}
                  onVideoSelect={handleVideoSelect}
                />
              </div>
            )}

            {/* Topics Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-2xl text-foreground">
                  Browse by Topic
                </h2>
                {activeTopic && (
                  <button
                    onClick={() => setActiveTopic(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    View All Topics
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {topics
                  ?.filter((topic) => topic?.videoCount > 0)
                  ?.map((topic) => (
                    <TopicCard
                      key={topic?.name}
                      topic={topic}
                      onClick={handleTopicSelect}
                      isActive={activeTopic?.name === topic?.name}
                    />
                  ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-2xl text-foreground">
                  {searchTerm
                    ? `Search Results for "${searchTerm}"`
                    : activeTopic
                    ? `${activeTopic?.name} Videos`
                    : `Latest from ${channelInfo?.owner}`}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Video" size={16} />
                  <span>{filteredVideos?.length} videos found</span>
                </div>
              </div>

              {filteredVideos?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVideos?.map((video) => (
                    <VideoCard
                      key={video?.id}
                      video={{
                        ...video,
                        instructor: channelInfo?.owner, // Use channel owner name
                      }}
                      onClick={handleVideoSelect}
                      showPublishDate={true}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="Search"
                      size={24}
                      className="text-muted-foreground"
                    />
                  </div>

                  <div className=" bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="Loader"
                      size={30}
                      className="text-muted-foreground animate-spin"
                    />
                    <h3 className="pl-10 pt-3 font-heading text-center font-semibold text-lg text-foreground mb-2">
                      {" "}
                      No videos found
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or browse by topic
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Clear search and view all videos
                  </button>
                </div>
              )}
            </div>

            {/* Channel Stats Section */}
            {!searchTerm && !activeTopic && (
              <div className="mt-12 bg-muted/50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
                    Why Learn with Samir Kumar Pandey?
                  </h2>
                  <p className="text-muted-foreground">
                    Join thousands of students who have improved their
                    mathematical skills with Samir's clear and comprehensive
                    video tutorials on {channelInfo?.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="User" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Expert Teacher
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Learn from Samir Kumar Pandey's years of teaching
                      experience
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {channelInfo?.subscriberCount} Subscribers
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Join our growing community of mathematics learners
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="PlayCircle"
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {channelInfo?.videoCount} Videos
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive coverage of essential mathematics topics
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="GraduationCap"
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Quality Education
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Clear explanations that make mathematics accessible to all
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <div className="mb-4">
                    <Image
                      src="/assets/images/samirsir.JPG"
                      alt="Mathematics All Logo"
                      className="w-[300px] h-[300px] mx-auto mb-4 rounded-2xl object-contain bg-transparent"
                    />
                    <p className="text-foreground font-medium mb-2">
                      Created and taught by{" "}
                      <span className="text-primary font-semibold">
                        Samir Kumar Pandey
                      </span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Dedicated to making mathematics accessible to everyone
                      through engaging video lessons
                    </p>
                  </div>
                  <a
                    href="https://www.youtube.com/@mathematicsforall9108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl font-medium transition-smooth"
                  >
                    <Icon name="UserPlus" size={20} />
                    <span>Follow {channelInfo?.name}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default VideoLearningCenter;
