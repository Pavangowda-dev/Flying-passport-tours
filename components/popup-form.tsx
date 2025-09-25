'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createBrowserClientSupabase } from '@/lib/supabase/client';

const destinations = [
  { value: 'china', label: 'China' },
  { value: 'japan-south-korea-north-korea', label: 'Japan, South Korea & North Korea' },
];

export default function PopupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    preferred_destination: '',
  });

  useEffect(() => {
    const hasClosed = sessionStorage.getItem('popupClosed');
    console.log('Initial state - popupClosed:', hasClosed, 'isClosed:', isClosed, 'isVisible:', isVisible);
    if (hasClosed === 'true') {
      setIsClosed(true);
      return;
    }

    const handleInteraction = (e: MouseEvent) => {
      // Don't count interactions within the popup itself
      if (e.target && (e.target as Element).closest('.popup-form')) {
        return;
      }

      // Get current interaction count
      let interactionCount = parseInt(sessionStorage.getItem('popupInteractions') || '0', 10);
      interactionCount += 1;
      sessionStorage.setItem('popupInteractions', interactionCount.toString());
      
      console.log('Interaction detected - Count:', interactionCount, 'isClosed:', isClosed);
      
      // Show popup on second interaction (count >= 2) and if not closed
      if (interactionCount >= 2 && !isClosed) {
        console.log('Second interaction detected - showing popup');
        // Add a small delay for smooth appearance
        setTimeout(() => {
          setIsVisible(true);
        }, 500);
      }
    };

    // Add global click listener
    document.addEventListener('click', handleInteraction);

    // Cleanup listener
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [isClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    setError(null);
    sessionStorage.setItem('popupClosed', 'true');
    console.log('Popup closed, sessionStorage set to true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    if (!mobileRegex.test(formData.mobile_number)) {
      setError('Please enter a valid mobile number (e.g., +919876543210)');
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createBrowserClientSupabase();
      const { error } = await supabase
        .from('homepage_inquiries')
        .insert([
          {
            name: formData.name.trim(),
            mobile_number: formData.mobile_number.trim(),
            preferred_destination: formData.preferred_destination,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
        setFormData({ name: '', mobile_number: '', preferred_destination: '' });
      }, 2000);
    } catch (err: any) {
      setIsSubmitting(false);
      setError('Failed to submit form. Please try again.');
      console.error('Submission error:', err.message || err);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Name input change:', e.target.value);
    setFormData({ ...formData, name: e.target.value });
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Mobile input change:', e.target.value);
    setFormData({ ...formData, mobile_number: e.target.value });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focused:', e.target.id);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input blurred:', e.target.id);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 popup-form">
      <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute max-sm:top-0 max-sm:right-0 max-sm:p-2 top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close"
        >
          <X size={18} className="max-sm:size-5" />
        </button>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="font-serif font-bold text-2xl mb-2">Ready to Explore with Flying Passport?</h2>
            <p className="text-muted-foreground">Fill out this form and we'll contact you soon</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="popup-name">Name</Label>
              <Input
                key="name-input"
                id="popup-name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleNameChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-mobile">Mobile Number</Label>
              <Input
                key="mobile-input"
                id="popup-mobile"
                type="tel"
                placeholder="e.g., +919876543210"
                required
                value={formData.mobile_number}
                onChange={handleMobileChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                disabled={isSubmitting}
                readOnly={false}
                autoComplete="tel"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-destination">Preferred Destination</Label>
              <Select
                required
                value={formData.preferred_destination}
                onValueChange={(value) => {
                  console.log('Selected destination:', value);
                  setFormData({ ...formData, preferred_destination: value });
                }}
              >
                <SelectTrigger id="popup-destination">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.value} value={dest.value}>
                      {dest.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : "Let's Go"}
            </Button>

            {isSuccess && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md text-center">
                Thanks for reaching out! One of our travel experts will be in touch within 12 hours.
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md text-center">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}