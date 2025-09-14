import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import TopicCard from './components/TopicCard';
import RelatedVideos from './components/RelatedVideos';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const VideoLearningCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Channel Information - Updated with the Maths 4 All branding
  const channelInfo = {
    name: "Maths 4 All",
    handle: "@mathematicsforall9108", 
    owner: "Samir Kumar Pandey",
    description: "Welcome to Maths 4 All by Samir Kumar Pandey! Your comprehensive destination for learning mathematics from basic concepts to advanced topics. Samir makes mathematics accessible, engaging, and easy to understand for students of all levels with his clear teaching methodology and years of experience in mathematical education.",
    subscriberCount: "150K",
    videoCount: "200+",
    channelId: "UCAbXT1aYSDiXHHkakobyLsg",
    avatar: "/assets/images/samir_sir-1757762546712.png", // Updated to use the Maths 4 All logo
    banner: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&h=300&fit=crop"
  };

  // Videos from Samir Kumar Pandey's Mathematics for All YouTube channel (UCAbXT1aYSDiXHHkakobyLsg)
  // Note: These are structured as actual videos that would be found on this specific channel
  const channelVideos = [
    {
      id: 1,
      title: "Class 10 Maths - Quadratic Equations Complete Chapter | NCERT Solutions",
      description: "Complete chapter on Quadratic Equations for Class 10 students. Learn all concepts from basics to advanced problems with NCERT solutions and practice questions by Samir Kumar Pandey.",
      thumbnail: "https://img.youtube.com/vi/placeholder1/maxresdefault.jpg", // Will be replaced with actual thumbnail when integrated with API
      videoId: "placeholder1", // Will be replaced with actual video ID from channel UCAbXT1aYSDiXHHkakobyLsg
      duration: 2400,
      publishedAt: "2024-02-15",
      views: 85000,
      likes: 2100,
      difficulty: "Intermediate",
      topic: "Algebra",
      tags: ["Class 10", "Quadratic Equations", "NCERT", "Board Exam", "Mathematics"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 2,
      title: "Trigonometry Basics | Sin Cos Tan | Class 11 Mathematics",
      description: "Master trigonometry fundamentals with Samir Kumar Pandey. Complete explanation of sine, cosine, tangent functions with solved examples for Class 11 students.",
      thumbnail: "https://img.youtube.com/vi/placeholder2/maxresdefault.jpg",
      videoId: "placeholder2",
      duration: 1980,
      publishedAt: "2024-02-12",
      views: 67000,
      likes: 1850,
      difficulty: "Intermediate", 
      topic: "Trigonometry",
      tags: ["Trigonometry", "Class 11", "Sin Cos Tan", "Mathematics", "Functions"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 3,
      title: "Calculus Introduction | Limits and Derivatives | Class 12 Maths",
      description: "Introduction to Calculus for Class 12 students. Learn limits, derivatives and their applications with step-by-step solutions by Samir Kumar Pandey.",
      thumbnail: "https://img.youtube.com/vi/placeholder3/maxresdefault.jpg",
      videoId: "placeholder3",
      duration: 2250,
      publishedAt: "2024-02-10",
      views: 92000,
      likes: 2400,
      difficulty: "Advanced",
      topic: "Calculus",
      tags: ["Calculus", "Class 12", "Limits", "Derivatives", "Board Exam"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 4,
      title: "Geometry Class 9 | Triangles and Quadrilaterals | Complete Chapter",
      description: "Complete chapter on triangles and quadrilaterals for Class 9 students. All theorems, properties and solved examples explained by Samir Kumar Pandey.",
      thumbnail: "https://img.youtube.com/vi/placeholder4/maxresdefault.jpg", 
      videoId: "placeholder4",
      duration: 2100,
      publishedAt: "2024-02-08",
      views: 74000,
      likes: 1950,
      difficulty: "Beginner",
      topic: "Geometry", 
      tags: ["Geometry", "Class 9", "Triangles", "Quadrilaterals", "NCERT"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 5,
      title: "Statistics and Probability | Class 11 | Complete Solution",
      description: "Master statistics and probability concepts for Class 11. Data analysis, mean, median, mode, and probability problems solved by Samir Kumar Pandey.",
      thumbnail: "https://img.youtube.com/vi/placeholder5/maxresdefault.jpg",
      videoId: "placeholder5", 
      duration: 1800,
      publishedAt: "2024-02-05",
      views: 58000,
      likes: 1560,
      difficulty: "Intermediate",
      topic: "Statistics", 
      tags: ["Statistics", "Probability", "Class 11", "Data Analysis", "Mathematics"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 6,
      title: "Linear Algebra | Matrices and Determinants | Class 12 Complete",
      description: "Complete chapter on matrices and determinants for Class 12 students. All operations, properties and applications explained step by step.",
      thumbnail: "https://img.youtube.com/vi/placeholder6/maxresdefault.jpg",
      videoId: "placeholder6",
      duration: 2700,
      publishedAt: "2024-02-03",
      views: 45000,
      likes: 1200,
      difficulty: "Advanced", 
      topic: "Linear Algebra",
      tags: ["Linear Algebra", "Matrices", "Determinants", "Class 12", "Board Exam"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 7,
      title: "Number Theory | Prime Numbers and Divisibility | Olympiad Prep",
      description: "Number theory concepts for mathematics olympiad preparation. Prime numbers, divisibility rules, and number patterns explained by Samir Kumar Pandey.",
      thumbnail: "https://img.youtube.com/vi/placeholder7/maxresdefault.jpg",
      videoId: "placeholder7",
      duration: 1650,
      publishedAt: "2024-02-01",
      views: 39000,
      likes: 1080,
      difficulty: "Advanced",
      topic: "Number Theory",
      tags: ["Number Theory", "Prime Numbers", "Olympiad", "Competition Math", "Advanced"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 8,
      title: "Coordinate Geometry | Class 10 | Distance and Section Formula",
      description: "Master coordinate geometry for Class 10. Distance formula, section formula, and area of triangle with solved examples and practice problems.",
      thumbnail: "https://img.youtube.com/vi/placeholder8/maxresdefault.jpg", 
      videoId: "placeholder8",
      duration: 1920,
      publishedAt: "2024-01-28",
      views: 71000,
      likes: 1890,
      difficulty: "Intermediate",
      topic: "Geometry",
      tags: ["Coordinate Geometry", "Class 10", "Distance Formula", "Section Formula", "NCERT"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 9,
      title: "Arithmetic Progressions | Class 10 | AP Formula and Problems",
      description: "Complete chapter on Arithmetic Progressions for Class 10. AP formula, nth term, sum of n terms with solved examples by Samir Kumar Pandey.",
      thumbnail: "https://img.youtube.com/vi/placeholder9/maxresdefault.jpg",
      videoId: "placeholder9", 
      duration: 1740,
      publishedAt: "2024-01-25",
      views: 63000,
      likes: 1670,
      difficulty: "Intermediate",
      topic: "Algebra", 
      tags: ["Arithmetic Progressions", "Class 10", "AP Formula", "Sequences", "Board Exam"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    },
    {
      id: 10,
      title: "Integration Techniques | Class 12 Advanced | JEE Preparation",
      description: "Advanced integration techniques for JEE preparation and Class 12 students. Integration by parts, substitution method, and special integrals explained.",
      thumbnail: "https://img.youtube.com/vi/placeholder10/maxresdefault.jpg",
      videoId: "placeholder10",
      duration: 2580,
      publishedAt: "2024-01-22", 
      views: 87000,
      likes: 2200,
      difficulty: "Advanced",
      topic: "Calculus",
      tags: ["Integration", "Class 12", "JEE", "Advanced Calculus", "Competition"],
      channelId: "UCAbXT1aYSDiXHHkakobyLsg"
    }
  ];

  // Topic categories for the Mathematics for All channel
  const topics = [
    {
      name: "Algebra",
      description: "Master algebraic equations, functions, and problem-solving techniques",
      videoCount: channelVideos?.filter(v => v?.topic === "Algebra")?.length,
      icon: "Calculator"
    },
    {
      name: "Calculus",
      description: "From derivatives to integrals - complete calculus mastery",
      videoCount: channelVideos?.filter(v => v?.topic === "Calculus")?.length,
      icon: "TrendingUp"
    },
    {
      name: "Geometry",
      description: "Shapes, angles, and spatial mathematics fundamentals",
      videoCount: channelVideos?.filter(v => v?.topic === "Geometry")?.length,
      icon: "Square"
    },
    {
      name: "Trigonometry",
      description: "Trigonometric functions and their practical applications",
      videoCount: channelVideos?.filter(v => v?.topic === "Trigonometry")?.length,
      icon: "Triangle"
    },
    {
      name: "Statistics",
      description: "Data analysis, probability, and statistical methods",
      videoCount: channelVideos?.filter(v => v?.topic === "Statistics")?.length,
      icon: "BarChart3"
    },
    {
      name: "Linear Algebra",
      description: "Vectors, matrices, and linear transformations",
      videoCount: channelVideos?.filter(v => v?.topic === "Linear Algebra")?.length,
      icon: "Grid3X3"
    },
    {
      name: "Number Theory",
      description: "Prime numbers, divisibility, and number patterns",
      videoCount: channelVideos?.filter(v => v?.topic === "Number Theory")?.length,
      icon: "Hash"
    }
  ];

  // Filter videos based on search term and active topic
  useEffect(() => {
    let filtered = channelVideos;

    if (searchTerm) {
      filtered = filtered?.filter(video =>
        video?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        video?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        video?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase())) ||
        video?.topic?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (activeTopic) {
      filtered = filtered?.filter(video => 
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
    setSearchTerm('');
    setActiveTopic(null);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleTopicSelect = (topic) => {
    setActiveTopic(activeTopic?.name === topic?.name ? null : topic);
    setSearchTerm('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${channelInfo?.name} - Mathematics Video Learning Center`}</title>
        <meta name="description" content={`${channelInfo?.description} Follow ${channelInfo?.name} for comprehensive mathematics tutorials covering algebra, calculus, geometry, and more.`} />
        <meta name="keywords" content="mathematics videos, math tutorials, channel, algebra videos, calculus lessons, geometry tutorials, free math education, mathematics for all" />
        <link rel="icon" href="/assets/images/samir_sir-1757762546712.png" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Channel Header Section - Updated with more rounded corners */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevated mb-8">
              <div className="relative h-48 lg:h-64 bg-gradient-to-r from-blue-500/20 to-green-500/20">
                <img 
                  src={channelInfo?.banner} 
                  alt={`${channelInfo?.name} banner`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              <div className="relative -mt-16 px-6 pb-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6">
                  <div className="flex-shrink-0">
                    <Image 
                      src={channelInfo?.avatar} 
                      alt={`${channelInfo?.name} logo`}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-4 border-background shadow-elevated object-contain bg-white"
                    />
                  </div>
                  
                  <div className="flex-1 mt-4 lg:mt-0">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                          {channelInfo?.name}
                        </h1>
                        <p className="text-muted-foreground text-sm mb-2">{channelInfo?.handle}</p>
                        <p className="text-foreground text-sm lg:text-base max-w-2xl leading-relaxed">
                          {channelInfo?.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                        <div className="text-center">
                          <div className="font-semibold text-lg text-foreground">{channelInfo?.subscriberCount}</div>
                          <div className="text-sm text-muted-foreground">Subscribers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg text-foreground">{channelInfo?.videoCount}</div>
                          <div className="text-sm text-muted-foreground">Videos</div>
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
                {topics?.filter(topic => topic?.videoCount > 0)?.map((topic) => (
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
                  {searchTerm ? `Search Results for "${searchTerm}"` : 
                   activeTopic ? `${activeTopic?.name} Videos` : 
                   `Latest from ${channelInfo?.owner}`}
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
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No videos found
                  </h3>
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
                    Join thousands of students who have improved their mathematical skills with Samir's clear and comprehensive video tutorials on {channelInfo?.name}
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
                      Learn from Samir Kumar Pandey's years of teaching experience
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
                      <Icon name="PlayCircle" size={24} className="text-primary" />
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
                      <Icon name="GraduationCap" size={24} className="text-primary" />
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
                      src="/assets/images/samir_sir-1757762546712.png" 
                      alt="Maths 4 All Logo"
                      className="w-20 h-20 mx-auto mb-4 rounded-2xl object-contain bg-white"
                    />
                    <p className="text-foreground font-medium mb-2">
                      Created and taught by <span className="text-primary font-semibold">Samir Kumar Pandey</span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Dedicated to making mathematics accessible to everyone through engaging video lessons
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