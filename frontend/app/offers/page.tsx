'use client';
import React from 'react';
import OfferList from './_components/Offers';
import AddOfferForm from "@/app/offer/components/createOffer";

const OffersPage: React.FC = () => {
    return (
        <div>

             <OfferList />

        </div>
    );
};

export default OffersPage;