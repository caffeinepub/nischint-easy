interface QuoteCalloutProps {
  quote: string;
  author: string;
}

export function QuoteCallout({ quote, author }: QuoteCalloutProps) {
  return (
    <div className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <blockquote className="relative">
            <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">"</div>
            <p className="text-xl md:text-2xl text-foreground/90 italic text-center font-medium px-8 text-balance">
              {quote}
            </p>
            <div className="absolute -bottom-4 -right-2 text-6xl text-primary/20 font-serif rotate-180">"</div>
            <footer className="mt-6 text-center">
              <cite className="text-muted-foreground not-italic font-semibold">
                — {author}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
