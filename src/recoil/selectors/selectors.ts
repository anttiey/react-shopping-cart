import { selector, selectorFamily } from 'recoil';
import type { TCartItem } from '../../types/CartItem.type';
import { isSigolState, selectedCartItemListState } from '../atoms/atoms';
import { calculateDeliveryFee } from '../../utils/calculateDeliveryFee';

export const selectedCartItemListSelector = selectorFamily<boolean, TCartItem>({
  key: 'selectedCartItemListSelector',
  get:
    (newItem: TCartItem) =>
    ({ get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      return selectedCartItemList.some((item) => item.id === newItem.id);
    },
  set:
    (newItem: TCartItem) =>
    ({ set, get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      const isSelected = selectedCartItemList.some((item) => item.id === newItem.id);

      set(
        selectedCartItemListState,
        isSelected ? selectedCartItemList.filter((item) => item.id !== newItem.id) : [...selectedCartItemList, newItem],
      );
    },
});

export const deliveryFeeSelector = selector({
  key: 'deliveryFeeSelector',
  get: ({ get }) => {
    const isSigol = get(isSigolState);
    const cartItemTotalPrice = get(cartOrderTotalPriceSelector);

    return calculateDeliveryFee(cartItemTotalPrice, isSigol);
  },
});

export const cartOrderTotalPriceSelector = selector({
  key: 'selectedCartItemListTotalPriceSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const cartOrderTotalCountSelector = selector({
  key: 'selectedCartItemListTotalCountSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
