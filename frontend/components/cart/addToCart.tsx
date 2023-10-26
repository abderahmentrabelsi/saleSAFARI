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
        `http://localhost:8089/addToCart?userId=${session?.user?.id}`,
        product,
        {
          headers: {
            'Content-Type': 'application/json'
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
