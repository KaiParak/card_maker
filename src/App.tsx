import React from 'react';
import { ArtType, CardDataType, ImageType, TextType } from './types/types';

const App = () => {
    const textObject: TextType = {
        id: 'text',
        isSelected: true,
        width: 100,
        height: 100,
        x: 10,
        y: 10,
        content: 'ABCD',
        fontFamily: 'Arial',
        fontSize: 18,
        fontColor: 'red',
        decorations: ['bold', 'italic', 'underline'],
    };

    const imageObject: ImageType = {
        id: 'image',
        width: 400,
        height: 600,
        x: 300,
        y: 400,
        isSelected: false,
        imageSrc: '',
    };

    const artObject: ArtType = {
        id: 'image',
        width: 400,
        height: 600,
        x: 300,
        y: 400,
        isSelected: false,
        artSrc: '',
    };

    // Минимальные данные. Коллекции пустые.
    const cardData1: CardDataType = {
        filter: {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
        },
        canvas: {
            width: 0,
            height: 0,
        },
        objects: [],
    };

    // В коллекциях могут быть некоторые элементы (не все типы элементов могут быть).
    const cardData2: CardDataType = {
        filter: {
            r: 255,
            g: 255,
            b: 255,
            a: 255,
        },
        canvas: {
            width: 800,
            height: 600,
        },
        objects: [textObject],
    };

    // Максимальные данные. Все коллекции заполнены всеми типами данных.
    const cardData3: CardDataType = {
        filter: {
            r: 255,
            g: 255,
            b: 255,
            a: 255,
        },
        canvas: {
            width: 800,
            height: 600,
        },
        objects: [textObject, imageObject, artObject],
    };

    return <div>My app</div>;
};

export { App };
