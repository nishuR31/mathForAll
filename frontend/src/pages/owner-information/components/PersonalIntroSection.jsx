import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const PersonalIntroSection = () => {
  let [clicked, setClicked] = useState(false);
  let clickHandler = () => {
    setClicked(!clicked);
    console.log(clicked);
  };

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-80 h-80 mx-auto justify-center flex flex-row lg:mx-0 rounded-lg  shadow-elevated">
                <Image
                  src="/assets/images/sir.jpg"
                  alt="Dr. Samir Kumar Pandey - Founder of Mathematics for All"
                  className="object-cover rounded-lg"
                />
              </div>
              <div
                onClick={clickHandler}
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center shadow-elevated"
              >
                <Icon
                  name="Heart"
                  size={24}
                  className={`${
                    clicked
                      ? "text-muted-foreground "
                      : "text-red-500 fill-current "
                  } `}
                />
              </div>
            </div>
          </div>

          {/* Introduction Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Platform Founder
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Meet Dr. Samir Kumar pandey
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Welcome to Mathematics for All! I'm Dr. Samir, a passionate
              mathematics educator with over 15 years of teaching experience. My
              mission is simple: make quality mathematics education accessible
              to everyone, everywhere, completely free of charge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center text-muted-foreground">
                <Icon
                  name="GraduationCap"
                  size={20}
                  className="mr-2 text-primary"
                />
                <span>Ph.D. in Mathematics Education</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                <span>Stanford University</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalIntroSection;
