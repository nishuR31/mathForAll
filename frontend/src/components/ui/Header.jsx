import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import Input from "./Input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Home", path: "/", icon: "Home" },
    { label: "Notes", path: "/notes-library", icon: "NotebookPen" },
    { label: "Videos", path: "/video-learning-center", icon: "MonitorPlay" },
    { label: "Teachers", path: "/teachers-showcase", icon: "Users" },
    { label: "Help", path: "/information-hub", icon: "Info" },
    { label: "About", path: "/owner-information", icon: "UserRoundSearch" },
    { label: "Faculty", path: "/auth", icon: "ShieldUser" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    )?.matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(shouldUseDark);
    document.documentElement?.classList?.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement?.classList?.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    // Search functionality would be implemented here
    console.log("Search term:", searchTerm);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            >
              <div className="w-8 h-8 bg-transparent rounded-lg flex items-center justify-center">
                <img src="/assets/images/logo.png" alt="log" className="w-20" />
              </div>
              <span className="font-heading font-semibold text-lg text-foreground">
                Mathematics for All
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.slice(0, 4)?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item?.label}
                </Link>
              ))}

              {/* More Menu */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  className="text-foreground hover:text-primary"
                >
                  More
                </Button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth">
                  {navigationItems?.slice(4)?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center px-3 py-2 text-sm hover:bg-muted transition-smooth ${
                        isActivePath(item?.path)
                          ? "text-primary bg-muted"
                          : "text-popover-foreground"
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-2" />
                      {item?.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Search and Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search notes and videos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-64 pl-10"
                />
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
              </form>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground hover:text-primary"
              >
                <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden text-foreground hover:text-primary"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-elevated">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search notes and videos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10"
                />
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-smooth ${
                      isActivePath(item?.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    <Icon name={item?.icon} size={20} className="mr-3" />
                    {item?.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Theme Toggle */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full justify-start text-foreground hover:text-primary"
                  iconName={isDarkMode ? "Sun" : "Moon"}
                  iconPosition="left"
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
