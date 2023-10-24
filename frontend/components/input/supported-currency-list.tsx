'use client';

import { useGetSupportedCurrenciesPaymentSupportedCurrenciesGet } from '@/api/apiComponents';
import { Select, SelectItem, Skeleton } from '@nextui-org/react';
import { Dispatch, Key, SetStateAction, useEffect, useState } from 'react';
interface CurrencyListProps {
  currency: string;
  handleValueChange: Dispatch<SetStateAction<string>>;
}

export const SupportedCurrencyList = ({
  currency,
  handleValueChange
}: CurrencyListProps) => {
  const { data, isLoading, isError } =
    useGetSupportedCurrenciesPaymentSupportedCurrenciesGet({});

  const [selectedCurrency, setSelectedCurrency] = useState<Set<Key> | 'all'>(
    new Set([currency])
  );
  useEffect(() => {
    if (selectedCurrency === 'all') return;
    handleValueChange(selectedCurrency.values().next().value);
  }, [selectedCurrency]);

  if (isLoading || !data) {
    return <Skeleton className="w-full max-w-xs h-[50px] rounded-xl" />;
  }

  return (
    <Select
      label="Select a currency"
      className="max-w-xs"
      size="sm"
      isRequired
      selectedKeys={selectedCurrency}
      onSelectionChange={setSelectedCurrency}
    >
      {data.map((currency) => (
        <SelectItem key={currency} value={currency}>
          {currency}
        </SelectItem>
      ))}
    </Select>
  );
};
