
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface GooglePlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (coords: { lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  error
}) => {
  const [suggestions, setSuggestions] = useState<GooglePlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [apiError, setApiError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
        console.log('Fetching Google Places suggestions for:', value);
        
        const { data, error } = await supabase.functions.invoke('google-places-autocomplete', {
          body: { query: value }
        });
        
        console.log('Edge function response:', { data, error });

        if (error) {
          console.error('Edge function error:', error);
          setApiError('Unable to connect to address service. Please try again.');
          return;
        }

        if (data.error) {
          console.error('Google Places API Error:', data.error);
          setApiError(data.error);
          return;
        }
        
        if (data.predictions && data.predictions.length > 0) {
          setSuggestions(data.predictions);
          setShowSuggestions(true);
          setSelectedIndex(-1);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setApiError(null);
  };

  const handleSuggestionClick = async (suggestion: GooglePlacePrediction) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    
    if (onSelect) {
      try {
        // Get place details including coordinates
        const { data, error } = await supabase.functions.invoke('google-places-details', {
          body: { placeId: suggestion.place_id }
        });

        if (error || data.error) {
          console.error('Error fetching place details:', error || data.error);
          return;
        }

        if (data.result?.geometry?.location) {
          onSelect({
            lat: data.result.geometry.location.lat,
            lng: data.result.geometry.location.lng
          });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
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
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={cn(className, error && "border-destructive")}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {apiError && !isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto shadow-lg">
          <div className="p-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.place_id}
                ref={el => suggestionRefs.current[index] = el}
                className={cn(
                  "flex items-center gap-2 p-3 cursor-pointer rounded-md text-sm transition-colors",
                  index === selectedIndex 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/50"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{suggestion.structured_formatting.main_text}</div>
                  <div className="text-xs text-muted-foreground truncate">{suggestion.structured_formatting.secondary_text}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AddressAutocomplete;
