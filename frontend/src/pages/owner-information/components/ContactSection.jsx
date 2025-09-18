import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const socialLinks = [
    {
      platform: "YouTube",
      icon: "Youtube",
      url: "https://www.youtube.com/@mathematicsforall9108",
      color: "text-red-600",
      description: "Mathematics up to Higher Education",
    },
    {
      platform: "GitHub",
      icon: "Github",
      url: "https://github.com/nishuR31/mathsForAll",
      color: "text-gray-800",
      description: "Open source contributions and platform code",
    },
  ];

  const contactInfo = [
    {
      icon: "Mail",
      title: "Email",
      value: "dreamgf691@gmail.com",
      description: "For general inquiries and feedback",
    },
    {
      icon: "MapPin",
      title: "Location",
      value: "Ranchi,Jharkhand",
      description: "Ranchi",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.table(formData);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    // Mock form submission 
    let res = await fetch("http://localhost:4029/api/v1/info/contact", {
      method: "POST", // important
      headers: {
        "Content-Type": "application/json",
      },
      // body: formData, // convert JS object to JSON
      body: JSON.stringify(formData), // convert JS object to JSON
    });
    // let res = await fetch("http://localhost:4029/api/v1/info/contact", {
    //   method: "POST", // important
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // body: formData, // convert JS object to JSON
    //   body: JSON.stringify(formData), // convert JS object to JSON
    // });
    let data = await res.json();

    if (!data.success) {
      console.log("Mail failed to send.");
    }

    console.log("Form submitted:", formData);
    console.log("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I love hearing from students, educators, and anyone passionate about
            mathematics education. Feel free to reach out with questions,
            suggestions, or just to say hello!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-muted rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Icon name="Send" size={20} color="white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData?.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData?.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    placeholder="Share your thoughts, questions, or feedback..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  iconName="Send"
                  iconPosition="right"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo?.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-muted rounded-lg"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon
                        name={info?.icon}
                        size={20}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        {info?.title}
                      </h4>
                      <p className="text-primary font-medium mb-1">
                        {info?.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {info?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
                Follow the Journey
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {socialLinks?.map((social, index) => (
                  <a
                    key={index}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-background border border-border rounded-lg hover:shadow-soft transition-smooth group"
                  >
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/10 transition-smooth">
                      <Icon
                        name={social?.icon}
                        size={20}
                        className={`${social?.color} group-hover:text-primary transition-smooth`}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                        {social?.platform}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {social?.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
              <h4 className="font-heading font-semibold text-foreground mb-4 text-center">
                Community Response Time
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    &lt; 24h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Email Response
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success mb-1">
                    &lt; 2h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Forum Activity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-primary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
              Join Our Mission
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Whether you're a student, educator, or supporter of free
              education, there are many ways to be part of the Maths for All
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" iconName="Users" iconPosition="left">
                Join Community
              </Button>
              <Button
                variant="outline"
                iconName="Heart"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Support the Mission
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
