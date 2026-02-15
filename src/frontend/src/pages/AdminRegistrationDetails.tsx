import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, FileText, Inbox } from 'lucide-react';
import { useGetAllRegistrations } from '../hooks/useQueries';

interface AdminRegistrationDetailsProps {
  onNavigateHome: () => void;
}

export function AdminRegistrationDetails({ onNavigateHome }: AdminRegistrationDetailsProps) {
  const { data: registrations, isLoading, error } = useGetAllRegistrations();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
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
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Registration Details</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              View all submitted registration forms
            </p>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Failed to load registrations. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!isLoading && registrations && registrations.length === 0 && (
            <Card>
              <CardContent className="py-16">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Inbox className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No Registrations Yet
                    </h3>
                    <p className="text-muted-foreground">
                      Registration submissions will appear here once users start filling the form.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Registrations Table */}
          {!isLoading && registrations && registrations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>All Registrations ({registrations.length})</CardTitle>
                <CardDescription>
                  Complete list of submitted registration forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">#</TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Phone</TableHead>
                        <TableHead className="font-semibold">University</TableHead>
                        <TableHead className="font-semibold">Major</TableHead>
                        <TableHead className="font-semibold">Year</TableHead>
                        <TableHead className="font-semibold">Skill Level</TableHead>
                        <TableHead className="font-semibold">Interests</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((registration, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{registration.name}</TableCell>
                          <TableCell>{registration.email || '-'}</TableCell>
                          <TableCell>{registration.phone}</TableCell>
                          <TableCell>{registration.university || '-'}</TableCell>
                          <TableCell>{registration.major || '-'}</TableCell>
                          <TableCell>{registration.year || '-'}</TableCell>
                          <TableCell>{registration.skillLevel || '-'}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {registration.interests || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
