import { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseMe } from './components/WhyChooseMe';
import { ContactSection } from './components/ContactSection';
import { QuoteCallout } from './components/QuoteCallout';
import { WorkFromHomeRegistration } from './pages/WorkFromHomeRegistration';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminRegistrationDetails } from './pages/AdminRegistrationDetails';
import { AdminCredentialDialog } from './components/AdminCredentialDialog';
import { useAdminGate } from './hooks/useAdminGate';
import { MessageCircle, BarChart3, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageType = 'home' | 'registration' | 'analytics' | 'registrationDetails';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingPage, setPendingPage] = useState<PageType | null>(null);
  const { validateCredentials } = useAdminGate();
  const whatsappUrl = 'https://wa.me/message/P243ECCLGYITA1';

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/register' || path === '/registration') {
        setCurrentPage('registration');
      } else if (path === '/admin/analytics') {
        setCurrentPage('analytics');
      } else if (path === '/admin/registrations') {
        setCurrentPage('registrationDetails');
      } else {
        setCurrentPage('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToRegistration = () => {
    window.history.pushState({}, '', '/register');
    setCurrentPage('registration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = (page: PageType) => {
    setPendingPage(page);
    setDialogOpen(true);
  };

  const handleCredentialValidation = (username: string, password: string): boolean => {
    const isValid = validateCredentials(username, password);
    if (isValid && pendingPage) {
      const path = pendingPage === 'analytics' ? '/admin/analytics' : '/admin/registrations';
      window.history.pushState({}, '', path);
      setCurrentPage(pendingPage);
      setPendingPage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return isValid;
  };

  if (currentPage === 'registration') {
    return <WorkFromHomeRegistration onNavigateHome={navigateToHome} />;
  }

  if (currentPage === 'analytics') {
    return <AdminAnalytics onNavigateHome={navigateToHome} />;
  }

  if (currentPage === 'registrationDetails') {
    return <AdminRegistrationDetails onNavigateHome={navigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav onNavigateToRegistration={navigateToRegistration} />
      
      {/* Admin Credential Dialog */}
      <AdminCredentialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onValidate={handleCredentialValidation}
        title={pendingPage === 'analytics' ? 'Analytics Access' : 'Registration Details Access'}
      />

      {/* Admin Access Buttons - Fixed Position */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button
          onClick={() => handleAdminAccess('analytics')}
          size="lg"
          className="gap-2 shadow-lg"
          title="Admin Analytics"
        >
          <BarChart3 className="w-5 h-5" />
          Analytics
        </Button>
        <Button
          onClick={() => handleAdminAccess('registrationDetails')}
          size="lg"
          variant="secondary"
          className="gap-2 shadow-lg"
          title="Admin Registration Details"
        >
          <FileText className="w-5 h-5" />
          Registrations
        </Button>
      </div>
      
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{
          backgroundImage: 'url(/assets/generated/subtle-pattern-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="container relative z-10 px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <img 
                  src="/assets/generated/learning-earning-logo.dim_512x512.png" 
                  alt="Learning-Earning Logo" 
                  className="h-16 w-auto mb-4"
                />
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                Learn Smart. Earn Smart. Grow Smart.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-balance">
                Guiding students to build skills and earn with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={navigateToRegistration}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-blue-glow"
                >
                  Apply Now
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-primary bg-secondary rounded-lg hover:bg-secondary/80 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact Us
                </a>
              </div>
            </div>
            
            <div className="relative lg:block hidden animate-fade-in">
              <img 
                src="/assets/generated/hero-abhishek-adarsh-illustration.dim_1600x900.png" 
                alt="Abhishek and Adarsh mentoring students" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote 1 */}
      <QuoteCallout 
        quote="Success is not the key to happiness. Happiness is the key to success."
        author="Albert Schweitzer"
      />

      {/* About Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About Us
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Hi, we're <span className="font-semibold text-foreground">Abhishek and Adarsh</span>, 
                  passionate student mentors dedicated to helping young minds unlock their potential. 
                  We believe that every student has the ability to learn, earn, and grow with the right guidance.
                </p>
                <p>
                  Our mission is simple: to teach practical skills and online earning methods in the simplest 
                  language possible. Whether you're looking to develop new skills, plan your studies better, 
                  or explore ways to earn money online, we're here to guide you every step of the way.
                </p>
                <p className="text-primary font-semibold">
                  Let's build your future together, one smart step at a time.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground">Abhishek</h3>
                    <p className="text-muted-foreground">Student Mentor</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground">Adarsh</h3>
                    <p className="text-muted-foreground">Student Mentor</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Practical Skills Training</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Online Earning Guidance</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Career Development</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Student-Friendly Approach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote 2 */}
      <QuoteCallout 
        quote="The only way to do great work is to love what you do."
        author="Steve Jobs"
      />

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guidance to help you succeed in your academic and professional journey
            </p>
          </div>
          
          <ServicesGrid />
        </div>
      </section>

      {/* Quote 3 */}
      <QuoteCallout 
        quote="Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
        author="Malcolm X"
      />

      {/* Why Choose Me Section */}
      <section id="why-choose-me" className="py-20 bg-card">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What makes our mentorship different and effective
            </p>
          </div>
          
          <WhyChooseMe />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your journey? Let's connect and make it happen!
            </p>
          </div>
          
          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>© {new Date().getFullYear()} Learning-Earning. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Built with</span>
              <span className="text-red-500">❤️</span>
              <span>using</span>
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
