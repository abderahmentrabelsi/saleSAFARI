import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer
} from '@nextui-org/react';
import { format } from 'date-fns';
import { Offer } from '@/app/offers/_components/Offers'; // Import the format function

interface OfferDetailsModalProps {
  offer: Offer | null;
  onClose: () => void;
}

const OfferDetailsModal: React.FC<OfferDetailsModalProps> = ({
  offer,
  onClose
}) => {
  if (!offer) {
    return null;
  }

  // Format the start and end dates
  const formattedStartDate = format(new Date(offer.startDate), 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(offer.endDate), 'yyyy-MM-dd');

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{offer.namePer}</ModalHeader>
        <ModalBody>
          <p>Shop Name: {offer.shopName}</p>
          <Spacer y={1} />
          <p>Business Type: {offer.businessType}</p>
          <p className="text-gray-600 mb-2">
            Business Phone Number: {offer.businessPhoneNumber}
          </p>
          <p className="text-gray-600 mb-2">
            Business Email: {offer.businessEmail}
          </p>
          <p className="text-gray-600 mb-2">Description: {offer.description}</p>
          <div className="flex justify-between text-gray-600">
            <p>Start Date: {formattedStartDate}</p>
            <p>End Date: {formattedEndDate}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OfferDetailsModal;
