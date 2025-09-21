import React,{useState} from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const FeaturedNotesSection = () => {
  let [available,setAvailable]=useState(false)
  const featuredNotes = [
    {
      id: 1,
      title: "Calculus Fundamentals",
      subject: "Calculus",
      description:
        "Complete guide to limits, derivatives, and integrals with step-by-step examples and practice problems.",
      downloadUrl: "https://drive.google.com/file/d/1abc123/view",
      pages: 45,
      level: "Intermediate",
      lastUpdated: "2025-01-10",
    },
    {
      id: 2,
      title: "Linear Algebra Essentials",
      subject: "Algebra",
      description:
        "Matrix operations, vector spaces, and eigenvalues explained with real-world applications.",
      downloadUrl: "https://drive.google.com/file/d/2def456/view",
      pages: 38,
      level: "Advanced",
      lastUpdated: "2025-01-08",
    },
    {
      id: 3,
      title: "Geometry Basics",
      subject: "Geometry",
      description:
        "Fundamental concepts of shapes, angles, and spatial relationships with visual diagrams.",
      downloadUrl: "https://drive.google.com/file/d/3ghi789/view",
      pages: 32,
      level: "Beginner",
      lastUpdated: "2025-01-12",
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
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
    <section className="py-16 bg-muted/30">
      <div className="w-full mx-auto px-4 lg:px-6">
      {/* <div className="max-w-7xl mx-auto px-4 lg:px-6"> */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Featured Study Notes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive study materials created by expert educator, available
            for immediate download
          </p>
        </div>

        <div className="flex flex-wrap  justify-center flex-row gap-4 mb-5  ">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> */}
          {available ? (
            featuredNotes?.map((note) => (
              <div
                key={note?.id}
                className="bg-card border border-border shadow-lg rounded-xl w-1/2  md:w-1/3 lg:1/4 p-3 hover:shadow-elevated transition-smooth"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon
                        name="FileText"
                        size={20}
                        className="text-primary"
                      />
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        note?.level
                      )}`}
                    >
                      {note?.level}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground  bg-muted px-2 py-1 rounded">
                    {note?.subject}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {note?.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {note?.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Icon name="FileText" size={14} className="mr-1" />
                      {note?.pages} pages
                    </span>
                    <span className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {new Date(note.lastUpdated)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={note?.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      className="w-full"
                    >
                      Download
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    className="px-3"
                  />
                </div>
              </div>
            ))
          ) : (
<div className="  transition-all delay-[3s] bg-white ">
  <div className="flex justify-center flex-wrap animate-pulse  text-center ">
    <Icon name="Loader" size={40} className="animate-spin text-destructive hover:text-primary" onClick={()=>setAvailable(!available)} />
  </div>
</div>
          )}
        </div>

        <div className="text-center">
          <Link to="/notes-library">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Study Notes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNotesSection;
