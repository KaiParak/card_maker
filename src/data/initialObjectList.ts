import { ObjectType } from '../types/types';
import circle from '../arts/circle.svg';

const initialObjectList: ObjectType[] = [
    {
        id: 'text',
        isSelected: false,
        width: 100,
        height: 100,
        x: 10,
        y: 10,
        content: 'sdjsdjisdsid',
        fontFamily: 'Arial',
        fontSize: 18,
        fontColor: 'black',
        decorations: ['underline'],
    },
    {
        id: 'image',
        width: 400,
        height: 600,
        x: 300,
        y: 400,
        isSelected: false,
        imageSrc:
            'https://i.pinimg.com/originals/46/ef/99/46ef998c64e221407bb5ac3c17e5d1bf.jpg',
    },
    {
        id: 'art',
        width: 400,
        height: 600,
        x: 50,
        y: 100,
        isSelected: false,
        artSrc: circle,
    },
];

export { initialObjectList };
