import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

import {
    DeckList,
    SearchBar,
    SearchResults
} from './components';

import {
    fetchCards,
} from './api';

const App = () => {
    // fetchCards().then(console.log);
    const [results, setResults] = useState([]);
    const [deck, setDeck] = useState([]);
    console.log("new results", results)

    const addCardToDeck = ({ id, name }) => {
        const nextDeck = [...deck]; // make a duplicate first
        const index = nextDeck.findIndex(card => card.id === id);

        // index will be -1 if it is not found
        if (index > -1) {
            nextDeck[index].count += 1;
        } else {
            nextDeck.push({
                id,
                name,
                count: 1
            });
        }

        setDeck(nextDeck);
    }

    const removeCardFromDeck = ({ id }) => {
        const nextDeck = [...deck];
        const index = nextDeck.findIndex(card => card.id === id);

        if (index === -1) {
            // don't do anything if we're trying to remove a card not in the deck
            return;
        }

        if (nextDeck[index].count === 1) {
            // remove the card altogether
            nextDeck.splice(index, 1);
        } else {
            // decrement the count
            nextDeck[index].count -= 1;
        }

        setDeck(nextDeck);
    }

    return (
        <div id="app">
            <SearchBar setResults={setResults} />
            <SearchResults
                results={results}
                addCardToDeck={addCardToDeck}
                removeCardFromDeck={removeCardFromDeck} />
            <DeckList deck={deck} />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);