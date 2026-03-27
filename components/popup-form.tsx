'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase/client';

// ✅ Updated real tours
const destinations = [
  { value: 'vietnam_7_days', label: '7 Days Vietnam Tour' },
  { value: 'scandinavia_10_days', label: '10 Days Scandinavia Tour' },
  { value: 'kenya_6_days', label: '6 Days Kenya Safari' },
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

  // ✅ Show popup after 2 interactions
  useEffect(() => {
    const hasClosed = sessionStorage.getItem('popupClosed');
    if (hasClosed === 'true') {
      setIsClosed(true);
      return;
    }

    const handleInteraction = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('.popup-form')) return;

      let interactionCount = parseInt(
        sessionStorage.getItem('popupInteractions') || '0',
        10
      );

      interactionCount += 1;
      sessionStorage.setItem('popupInteractions', interactionCount.toString());

      if (interactionCount >= 2 && !isClosed) {
        setTimeout(() => setIsVisible(true), 400);
      }
    };

    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, [isClosed]);

  // ✅ Close popup
  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    setError(null);
    sessionStorage.setItem('popupClosed', 'true');
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      setIsSubmitting(false);
      return;
    }

    const mobileRegex = /^\+?[1-9]\d{7,14}$/;
    if (!mobileRegex.test(formData.mobile_number)) {
      setError('Enter valid mobile number (e.g., +919876543210)');
      setIsSubmitting(false);
      return;
    }

    if (!formData.preferred_destination) {
      setError('Please select a destination');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from('homepage_inquiries').insert([
        {
          name: formData.name.trim(),
          mobile_number: formData.mobile_number.trim(),
          preferred_destination: formData.preferred_destination,
        },
      ]);

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }

      // ✅ Success flow
      setIsSuccess(true);
      setFormData({
        name: '',
        mobile_number: '',
        preferred_destination: '',
      });

      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 popup-form">
      <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
        >
          <X size={18} />
        </button>

        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="font-serif font-bold text-2xl mb-2">
              Plan Your Next Trip ✈️
            </h2>
            <p className="text-muted-foreground text-sm">
              Tell us your interest & we’ll call you shortly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="+919876543210"
                value={formData.mobile_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile_number: e.target.value,
                  })
                }
                disabled={isSubmitting}
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label>Preferred Destination</Label>
              <Select
                value={formData.preferred_destination}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    preferred_destination: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
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

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-accent hover:text-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Get a Call Back'}
            </Button>

            {/* Success */}
            {isSuccess && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md text-center text-sm">
                Submitted! Our team will contact you soon.
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md text-center text-sm">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}