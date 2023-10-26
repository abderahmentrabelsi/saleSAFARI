import { Product } from '@/app/products/_components/product';
import { Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function AddToCartButton({ product }: { product: Product }) {
  const { data: session } = useSession();
  const { mutate } = useMutation({
    mutationKey: ['addToCart'],

    mutationFn: async () => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_CART_API_URL}/addToCart?userId=${session?.user?.id}`,
        product,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.user?.accessToken
          }
        }
      );
    },
    onSuccess: () => {
      alert('Added to cart!');
    }
  });

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    mutate();
  };

  return <Button onClick={handleClick}>Add to Cart</Button>;
}
