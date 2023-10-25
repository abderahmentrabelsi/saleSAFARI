import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image
} from '@nextui-org/react';
import { CartIcon } from './icons';

export default function CartModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('md');

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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                My Shopping Cart
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3 p-10">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <div>Product 1</div>
                      <div>Price: $10</div>
                      <div>Quantity: 1</div>
                    </div>
                    <Image
                      isZoomed
                      width={100}
                      height={100}
                      alt="Product 1 Image with Zoom"
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <div>Product 2</div>
                      <div>Price: $20</div>
                      <div>Quantity: 1</div>
                    </div>
                    <Image
                      isZoomed
                      width={100}
                      height={100}
                      alt="Product 2 Image with Zoom"
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <div>Product 3</div>
                      <div>Price: $30</div>
                      <div>Quantity: 1</div>
                    </div>
                    <Image
                      isZoomed
                      width={100}
                      height={100}
                      alt="Product 3 Image with Zoom"
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-03.jpg"
                    />
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
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
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
