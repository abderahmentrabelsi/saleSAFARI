// OfferList.tsx

import React, { useEffect, useState } from 'react';
import { Card, Image, Button, Modal, Spacer } from '@nextui-org/react';
import OfferDetailsModal from './OfferDetailsModal'; // Corrected import path

export interface Offer {
  idOffer: number;
  namePer: string;
  shopName: string;
  businessType: string;
  businessPhoneNumber: number;
  businessEmail: string;
  description: string;
  startDate: string;
  endDate: string;
}

const OfferList: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  // State for modal visibility and selected offer details
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          'http://localhost:9000/bns/offer/retrieve-all-offers'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }

        const data: Offer[] = await response.json();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Function to handle "View Details" button click
  const handleViewDetails = (offer: Offer) => {
    setSelectedOffer(offer);
    setModalVisible(true);
  };

  // Function to handle modal closing
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOffer(null);
  };

  if (loading) {
    return <div>Loading offers...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Offers</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <Card
            key={offer.idOffer}
            className="p-4 rounded-md shadow-md transition-transform transform-gpu hover:scale-105"
          >
            <div className="mb-4">
              <Image
                src="https://images.freeimages.com/images/premium/previews/5905/59051846-shop-building-display-window-sale-drawing.jpg"
                alt="Offer Image"
                className="rounded-md"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{offer.namePer}</h2>
              <Button
                color="primary"
                size="sm"
                onClick={() => handleViewDetails(offer)}
              >
                View Details
              </Button>
            </div>
            <p className="text-gray-600 mb-2">Shop Name: {offer.shopName}</p>
            <p className="text-gray-600 mb-2">
              Business Type: {offer.businessType}
            </p>
          </Card>
        ))}
      </div>

      {/* Modal for displaying offer details */}
      {modalVisible && (
        <OfferDetailsModal offer={selectedOffer} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OfferList;
