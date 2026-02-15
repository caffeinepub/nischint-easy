import { DollarSign, Lightbulb, BookOpen, Map } from 'lucide-react';

const services = [
  {
    icon: DollarSign,
    title: 'Online Earning Guidance',
    description: 'Learn proven methods to earn money online through freelancing, content creation, and digital skills. I\'ll show you practical ways to start earning while you study.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Lightbulb,
    title: 'Skill Development Training',
    description: 'Master in-demand skills that employers value. From technical abilities to soft skills, I\'ll help you build a strong foundation for your future career.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: BookOpen,
    title: 'Study Strategy Planning',
    description: 'Develop effective study habits and time management techniques. Learn how to study smarter, not harder, and achieve better results with less stress.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Map,
    title: 'Career Roadmap Guidance',
    description: 'Get clear direction for your career path. I\'ll help you identify your strengths, explore opportunities, and create a step-by-step plan to reach your goals.',
    color: 'from-orange-500 to-red-500'
  }
];

export function ServicesGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <div
            key={index}
            className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {service.title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
