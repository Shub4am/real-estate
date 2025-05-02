import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useProperty } from '@/contexts/PropertyContext';
import MapboxMap from '@/components/map/MapboxMap';
import { formatCurrency } from '@/utils/format';

// Import local fallback images
import cardImageBg1 from '../../assets/images/Image.png';
import cardImageBg2 from '../../assets/images/Image-2.png';
import cardImageBg3 from '../../assets/images/Image-3.png';
import cardImageBg4 from '../../assets/images/Image-4.png';
import cardImageBg5 from '../../assets/images/Image-5.png';
import cardImageBg6 from '../../assets/images/Image-6.png';
import cardImageBg7 from '../../assets/images/Image-7.png';
import cardImageBg8 from '../../assets/images/Image-8.png';
import cardImageBg9 from '../../assets/images/Image-9.png';

// Map of local images to use when database images aren't available
const localImages = [
  cardImageBg1, cardImageBg2, cardImageBg3, cardImageBg4, cardImageBg5,
  cardImageBg6, cardImageBg7, cardImageBg8, cardImageBg9
];

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getPropertyById, selectedProperty, loading, error } = useProperty();
  const [localImage, setLocalImage] = useState(null);
  
  // Fetch property data when ID is available
  useEffect(() => {
    if (id) {
      getPropertyById(id);
    }
  }, [id, getPropertyById]);
  
  // Set a local image based on property ID
  useEffect(() => {
    if (selectedProperty && selectedProperty._id) {
      const idChar = selectedProperty._id.slice(-1);
      const index = parseInt(idChar, 16) % localImages.length;
      setLocalImage(localImages[index]);
    }
  }, [selectedProperty]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-80 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !selectedProperty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Error Loading Property
          </h1>
          <p className="mb-6">{error || "Property not found"}</p>
          <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Prepare map data
  const mapMarker = selectedProperty.location?.coordinates 
    ? {
        latitude: selectedProperty.location.coordinates[1],
        longitude: selectedProperty.location.coordinates[0],
        title: selectedProperty.title,
        description: selectedProperty.address?.full || "Property Location",
      }
    : null;
  
  const mapViewState = mapMarker 
    ? {
        latitude: mapMarker.latitude,
        longitude: mapMarker.longitude,
        zoom: 15
      }
    : null;

  return (
    <>
      <Head>
        <title>{selectedProperty.title} | Real Estate</title>
        <meta name="description" content={selectedProperty.description} />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button - Increased top padding and z-index */}
        <div className="mb-6 pt-12 relative z-10">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-500 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to listings
          </button>
        </div>
        
        {/* Property Title and Status */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedProperty.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-lg text-gray-600 dark:text-gray-300">
              {selectedProperty.address?.full}
            </span>
            <span className={`px-2 py-1 rounded-md text-sm font-semibold ${
              selectedProperty.status === 'For Sale' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {selectedProperty.status}
            </span>
          </div>
        </div>
        
        {/* Property Image and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Property Image */}
          <div className="rounded-lg overflow-hidden shadow-lg h-[400px] relative">
            <Image
              src={localImage || cardImageBg1}
              alt={selectedProperty.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Property Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            {mapViewState ? (
              <MapboxMap 
                initialViewState={mapViewState}
                markers={mapMarker ? [mapMarker] : []}
                className="w-full h-[400px]"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map location not available</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Property Details and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Details */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Property Details</h2>
            
            {/* Price */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(selectedProperty.price)}
              </h3>
            </div>
            
            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                <p className="text-xl font-bold">{selectedProperty.details?.beds || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                <p className="text-xl font-bold">{selectedProperty.details?.baths || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Square Feet</p>
                <p className="text-xl font-bold">{selectedProperty.details?.sqft || 'N/A'}</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedProperty.description}
              </p>
            </div>
            
            {/* Features */}
            {selectedProperty.features && selectedProperty.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Features</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {selectedProperty.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sidebar Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Property Info</h2>
            
            {/* Property Type */}
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Property Type</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedProperty.propertyType}</p>
            </div>
            
            {/* Year Built */}
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Year Built</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedProperty.details?.yearBuilt || 'N/A'}</p>
            </div>
            
            {/* Address Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Address</h3>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">{selectedProperty.address?.street}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedProperty.address?.city}, {selectedProperty.address?.state} {selectedProperty.address?.zip}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{selectedProperty.address?.country}</p>
              </div>
            </div>
            
            {/* Contact Button */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold mt-4">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 