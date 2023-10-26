'use client';

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import OrderCard from "../../components/OrderCard";


const OrdersPage: React.FC = () => {
    const { data: session } = useSession();
   

    return (
      session &&  <OrderCard userId={session?.user.id}/>
    );
};

export default OrdersPage;