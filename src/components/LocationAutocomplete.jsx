import { useRef, useEffect } from "react"

const LocationAutocomplete = () => {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAP_API_KEY
        }&libraries=places&callback=initMap`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
        script.onload = initializeAutocomplete
      } else {
        initializeAutocomplete()
      }
    }

    const initializeAutocomplete = () => {
      // Initialize the Places Autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current
      )

      // Listen for the 'place_changed' event
      autocompleteRef.current.addListener("place_changed", handlePlaceSelect)
    }

    const handlePlaceSelect = () => {
      // Check if the Autocomplete object and getPlace method are available
      if (autocompleteRef.current && autocompleteRef.current.getPlace) {
        // Get the place details from the autocomplete object
        const place = autocompleteRef.current.getPlace()

        // Access the address components if needed
        const addressComponents = place.address_components
        console.log("Address Components:", addressComponents)

        // Access other details like place name, latitude, longitude, etc.
        const placeName = place.name
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()

        console.log("Place Name:", placeName)
        console.log("Latitude:", latitude)
        console.log("Longitude:", longitude)
      } else {
        console.error("Autocomplete object or getPlace method not available.")
      }
    }

    loadGoogleMapsScript()
  }, [])

  return (
    <form className="location-form">
      <label>
        <p className="label">Autocomplete Location</p>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your location"
          className="location-input"
        />
      </label>
    </form>
  )
}

export default LocationAutocomplete
