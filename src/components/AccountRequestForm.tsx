import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const accountRequestSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  businessName: z.string().min(1, 'Business name is required (use N/A if not registered)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type AccountRequestFormData = z.infer<typeof accountRequestSchema>;

interface AccountRequestFormProps {
  onClose: () => void;
}

const AccountRequestForm = ({ onClose }: AccountRequestFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountRequestFormData>({
    resolver: zodResolver(accountRequestSchema),
  });

  const onSubmit = async (data: AccountRequestFormData) => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('account_requests')
        .insert([{
          first_name: data.firstName,
          last_name: data.lastName,
          business_name: data.businessName,
          email: data.email,
          phone: data.phone,
        }]);

      if (error) throw error;

      // Send email notifications
      const emailError = await supabase.functions.invoke('send-account-request-email', {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          businessName: data.businessName,
          email: data.email,
          phone: data.phone
        }
      });

      if (emailError.error) {
        console.error('Email sending failed:', emailError.error);
        // Don't fail the request if email fails
      }

      setIsSubmitted(true);
      toast.success('Account request submitted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit account request');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Request Submitted!</h2>
          <p className="text-green-700 mb-6">
            Thank you for your interest in Fleetory! One of our specialist agents will contact you 
            as soon as possible to discuss your requirements and create your account.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We'll call you at <strong>{}</strong> to understand your business needs and 
            set up your account with the appropriate services.
          </p>
          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Business Account</CardTitle>
        <CardDescription>
          Ideal for regular users and businesses - keep on top of all your bookings and jobs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              {...register('businessName')}
              placeholder="Your Company Ltd (or N/A if not registered)"
            />
            {errors.businessName && (
              <p className="text-sm text-destructive">{errors.businessName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+44 7XXX XXXXXX"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-2">What happens next?</p>
            <p>
              Once you submit this form, one of our specialist agents will call you to discuss:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your business delivery requirements</li>
              <li>Types of goods you typically move</li>
              <li>Frequency of shipments</li>
              <li>Vehicle types you may require</li>
            </ul>
            <p className="mt-2">
              After this consultation, we'll create your account and send you login details.
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountRequestForm;