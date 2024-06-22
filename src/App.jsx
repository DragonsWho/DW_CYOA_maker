import React, { useState } from 'react';
import CardContainer from './components/CardContainer';
import { Box, Typography } from '@mui/material';

 
const App = () => {
 
    const [points, setPoints] = useState(0);
    const [clickedCards, setClickedCards] = useState({});
    const [containerInstances, setContainerInstances] = useState([]);
    const [isCard22Active, setIsCard22Active] = useState(false);

    // Data for the first card container
    // Each object represents a card with its properties:
    // id: unique identifier for the card
    // title: title displayed on the card
    // text: description displayed on the card
    // imageUrl: URL for the card's image
    // points: points awarded/deducted when the card is clicked
    // requirement: (optional) a function that determines if the card should be displayed
    const cardsContainerOne = [
        {
            id: 11,
            title: 'Choice 1',
            text: 'Hide Choice 3',
            imageUrl: 'https://via.placeholder.com/150',
            points: 30,
        },
        {
            id: 12,
            title: 'Choice 2',
            text: 'Hide Row 2',
            imageUrl: 'https://via.placeholder.com/150',
            points: 30,
        },
        {
            id: 13,
            title: 'Choice 3',
            text: 'Requires Choice 1',
            imageUrl: 'https://via.placeholder.com/150',
            points: 20,
            requirement: (clickedCards) => !clickedCards[11], // This card is only displayed if card 11 is not clicked
        },
    ];

    // Data for the second card container
    const cardsContainerTwo = [
        {
            id: 21,
            title: 'Choice 2-1',
            text: 'Hide Row 1',
            imageUrl: 'https://via.placeholder.com/150',
            points: 15,
        },
        {
            id: 22,
            title: 'Choice 2-2',
            text: 'bla-bla',
            imageUrl: 'https://via.placeholder.com/150',
            points: 25,
        },
    ];

    // Data for the third card container
    const cardsContainerThree = [
        {
            id: 31,
            title: 'Choice 3-1',
            text: 'Hide Row 1',
            imageUrl: 'https://via.placeholder.com/150',
            points: 15,
        },
        {
            id: 32,
            title: 'Choice 3-2',
            text: 'bla-bla',
            imageUrl: 'https://via.placeholder.com/150',
            points: 25,
        },
    ];

    // Function to handle card clicks
    // Updates points, clickedCards state, and manages the visibility of the third card container
    const handleCardClick = (id, pointsToAdd, containerId = null) => {
        setClickedCards((prevState) => {
            // Generate a unique key for the clicked card based on containerId (if available)
            const cardKey = containerId !== null ? `${containerId}-${id}` : id;
            // Toggle the clicked state of the card
            const newClickedState = !prevState[cardKey];

            // Update the points based on the new clicked state
            setPoints((prevPoints) =>
                newClickedState ? prevPoints + pointsToAdd : prevPoints - pointsToAdd
            );

            // If card 22 is clicked, create a new instance of the third container or remove it
            if (id === 22) {
                if (newClickedState) {
                    handleCreateContainerThree();
                }
                setIsCard22Active(newClickedState);
            }

            // Return the updated clickedCards state
            return { ...prevState, [cardKey]: newClickedState };
        });
    };
     
    // Function to create a new instance of the third card container
    // Each new instance will have unique IDs for its cards
    const handleCreateContainerThree = () => { 
        // Generate a new container ID
        const newContainerId = containerInstances.length + 1;
          
        // Generate a unique suffix for card IDs in this container
        const idSuffix = String(newContainerId - 1).padStart(2, '0');

        // Update the containerInstances state with the new container
        setContainerInstances([
            ...containerInstances,
            {
                id: newContainerId,
                cards: cardsContainerThree.map((card) => ({
                    ...card,
                    // Assign a unique ID to each card in the container
                    id: `${card.id}-${idSuffix}`,
                })),
            },
        ]);
    };

    // Check if the requirements for displaying the first and second containers are met
    const requirementOneMet = !clickedCards[21];
    const requirementTwoMet = !clickedCards[11];

    // JSX to render the application
    return (
        // Main container
        <Box>
            {/* Render the first card container if its requirement is met */}
            {requirementOneMet && (
                <CardContainer
                    cards={cardsContainerOne}
                    handleCardClick={handleCardClick}
                    clickedCards={clickedCards}
                    cardsPerRow={4}
                    minCardWidth={200}
                />
            )}
            {/* Render the second card container if its requirement is met */}
            {requirementTwoMet && (
                <CardContainer
                    cards={cardsContainerTwo}
                    handleCardClick={handleCardClick}
                    clickedCards={clickedCards}
                    cardsPerRow={3}
                    minCardWidth={200}
                />
            )}

            {/* Render the latest instance of the third card container if card 22 is active */}
            {isCard22Active && containerInstances.length > 0 && (
                <CardContainer
                    key={containerInstances[containerInstances.length - 1].id}
                    cards={containerInstances[containerInstances.length - 1].cards}
                    handleCardClick={(id, pointsToAdd) =>
                        handleCardClick(id, pointsToAdd, containerInstances[containerInstances.length - 1].id)
                    }
                    clickedCards={clickedCards}
                    cardsPerRow={3}
                    minCardWidth={200}
                />
            )}

            {/* Container for displaying the points */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    p: 2,
                }}
            >
                <Typography variant="h6" align="center" color="textPrimary">
                    Points: {points}
                </Typography>
            </Box>
        </Box>
    );
};

export default App;