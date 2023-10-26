import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  dataFocusVisibleClasses
} from '@nextui-org/react';
import { CartIcon } from './icons';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Product } from '@/app/products/_components/product';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function CartModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('md');
  const { data: session } = useSession();
  const queryClient = new QueryClient();
  const { data: products, isLoading } = useQuery({
    queryKey: ['getCart'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CART_API_URL}/getCart?userId=${session?.user?.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.user?.accessToken
          }
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    }
  });

  const { mutate: clear } = useMutation({
    mutationKey: ['clearCart'],
    mutationFn: async () => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_CART_API_URL}/clearCart?userId=${session?.user?.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.user?.accessToken
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getCart']);
    }
  });

  const newOrder = {
    customerId: session?.user?.id,
    productId: products && products.length > 0 ? [products[0].id] : 0,
    quantity: 1,
    price: products && products.length > 0 ? products[0].price : 0,
    total:
      products && products.length > 0 ? products[0].price * products[0].qty : 0 ,
    status: 'Pending',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    address: 'El Ghazela',
    payment: 'Credit Card'
  };
  const { mutate: createOrder } = useMutation({
    mutationKey: ['createOrder'],

    mutationFn: async () => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders/createOrder`,
        newOrder,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.user?.accessToken
          }
        }
      );
    },
    onSuccess: () => {
      // navigate to /orders
      const router = useRouter();
      router.push('/orders');
    }
  });

  const sizes = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    'full'
  ];

  const handleOpen = () => {
    setSize('md');
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="light" key={size} onPress={() => handleOpen()}>
          <CartIcon />
        </Button>
      </div>
      <Modal
        size={'md'}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                My Shopping Cart
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3 p-10">
                  <div className="flex flex-col items-center gap-5">
                    {session && products && products.products ? (
                      products.products.map((product: Product) => (
                        <div
                          key={product.name}
                          className="flex flex-row items-center gap-5"
                          style={{ marginBottom: '10px' }}
                        >
                          <Image
                            isZoomed
                            width={100}
                            height={100}
                            alt={`Product ${product.name} Image with Zoom`}
                            src={product.image}
                          />
                          <div className="flex flex-col gap-1">
                            <div>{product.name}</div>
                            <div>Price: ${product.price}</div>
                            <div>Quantity: 1</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>Cart is empty</div>
                    )}
                  </div>

                  <div className="flex flex-row pt-5 items-center justify-center">
                    {/* <Button
                      color="secondary"
                      variant="bordered"
                      onPress={onClose}
                    >
                      Proceed to Checkout
                    </Button> */}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-white-900">
                        <p>Subtotal</p>
                        <p>{products ? '$' + products.cartTotal : '$0'}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={(
                            event: React.MouseEvent<
                              HTMLAnchorElement,
                              MouseEvent
                            >
                          ) => {
                            event.preventDefault();
                            createOrder();
                          }}
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Button
                          color="danger"
                          variant="bordered"
                          startContent={<CartIcon />}
                          onPress={() => clear()}
                        >
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
