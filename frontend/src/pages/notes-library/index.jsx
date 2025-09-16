import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CategoryFilter from './components/CategoryFilter';
import SortControls from './components/SortControls';
import SearchBar from './components/SearchBar';
import NotesGrid from './components/NotesGrid';
import StatsOverview from './components/StatsOverview';
import Icon from '../../components/AppIcon';

const NotesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for mathematics notes
  const mockNotes = [
    {
      id: 1,
      title: "Linear Algebra Fundamentals",
      description: "Comprehensive guide covering vectors, matrices, eigenvalues, and linear transformations with practical examples and exercises.",
      category: "Algebra",
      difficulty: "Intermediate",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/1abc123/view",
      dateAdded: "2024-01-15",
      downloadCount: 1247
    },
    {
      id: 2,
      title: "Calculus I: Limits and Derivatives",
      description: "Introduction to differential calculus including limits, continuity, derivatives, and applications to optimization problems.",
      category: "Calculus",
      difficulty: "Beginner",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/2def456/view",
      dateAdded: "2024-01-20",
      downloadCount: 2156
    },
    {
      id: 3,
      title: "Geometry: Triangles and Circles",
      description: "Detailed study of geometric properties, theorems, and proofs related to triangles, circles, and their applications.",
      category: "Geometry",
      difficulty: "Beginner",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/3ghi789/view",
      dateAdded: "2024-02-01",
      downloadCount: 892
    },
    {
      id: 4,
      title: "Statistics and Probability Theory",
      description: "Comprehensive coverage of descriptive statistics, probability distributions, hypothesis testing, and statistical inference.",
      category: "Statistics",
      difficulty: "Advanced",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/4jkl012/view",
      dateAdded: "2024-02-10",
      downloadCount: 1534
    },
    {
      id: 5,
      title: "Number Theory Essentials",
      description: "Introduction to prime numbers, divisibility, modular arithmetic, and cryptographic applications of number theory.",
      category: "Number Theory",
      difficulty: "Advanced",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/5mno345/view",
      dateAdded: "2024-02-15",
      downloadCount: 678
    },
    {
      id: 6,
      title: "Trigonometry Complete Guide",
      description: "Comprehensive study of trigonometric functions, identities, equations, and their applications in real-world problems.",
      category: "Trigonometry",
      difficulty: "Intermediate",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/6pqr678/view",
      dateAdded: "2024-02-20",
      downloadCount: 1823
    },
    {
      id: 7,
      title: "Advanced Calculus: Integration Techniques",
      description: "Advanced integration methods including substitution, integration by parts, partial fractions, and numerical integration.",
      category: "Calculus",
      difficulty: "Advanced",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/7stu901/view",
      dateAdded: "2024-02-25",
      downloadCount: 1456
    },
    {
      id: 8,
      title: "Abstract Algebra Introduction",
      description: "Introduction to groups, rings, and fields with emphasis on algebraic structures and their properties.",
      category: "Algebra",
      difficulty: "Advanced",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/8vwx234/view",
      dateAdded: "2024-03-01",
      downloadCount: 567
    },
    {
      id: 9,
      title: "Discrete Mathematics Fundamentals",
      description: "Logic, set theory, combinatorics, graph theory, and discrete structures essential for computer science applications.",
      category: "Discrete Math",
      difficulty: "Intermediate",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/9yza567/view",
      dateAdded: "2024-03-05",
      downloadCount: 1234
    },
    {
      id: 10,
      title: "Mathematical Analysis Primer",
      description: "Rigorous treatment of real analysis including sequences, series, continuity, and differentiation with formal proofs.",
      category: "Analysis",
      difficulty: "Advanced",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/10bcd890/view",
      dateAdded: "2024-03-10",
      downloadCount: 789
    },
    {
      id: 11,
      title: "Applied Mathematics for Engineers",
      description: "Practical mathematical methods including differential equations, Fourier analysis, and numerical methods for engineering applications.",
      category: "Applied Math",
      difficulty: "Intermediate",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/11efg123/view",
      dateAdded: "2024-03-15",
      downloadCount: 2045
    },
    {
      id: 12,
      title: "Complex Analysis Introduction",
      description: "Study of complex numbers, analytic functions, contour integration, and applications to real analysis problems.",
      category: "Analysis",
      difficulty: "Advanced",
      fileType: "pdf",
      downloadUrl: "https://drive.google.com/file/d/12hij456/view",
      dateAdded: "2024-03-20",
      downloadCount: 634
    }
  ];

  const categories = [
    { id: 'algebra', name: 'Algebra' },
    { id: 'calculus', name: 'Calculus' },
    { id: 'geometry', name: 'Geometry' },
    { id: 'statistics', name: 'Statistics' },
    { id: 'trigonometry', name: 'Trigonometry' },
    { id: 'number-theory', name: 'Number Theory' },
    { id: 'discrete-math', name: 'Discrete Math' },
    { id: 'analysis', name: 'Analysis' },
    { id: 'applied-math', name: 'Applied Math' }
  ];

  // Filter and sort notes
  const filteredAndSortedNotes = useMemo(() => {
    let filtered = mockNotes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(note =>
        note?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        note?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        note?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      const categoryName = categories?.find(cat => cat?.id === selectedCategory)?.name;
      if (categoryName) {
        filtered = filtered?.filter(note => note?.category === categoryName);
      }
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'title':
          aValue = a?.title?.toLowerCase();
          bValue = b?.title?.toLowerCase();
          break;
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          aValue = difficultyOrder?.[a?.difficulty];
          bValue = difficultyOrder?.[b?.difficulty];
          break;
        case 'category':
          aValue = a?.category?.toLowerCase();
          bValue = b?.category?.toLowerCase();
          break;
        case 'dateAdded':
          aValue = new Date(a.dateAdded);
          bValue = new Date(b.dateAdded);
          break;
        default:
          aValue = a?.title?.toLowerCase();
          bValue = b?.title?.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  // Calculate note counts by category
  const noteCounts = useMemo(() => {
    const counts = { all: mockNotes?.length };
    
    categories?.forEach(category => {
      counts[category.id] = mockNotes?.filter(note => 
        note?.category === category?.name
      )?.length;
    });

    return counts;
  }, []);

  // Calculate total downloads
  const totalDownloads = useMemo(() => {
    return mockNotes?.reduce((sum, note) => sum + note?.downloadCount, 0);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleOrderChange = (newOrder) => {
    setSortOrder(newOrder);
  };

  return (
    <>
      <Helmet>
        <title>Notes Library - Maths for All</title>
        <meta name="description" content="Browse and download comprehensive mathematics study notes organized by topic and difficulty level. Free access to algebra, calculus, geometry, statistics, and more." />
        <meta name="keywords" content="mathematics notes, study materials, algebra, calculus, geometry, statistics, free download, education" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={24} color="white" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-3xl text-foreground">
                    Notes Library
                  </h1>
                  <p className="text-muted-foreground">
                    Comprehensive mathematics study materials for all levels
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <StatsOverview
              totalNotes={mockNotes?.length}
              totalDownloads={totalDownloads}
              categories={categories}
              filteredCount={filteredAndSortedNotes?.length}
            />

            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Filters and Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  noteCounts={noteCounts}
                />
              </div>
              <div>
                <SortControls
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                  onOrderChange={handleOrderChange}
                />
              </div>
            </div>

            {/* Results Summary */}
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Filter" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Showing {filteredAndSortedNotes?.length} of {mockNotes?.length} notes
                      {searchTerm && ` for "${searchTerm}"`}
                      {selectedCategory !== 'all' && ` in ${categories?.find(cat => cat?.id === selectedCategory)?.name}`}
                    </span>
                  </div>
                  {(searchTerm || selectedCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="text-sm text-primary hover:text-primary/80 transition-smooth"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Notes Grid */}
            <NotesGrid
              notes={filteredAndSortedNotes}
              isLoading={isLoading}
            />

            {/* Footer Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Need help finding specific notes?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Use the search and filter options above, or browse by category to find the perfect study materials for your needs.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Download" size={14} />
                    <span>Direct Google Drive links</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Shield" size={14} />
                    <span>No registration required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    <span>Completely free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotesLibrary;