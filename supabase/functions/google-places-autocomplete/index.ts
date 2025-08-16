import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== DEBUG: google-places-autocomplete called with request')
    const { query } = await req.json()
    console.log('=== DEBUG: Query received:', query)

    if (!query || query.length < 3) {
      return new Response(
        JSON.stringify({ predictions: [] }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    console.log('=== DEBUG: API Key exists:', !!apiKey)
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Google Maps API key not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Call Google Places Autocomplete API - removed types restriction to allow postcodes
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&components=country:gb&key=${apiKey}`
    console.log('=== DEBUG: Calling Google API URL:', url.replace(apiKey, 'HIDDEN_KEY'))
    const response = await fetch(url)

    console.log('=== DEBUG: Google API response status:', response.status)
    if (!response.ok) {
      console.log('=== DEBUG: Google API response not ok')
      return new Response(
        JSON.stringify({ error: 'Failed to fetch address suggestions' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status 
        }
      )
    }

    const data = await response.json()
    console.log('=== DEBUG: Google API response data:', data)

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return new Response(
        JSON.stringify({ error: `Google Places API error: ${data.status}` }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in google-places-autocomplete function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})