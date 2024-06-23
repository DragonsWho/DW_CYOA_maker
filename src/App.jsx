import React, { useState } from 'react';
import CardContainer from './components/CardContainer';
import { Box, Typography } from '@mui/material';

const App = () => {
    const [points, setPoints] = useState(0);
    const [clickedCards, setClickedCards] = useState({});
    const [containerInstances, setContainerInstances] = useState([]);

    // Вместо isCard22Active будем хранить ID активного контейнера
    const [activeContainerId, setActiveContainerId] = useState(null); 

    const cardsContainerOne = [
        {
            id: 11,
            title: 'Choice 1',
            text: 'Hide Row 2',
            imageUrl: 'https://via.placeholder.com/150',
            points: 30,
        },
        {
            id: 12,
            title: 'Choice 2',
            text: 'Bla-bla',
            imageUrl: 'https://via.placeholder.com/150',
            points: 30,
        },
        {
            id: 13,
            title: 'Choice 3',
            text: 'Requires Choice 1',
            imageUrl: 'https://via.placeholder.com/150',
            points: 20,
            requirement: (clickedCards) => !clickedCards[11],
        },
    ];

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
            text: 'Create new copy of Row 3',
            imageUrl: 'https://via.placeholder.com/150',
            points: 25,
        },
    ];

    const cardsContainerThree = [
        {
            id: 31,
            title: 'Choice 3-1',
            text: 'bla-bla',
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

    const handleCardClick = (id, pointsToAdd, containerId = null) => {
        setClickedCards((prevState) => {
            const cardKey = containerId !== null ? `${id}-${containerId}` : id;
            const newClickedState = !prevState[cardKey];

            setPoints((prevPoints) =>
                newClickedState ? prevPoints + pointsToAdd : prevPoints - pointsToAdd
            );

            // Обновляем ID активного контейнера
            if (id === 22) {
                setActiveContainerId(newClickedState ? containerInstances.length + 1 : null);
                if (newClickedState) {
                    handleCreateContainerThree();
                }
            }

            return { ...prevState, [cardKey]: newClickedState };
        });
    };

    const handleCreateContainerThree = () => {
        const newContainerId = containerInstances.length + 1;
        const idSuffix = String(newContainerId - 1).padStart(2, '0');

        setContainerInstances([
            ...containerInstances,
            {
                id: newContainerId,
                cards: cardsContainerThree.map((card) => ({
                    ...card,
                    id: `${card.id}-${idSuffix}`,
                })),
            },
        ]);
    };

    const requirementOneMet = !clickedCards[21];
    const requirementTwoMet = !clickedCards[11];

    return (
        <Box>
            {requirementOneMet && (
                <CardContainer
                    cards={cardsContainerOne}
                    handleCardClick={handleCardClick}
                    clickedCards={clickedCards}
                    cardsPerRow={4}
                    minCardWidth={200}
                />
            )}
            {requirementTwoMet && (
                <CardContainer
                    cards={cardsContainerTwo}
                    handleCardClick={handleCardClick}
                    clickedCards={clickedCards}
                    cardsPerRow={3}
                    minCardWidth={200}
                />
            )}

            {containerInstances.map((container) => (
                container.id === activeContainerId && (
                    <CardContainer
                        key={container.id}
                        cards={container.cards}
                        // Передаем container.id в CardContainer
                        containerId={container.id}
                        handleCardClick={(id, pointsToAdd) =>
                            handleCardClick(id, pointsToAdd, container.id)
                        }
                        clickedCards={clickedCards}
                        cardsPerRow={3}
                        minCardWidth={200}
                    />
                )
            ))}

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