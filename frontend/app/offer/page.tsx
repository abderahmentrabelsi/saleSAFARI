'use client';
import React from 'react';
import OfferList from './components/offer'
import AddOfferForm from "@/app/offer/components/createOffer";

const OffersPage: React.FC = () => {
    return (
        <div>

            <AddOfferForm />
        </div>
    );
};

export default OffersPage;