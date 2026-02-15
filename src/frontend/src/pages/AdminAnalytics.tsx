import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BarChart3, Users } from 'lucide-react';
import { useGetAnalytics } from '../hooks/useQueries';

interface AdminAnalyticsProps {
  onNavigateHome: () => void;
}

export function AdminAnalytics({ onNavigateHome }: AdminAnalyticsProps) {
  const { data: analytics, isLoading, error } = useGetAnalytics();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={onNavigateHome}
              variant="ghost"
              className="gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Analytics Dashboard</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Overview of registration submissions and statistics
            </p>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Failed to load analytics. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-24" />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Cards */}
          {!isLoading && analytics && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle>Total Registrations</CardTitle>
                  </div>
                  <CardDescription>
                    Total number of form submissions received
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-primary">
                    {Number(analytics.totalRegistrations)}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>
                    Registration overview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Submissions</span>
                    <span className="font-semibold">{Number(analytics.totalRegistrations)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
