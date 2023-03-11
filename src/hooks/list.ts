
import { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'

import type { Item, Filter } from 'types/item'

export const useList = (initialItems: Item[]) => {
    const [items, setItems] = useState<Item[]>(initialItems);

    const [currentFilter, setCurrentFilter] = useState<Filter>('all');
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedItems, setSearchedItems] = useState<Item[]>(filteredItems);

    // Insert a new item at the end of the list
    const addItem = (newItemText: string, newItemComplete: boolean = false) => {
        setItems([
            ...items,
            { id: uuid(), text: newItemText, complete: newItemComplete }
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
    const editItem = (selectedItem: Item, newItemText: string) => {
        setItems(
            items.map((item) => {
                if (item === selectedItem) item.text = newItemText;
                return item;
            })
        );
    };

    // Set the list to empty
    const clearItems = () => {
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

        addItem: addItem,
        removeItem: removeItem,
        editItem: editItem,
        toggleItemComplete: toggleItemComplete,
        clearItems: clearItems,
        clearCompleteItems: clearCompleteItems,

        currentFilter: currentFilter,
        setCurrentFilter: (newFilter: Filter) => { setCurrentFilter(newFilter); },

        searchValue: searchValue,
        setSearchValue: (newSearchValue: string) => { setSearchValue(newSearchValue); },
    };
};
