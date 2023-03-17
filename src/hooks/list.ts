
import { useState, useEffect } from 'react'

import type { Item, Filter } from '@/types/item'

export const useList = (initialItems: Item[]) => {

    const [items, setItems] = useState<Item[]>(initialItems);

    const [currentFilter, setCurrentFilter] = useState<Filter>('all');
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedItems, setSearchedItems] = useState<Item[]>(filteredItems);

    // Append a new item to the list
    const addItem = (newItem: Item) => {
        setItems([
            ...items,
            newItem,
        ]);
    };

    // Remove an item from the list
    const removeItem = (selectedItem: Item) => {
        setItems(
            items.filter((item) => {
                return item !== selectedItem;
            })
        );
    };

    // Toggle selected item complete value
    const toggleItemComplete = (selectedItem: Item) => {
        setItems(
            items.map((item) => {
                if (item === selectedItem) item.complete = !item.complete;
                return item;
            })
        );
    };

    // Set new text value for selected item
    const editItemText = (selectedItem: Item, newItemText: string) => {
        setItems(
            items.map((item) => {
                if (item === selectedItem) item.text = newItemText;
                return item;
            })
        );
    };

    // Set the list to empty
    const clearAllItems = () => {
        setItems([]);
    };

    // Remove items where 'complete === true'
    const clearCompleteItems = () => {
        setItems(
            items.filter((item) => {
                return !item.complete;
            })
        );
    };

    // Filter items based on current filter whenever list or 
    // current filter change
    useEffect(() => {
        setFilteredItems(
            items.filter((item) => {
                switch (currentFilter) {
                    case 'all':
                        return true;
                    case 'incomplete':
                        return !item.complete;
                    case 'complete':
                        return item.complete;
                    default:
                        return true;
                }
            })
        );
    }, [items, currentFilter]);

    // Filter items based on current search value whenever list,
    // current filter, or search value change
    useEffect(() => {
        setSearchedItems(
            filteredItems.filter((item) => {
                return item.text
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            })
        );
    }, [filteredItems, searchValue]);

    return {
        items: searchedItems,
        setItems: (newItems: Item[]) => { setItems(newItems); },

        addItem,
        removeItem,
        editItemText,
        toggleItemComplete,
        clearAllItems,
        clearCompleteItems,

        currentFilter,
        setCurrentFilter: (newFilter: Filter) => { setCurrentFilter(newFilter); },

        searchValue,
        setSearchValue: (newSearchValue: string) => { setSearchValue(newSearchValue); },
    };
};
