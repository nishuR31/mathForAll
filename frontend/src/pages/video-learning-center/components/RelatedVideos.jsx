import React from 'react';
import VideoCard from './VideoCard';

const RelatedVideos = ({ videos, currentVideo, onVideoSelect }) => {
  const relatedVideos = videos?.filter(video => video?.id !== currentVideo?.id)?.filter(video => 
      video?.tags?.some(tag => currentVideo?.tags?.includes(tag)) ||
      video?.topic === currentVideo?.topic
    )?.slice(0, 6);

  if (relatedVideos?.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
        Related Videos
      </h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
          {relatedVideos?.map((video) => (
            <div key={video?.id} className="w-80 flex-shrink-0">
              <VideoCard 
                video={video} 
                onClick={onVideoSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedVideos;