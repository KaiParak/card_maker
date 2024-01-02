import React, { useState } from 'react';
import {
    ArtType,
    CardDataType,
    ImageType,
    ObjectType,
    TextType,
} from '../types/types';
import { TopToolbar } from '../components/TopToolbar/TopToolbar';
import { LeftToolbar } from '../components/LeftToolbar/LeftToolbar';
import { Canvas } from '../components/Canvas/Canvas';
import { ObjectView } from '../components/ObjectView/ui/ObjectView';
import classes from './CardEditPage.module.css';
import circle from '../arts/circle.svg';

const CardEditPage = () => {
    const textObject: TextType = {
        id: 'text',
        isSelected: true,
        width: 100,
        height: 100,
        x: 10,
        y: 10,
        content: 'sdjsdjisdsid',
        fontFamily: 'Arial',
        fontSize: 18,
        fontColor: 'black',
        decorations: ['underline'],
    };

    const imageObject: ImageType = {
        id: 'image',
        width: 400,
        height: 600,
        x: 300,
        y: 400,
        isSelected: true,
        imageSrc:
            'https://i.pinimg.com/originals/46/ef/99/46ef998c64e221407bb5ac3c17e5d1bf.jpg',
    };

    const artObject: ArtType = {
        id: 'image',
        width: 400,
        height: 600,
        x: 50,
        y: 100,
        isSelected: true,
        artSrc: circle,
    };

    const [cardData, setCardData] = useState<CardDataType>({
        filter: {
            r: 255,
            g: 255,
            b: 20,
            a: 0.2,
        },
        canvas: {
            width: 800,
            height: 600,
        },
        objects: [textObject, imageObject, artObject],
    });

    return (
        <div className={classes.page}>
            <TopToolbar cardData={cardData} setCardData={setCardData} />
            <div className={classes.inlineContainer}>
                <LeftToolbar />
                <Canvas canvasProps={cardData.canvas} filter={cardData.filter}>
                    {cardData.objects.map((object: ObjectType) => (
                        <ObjectView key={object.id} object={object} />
                    ))}
                </Canvas>
            </div>
        </div>
    );
};

export { CardEditPage };
