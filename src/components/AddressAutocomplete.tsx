import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressSuggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (coords: { lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  id?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  error,
  id
}) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [apiError, setApiError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const searchAddresses = async () => {
      if (!value || value.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        setApiError(null);
        return;
      }

      setIsLoading(true);
      setApiError(null);
      
      try {
        console.log('Attempting to fetch suggestions for:', value);
        
        // For Lovable projects, we need to check if there's a direct way to call the edge function
        // First try the standard Supabase edge function endpoint pattern
        let response;
        try {
          // Try the standard edge function endpoint
          response = await fetch(`${window.location.origin}/api/functions/mapbox-geocoding`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: value }),
          });
        } catch (firstError) {
          // If that fails, try alternative endpoint patterns
          console.log('First endpoint failed, trying alternative...');
          response = await fetch(`/functions/v1/mapbox-geocoding`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: value }),
          });
        }

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);
        
        if (data && data.features) {
          setSuggestions(data.features);
          setShowSuggestions(true);
          setSelectedIndex(-1);
        } else if (data && data.error) {
          setApiError(data.error);
          console.error('API Error:', data.error);
        }
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
        setApiError('Unable to fetch address suggestions. Please try again.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchAddresses, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setApiError(null);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.place_name);
    setShowSuggestions(false);
    if (onSelect) {
      onSelect({
        lat: suggestion.center[1],
        lng: suggestion.center[0]
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={cn("min-h-[100px] resize-none", className, error && "border-destructive focus-visible:ring-destructive")}
          rows={4}
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {apiError && !isLoading && (
          <div className="absolute right-3 top-3">
            <AlertCircle className="w-4 h-4 text-destructive" />
          </div>
        )}
      </div>

      {apiError && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1">
          <Card className="border-destructive bg-destructive/5">
            <div className="p-3 text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {apiError}
            </div>
          </Card>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && !apiError && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto shadow-lg bg-background border border-border">
          <div className="p-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                ref={el => suggestionRefs.current[index] = el}
                className={cn(
                  "flex items-start gap-3 p-3 cursor-pointer rounded-md text-sm transition-colors",
                  index === selectedIndex 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/50"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-left leading-tight">{suggestion.place_name}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AddressAutocomplete;