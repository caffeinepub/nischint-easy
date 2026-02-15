import { CheckCircle2, Users, Lightbulb, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: CheckCircle2,
    title: 'Simple and practical guidance',
    description: 'No complicated jargon or confusing theories. I break down complex topics into easy-to-understand steps that you can apply immediately.',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Student-friendly explanation',
    description: 'I speak your language. As someone who understands student challenges, I explain everything in a way that makes sense to you.',
    color: 'text-green-500'
  },
  {
    icon: Lightbulb,
    title: 'Real-life earning ideas',
    description: 'Learn practical methods that actually work. I share real opportunities and strategies that students like you are using to earn money today.',
    color: 'text-purple-500'
  },
  {
    icon: TrendingUp,
    title: 'Step-by-step support',
    description: 'You\'re never alone in your journey. I provide continuous guidance and support at every stage, helping you overcome obstacles and celebrate wins.',
    color: 'text-orange-500'
  }
];

export function WhyChooseMe() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-card to-secondary/20 border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 ${reason.color}`}>
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
