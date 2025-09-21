import React, { useState, useEffect } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const TeacherCard = ({ teacher }) => {
  let [img, setImg] = useState(teacher?.image[0]);
  useEffect(() => {
    let i = 0;
    let interval = setInterval(() => {
      setImg(teacher?.image[i % teacher?.image.length]);
      i++;
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [img]);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-30 h-30 mb-4 overflow-hidden  ">
          <div className="relative w-64 h-64 group flex flex-row justify-center">
            <Image
              src={img}
              alt={`${teacher?.name} - Mathematics Teacher`}
              className={`object-cover  transition-all delay-3  duration-3 bg-transparent rounded-xl`}
            />
          </div>
        </div>

        {/* Name and Title */}
        <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
          {teacher?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{teacher?.title}</p>

        {/* Education */}
        <div className="flex items-center text-sm text-secondary mb-4">
          <Icon name="GraduationCap" size={16} className="mr-2" />
          <span>{teacher?.education}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center text-sm text-secondary mb-4">
          <Icon name="Clock" size={16} className="mr-2" />
          <span>{teacher?.experience} years experience</span>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Specializations:
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {teacher?.specializations?.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {teacher?.bio}
        </p>

        {/* Teaching Philosophy */}
        {teacher?.philosophy && (
          <div className="border-t border-border pt-4 mt-4">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Quote" size={16} className="mr-2" />
              Teaching Philosophy
            </h4>
            <p className="text-sm text-muted-foreground italic">
              "{teacher?.philosophy}"
            </p>
          </div>
        )}

        {/* Certifications */}
        {teacher?.certifications && teacher?.certifications?.length > 0 && (
          <div className="border-t border-border pt-4 mt-4 w-full">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Award" size={16} className="mr-2" />
              Certifications
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {teacher?.certifications?.map((cert, index) => (
                <li key={index} className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={12}
                    className="mr-2 text-success"
                  />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
