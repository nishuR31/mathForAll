import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const faqData = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I download notes from the platform?",
      answer: `To download notes from our platform:\n\n1. Navigate to the Notes section from the main menu\n2. Browse through the categorized mathematics topics\n3. Click on any note card that interests you\n4. Click the "Download" button which will open Google Drive\n5. Use Google Drive's download option to save the file to your device\n\nAll notes are provided in PDF format and are completely free to download without any registration required.`
    },
    {
      id: 2,
      category: "Getting Started",
      question: "How can I watch educational videos?",
      answer: `Accessing our educational videos is simple:\n\n1. Go to the Videos section from the navigation menu\n2. Use the search bar to find specific topics (algebra, calculus, etc.)\n3. Browse through recommended video categories\n4. Click on any video thumbnail to watch it directly on our platform\n5. Videos are embedded from YouTube for the best viewing experience\n\nNo account creation is needed - just click and learn!`
    },
    {
      id: 3,
      category: "Technical Support",
      question: "How does the search functionality work?",
      answer: `Our search feature helps you find content quickly:\n\n• Global search bar in the header searches both notes and videos\n• Type keywords related to your topic (e.g., "quadratic equations")\n• Results are filtered in real-time as you type\n• Search works across note titles, descriptions, and video topics\n• Use specific mathematical terms for better results\n\nThe search state is preserved as you navigate between pages.`
    },
    {
      id: 4,
      category: "Technical Support",
      question: "What are the technical requirements to use this platform?",
      answer: `Minimum technical requirements:\n\n• Modern web browser (Chrome, Firefox, Safari, Edge)\n• Internet connection for video streaming and note downloads\n• JavaScript enabled in your browser\n• No special plugins or software installations required\n\nFor the best experience:\n• Use a desktop or tablet for video viewing\n• Ensure stable internet for smooth video playback\n• Enable cookies for theme preference saving`
    },
    {
      id: 5,
      category: "Features",
      question: "How do I switch between light and dark themes?",
      answer: `Theme switching is easy and your preference is saved:\n\n1. Look for the sun/moon icon in the top navigation bar\n2. Click the icon to toggle between light and dark modes\n3. Your preference is automatically saved to your browser\n4. The theme will persist across all pages and future visits\n\nOn mobile devices, you can find the theme toggle in the mobile menu.`
    },
    {
      id: 6,
      category: "Features",
      question: "Can I use this platform on mobile devices?",
      answer: `Yes! Our platform is fully responsive and mobile-friendly:\n\n• All pages adapt to your screen size automatically\n• Touch-friendly navigation and buttons\n• Optimized video player for mobile viewing\n• Easy-to-use mobile search functionality\n• Collapsible mobile menu for better navigation\n\nThe platform works seamlessly on smartphones, tablets, and desktop computers.`
    },
    {
      id: 7,
      category: "Advanced Features",
      question: "How are the mathematics topics organized?",
      answer: `Our content is systematically organized for easy learning:\n\n• Notes are categorized by mathematical subjects (Algebra, Calculus, Geometry, etc.)\n• Each category contains multiple subtopics\n• Topics progress from basic to advanced levels\n• Related videos are grouped by similar themes\n• Teachers are showcased with their areas of specialization\n\nThis organization helps you find content appropriate for your learning level.`
    },
    {
      id: 8,
      category: "Advanced Features",
      question: "Is there a way to contact teachers or get additional help?",
      answer: `While direct messaging isn't available, you can:\n\n• Visit the Teachers section to learn about our educators\n• View teacher profiles, specializations, and backgrounds\n• Check the Owner Information page for platform details\n• Use this Information Hub for comprehensive guidance\n• All content is designed to be self-explanatory and comprehensive\n\nOur teachers have carefully curated all materials to ensure clarity and completeness.`
    }
  ];

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(itemId)) {
      newExpanded?.delete(itemId);
    } else {
      newExpanded?.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const groupedFAQs = faqData?.reduce((acc, item) => {
    if (!acc?.[item?.category]) {
      acc[item.category] = [];
    }
    acc?.[item?.category]?.push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about using our mathematics learning platform. 
          Click on any question to expand the detailed answer.
        </p>
      </div>
      <div className="space-y-6">
        {Object.entries(groupedFAQs)?.map(([category, items]) => (
          <div key={category} className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-xl font-heading font-medium text-card-foreground mb-4 flex items-center">
              <Icon 
                name={category === 'Getting Started' ? 'Play' : category === 'Technical Support' ? 'Settings' : 'Star'} 
                size={20} 
                className="mr-2 text-primary" 
              />
              {category}
            </h3>
            
            <div className="space-y-3">
              {items?.map((item) => (
                <div key={item?.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleExpanded(item?.id)}
                    className="w-full px-4 py-3 text-left bg-muted hover:bg-muted/80 transition-smooth flex items-center justify-between"
                  >
                    <span className="font-medium text-foreground pr-4">
                      {item?.question}
                    </span>
                    <Icon 
                      name={expandedItems?.has(item?.id) ? 'ChevronUp' : 'ChevronDown'} 
                      size={20} 
                      className="text-muted-foreground flex-shrink-0" 
                    />
                  </button>
                  
                  {expandedItems?.has(item?.id) && (
                    <div className="px-4 py-4 bg-background border-t border-border">
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {item?.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;