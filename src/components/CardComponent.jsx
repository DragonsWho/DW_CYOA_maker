import React, { forwardRef, useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

const CardComponent = forwardRef(({
    id, title, text, imageUrl, points, cardWidth, minCardWidth, maxHeight, clickedCards, handleCardClick, requirement, onCreateContainerThree
}, ref) => {
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
         
        if (requirement) {
            setIsAvailable(requirement(clickedCards));
        }
    }, [clickedCards, requirement]);

    const handleClick = () => {
        if (isAvailable) {
            handleCardClick(id, points);
            if (id === 22 && onCreateContainerThree) {  
                onCreateContainerThree();
            }
        }
    };

    return (
        <Box
            ref={ref}
            sx={{
                width: cardWidth,
                minWidth: minCardWidth,
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 2,
                height: maxHeight || 'auto',
                backgroundColor: clickedCards[id] ? '#ffcccb' : '#fff',  
                filter: isAvailable ? 'none' : 'grayscale(100%) blur(1px)',  
                pointerEvents: isAvailable ? 'auto' : 'none',
            }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardActionArea onClick={handleClick} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt={title}
                        sx={{ flexShrink: 0 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
});

export default CardComponent;
CardComponent.displayName = 'CardComponent';