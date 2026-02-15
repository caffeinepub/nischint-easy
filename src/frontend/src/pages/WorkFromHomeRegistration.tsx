import { useState } from 'react';
import { TopNav } from '../components/TopNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { useSubmitRegistration } from '../hooks/useQueries';
import type { RegistrationForm } from '../backend';

interface WorkFromHomeRegistrationProps {
  onNavigateHome: () => void;
}

export function WorkFromHomeRegistration({ onNavigateHome }: WorkFromHomeRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    age: '',
    city: '',
    education: '',
    skills: '',
    hasDevice: '',
    experience: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const whatsappUrl = 'https://wa.me/message/P243ECCLGYITA1';

  const submitMutation = useSubmitRegistration();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const registrationData: RegistrationForm = {
        name: formData.fullName,
        phone: formData.mobileNumber,
        email: formData.email || '',
        university: formData.city || '',
        major: formData.education || '',
        year: formData.age || '',
        skillLevel: formData.skills || '',
        interests: `Device: ${formData.hasDevice || 'Not specified'}, Experience: ${formData.experience || 'Not specified'}`,
      };

      try {
        await submitMutation.mutateAsync(registrationData);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Failed to submit registration:', error);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Thank you! Our team will contact you soon.
            </h1>
            <p className="text-xl text-muted-foreground">
              We've received your application and will get back to you shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={onNavigateHome}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
              <Button
                asChild
                size="lg"
                className="gap-2"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Start Earning From Home
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our online work opportunity today.
            </p>
          </div>

          {/* Backend Error Alert */}
          {submitMutation.isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Failed to submit your registration. Please try again or contact us directly on WhatsApp.
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-semibold">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`h-12 ${errors.fullName ? 'border-destructive' : ''}`}
                  disabled={submitMutation.isPending}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-base font-semibold">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className={`h-12 ${errors.mobileNumber ? 'border-destructive' : ''}`}
                  disabled={submitMutation.isPending}
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-destructive">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12"
                  disabled={submitMutation.isPending}
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-base font-semibold">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="h-12"
                  disabled={submitMutation.isPending}
                />
                <p className="text-sm text-muted-foreground">Minimum age: 14+</p>
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-semibold">
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="h-12"
                  disabled={submitMutation.isPending}
                />
              </div>

              {/* Education */}
              <div className="space-y-2">
                <Label htmlFor="education" className="text-base font-semibold">
                  Education
                </Label>
                <Input
                  id="education"
                  type="text"
                  placeholder="e.g., 12th Pass, Graduate, etc."
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="h-12"
                  disabled={submitMutation.isPending}
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-base font-semibold">
                  Skills
                </Label>
                <Select
                  value={formData.skills}
                  onValueChange={(value) => handleInputChange('skills', value)}
                  disabled={submitMutation.isPending}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Has Device */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  Do you have a Laptop or Smartphone?
                </Label>
                <RadioGroup
                  value={formData.hasDevice}
                  onValueChange={(value) => handleInputChange('hasDevice', value)}
                  disabled={submitMutation.isPending}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="device-yes" />
                    <Label htmlFor="device-yes" className="font-normal cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="device-no" />
                    <Label htmlFor="device-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-base font-semibold">
                  Experience (Optional)
                </Label>
                <Textarea
                  id="experience"
                  placeholder="Tell us about your experience or what you're looking for..."
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="min-h-[120px] resize-none"
                  disabled={submitMutation.isPending}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-semibold"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to be contacted by our team.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
