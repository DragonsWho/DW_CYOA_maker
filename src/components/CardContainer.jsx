import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import CardComponent from './CardComponent';

const CardContainer = ({ cards, handleCardClick, clickedCards, cardsPerRow, minCardWidth, containerId }) => {
    const cardRefs = useRef([]);
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        let maxHeight = 0;
        cardRefs.current.forEach((ref) => {
            if (ref) {
                maxHeight = Math.max(maxHeight, ref.clientHeight);
            }
        });
        setMaxHeight(maxHeight);
    }, [cards]);

    const cardWidth = `calc((100% - ${(cardsPerRow - 1) * 16}px) / ${cardsPerRow})`;

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
            }}
        >
            {cards.map((card, index) => (
                <CardComponent
                    key={index}
                    ref={(el) => (cardRefs.current[index] = el)}
                    id={card.id}
                    title={card.title}
                    text={card.text}
                    imageUrl={card.imageUrl}
                    points={card.points}
                    cardWidth={cardWidth}
                    minCardWidth={minCardWidth}
                    maxHeight={maxHeight}
                    clickedCards={clickedCards}
                    handleCardClick={handleCardClick}
                    requirement={card.requirement}
                    containerId={containerId}
                />
            ))}
        </Box>
    );
};

export default CardContainer;