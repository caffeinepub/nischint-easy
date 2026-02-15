import { Mail, MessageCircle, Send } from 'lucide-react';

export function ContactSection() {
  const email = 'Singhabhishek16143@gmail.com';
  const whatsappUrl = 'https://wa.me/message/P243ECCLGYITA1';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Email Card */}
        <div className="bg-gradient-to-br from-card to-secondary/20 border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="h-10 w-10 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Email Me</h3>
              <p className="text-muted-foreground">
                Send me an email and I'll get back to you soon
              </p>
            </div>
            
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold group-hover:shadow-blue-glow"
            >
              <Send className="h-4 w-4" />
              {email}
            </a>
          </div>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-gradient-to-br from-card to-secondary/20 border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">WhatsApp</h3>
              <p className="text-muted-foreground">
                Connect instantly and start your journey today
              </p>
            </div>
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-4 w-4" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="inline-block bg-secondary/50 border border-border rounded-xl px-8 py-6">
          <p className="text-muted-foreground text-lg">
            Minimum age: 14+. No bonding commitment.
          </p>
        </div>
      </div>
    </div>
  );
}
