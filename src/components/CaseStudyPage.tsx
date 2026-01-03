"use client";

import { FloatingNav } from "./FloatingNav";
import { Badge } from "./ui/badge";

interface CaseStudyPageProps {
  id: string;
  title: string;
  description: string;
  gammaUrl: string;
  featuredTag?: string;
  category?: string;
  year?: string;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
}

export function CaseStudyPage({
  id,
  title,
  description,
  gammaUrl,
  featuredTag,
  category,
  year,
  onNavigate,
  onBack,
}: CaseStudyPageProps) {
  // Convert regular Gamma URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    if (!url || url === "YOUR_GAMMA_URL_HERE") return null;
    
    // If it's already an embed URL, return it
    if (url.includes('/embed/')) return url;
    
    // Try to convert /docs/ URL to /embed/
    if (url.includes('/docs/')) {
      // Extract the doc ID from the URL
      const match = url.match(/\/docs\/[^-]+-([a-z0-9]+)/);
      if (match && match[1]) {
        return `https://gamma.app/embed/${match[1]}`;
      }
    }
    
    return null;
  };

  const embedUrl = getEmbedUrl(gammaUrl);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Floating Navigation */}
      <FloatingNav 
        onNavigate={onNavigate} 
        onBack={onBack}
        currentPage={`Case Study: ${title}`}
      />

      {/* Main Content - with top padding to account for floating nav */}
      <div className="px-8 pb-8 pt-24">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl">{title}</h1>
              {featuredTag && (
                <Badge className="bg-black text-white hover:bg-gray-800">
                  {featuredTag}
                </Badge>
              )}
            </div>
            
            {(category || year) && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {category && <span>{category}</span>}
                {year && <span>• {year}</span>}
              </div>
            )}
            
            <p className="text-lg text-muted-foreground max-w-4xl">
              {description}
            </p>
          </div>

          {/* Embedded Gamma Presentation */}
          <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {embedUrl ? (
              <div className="relative">
                <iframe
                  src={embedUrl}
                  title={title}
                  className="h-[calc(100vh-16rem)] w-full"
                  frameBorder="0"
                  allowFullScreen
                  style={{ minHeight: "600px" }}
                  onError={() => console.error('Iframe failed to load')}
                />
                <div className="absolute right-4 top-4 rounded bg-black/70 px-3 py-1 text-xs text-white">
                  Loading: {embedUrl}
                </div>
              </div>
            ) : (
              <div className="flex h-[600px] items-center justify-center bg-muted/30">
                <div className="text-center space-y-4 max-w-2xl px-6">
                  <p className="text-xl text-muted-foreground">
                    Gamma presentation will be embedded here
                  </p>
                  <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-left">
                    <p className="text-sm mb-2">
                      <strong>Current URL:</strong> <code className="bg-yellow-100 px-2 py-1 rounded text-xs">{gammaUrl || 'Not set'}</code>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      To fix: Go to your Gamma presentation → Click <strong>Share</strong> → Click <strong>Embed</strong> tab → Copy the URL (should be <code className="bg-yellow-100 px-1 rounded">https://gamma.app/embed/YOUR-ID</code>)
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Item ID: <code className="bg-gray-100 px-2 py-1 rounded">{id}</code>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}