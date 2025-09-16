import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import TeacherCard from "./components/TeacherCard";
import TeacherStats from "./components/TeacherStats";
import SubjectFilter from "./components/SubjectFilter";
import HeroSection from "./components/HeroSection";
import Icon from "../../components/AppIcon";

const TeachersShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  // Mock teachers data
  const teachers = [
    {
      id: 1,
      name: "Dr. Samir Kumar Pandey",
      title: "Senior Mathematics Professor",
      education: "Ph.D. in Mathematics, MIT",
      experience: 15,
      image: "/assets/images/samirsir.JPG",
      specializations: ["Calculus", "Linear Algebra", "Real Analysis"],
      bio: "Dr. Samir has been teaching mathematics for over 15 years with a focus on making complex mathematical concepts accessible to students of all levels.",
      philosophy:
        "Mathematics is not about memorizing formulas, but about understanding patterns and developing logical thinking skills.",
      certifications: [
        "Certified Mathematics Educator (CME)",
        "Advanced Calculus Teaching Certificate",
        "Online Learning Specialist",
      ],
    },
  ];

  // Mock stats data
  const stats = {
    totalTeachers: teachers?.length,
    totalExperience: teachers?.reduce(
      (sum, teacher) => sum + teacher?.experience,
      0
    ),
    subjects: 12,
    qualifications: teachers?.filter((t) => t?.education?.includes("Ph.D."))
      ?.length,
  };

  // Get unique subjects for filter
  const subjects = [
    ...new Set(teachers.flatMap((teacher) => teacher.specializations)),
  ]?.sort();

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTeachers(teachers);
    } else {
      setFilteredTeachers(
        teachers?.filter((teacher) =>
          teacher?.specializations?.includes(activeFilter)
        )
      );
    }
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <Helmet>
        <title>Teachers Showcase - Maths for All</title>
        <meta
          name="description"
          content="Meet our expert mathematics teachers and their specializations. Learn about our qualified educators who make mathematics accessible to all students."
        />
        <meta
          name="keywords"
          content="mathematics teachers, math educators, calculus professors, algebra specialists, statistics teachers"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <HeroSection />

            {/* Teacher Stats */}
            <div className="mb-8">
              <TeacherStats stats={stats} />
            </div>

            {/* Subject Filter */}
            <div className="mb-8">
              <SubjectFilter
                subjects={subjects}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Teachers Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Our Mathematics Teachers
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredTeachers?.length} teacher
                  {filteredTeachers?.length !== 1 ? "s" : ""} found
                </div>
              </div>

              {filteredTeachers?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeachers?.map((teacher) => (
                    <TeacherCard key={teacher?.id} teacher={teacher} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="Users"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No teachers found
                  </h3>
                  <p className="text-muted-foreground">
                    No teachers specialize in "{activeFilter}". Try selecting a
                    different subject.
                  </p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Info" size={20} className="mr-2 text-primary" />
                About Our Teaching Approach
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <Icon
                      name="Target"
                      size={16}
                      className="mr-2 text-success"
                    />
                    Our Mission
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We believe that every student can succeed in mathematics
                    with the right guidance and support. Our teachers are
                    committed to making mathematics accessible, engaging, and
                    relevant to students' lives.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <Icon
                      name="Lightbulb"
                      size={16}
                      className="mr-2 text-accent"
                    />
                    Teaching Philosophy
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our approach combines traditional mathematical rigor with
                    modern teaching methods. We focus on building understanding
                    rather than memorization, encouraging critical thinking and
                    problem-solving skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeachersShowcase;
