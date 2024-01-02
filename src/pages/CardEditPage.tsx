import React, { useState } from 'react';
import { CardDataType, FilterType, ObjectType } from '../types/types';
import { TopToolbar } from '../components/TopToolbar/TopToolbar';
import { LeftToolbar } from '../components/LeftToolbar/LeftToolbar';
import { Canvas } from '../components/Canvas/Canvas';
import { ObjectView } from '../components/ObjectView/ui/ObjectView';
import classes from './CardEditPage.module.css';
import { initialObjectList } from '../data/initialObjectList';

const CardEditPage = () => {
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
        objects: initialObjectList,
    });

    const setObject = (object: ObjectType) => {
        setCardData({
            ...cardData,
            objects: cardData.objects.map((obj: ObjectType): ObjectType => {
                if (object.id === obj.id) {
                    return { ...obj, ...object };
                }
                return obj;
            }),
        });
    };

    const resetAllSelections = () => {
        setCardData({
            ...cardData,
            objects: cardData.objects.map((obj: ObjectType): ObjectType => {
                return { ...obj, isSelected: false };
            }),
        });
    };

    const addObject = (object: ObjectType) => {
        setCardData({
            ...cardData,
            objects: [...cardData.objects, object],
        });
    };

    const removeObject = (object: ObjectType) => {
        setCardData({
            ...cardData,
            objects: cardData.objects.filter((obj: ObjectType) => {
                return object.id !== obj.id;
            }),
        });
    };

    const setFilter = (filter: FilterType) => {
        setCardData({
            ...cardData,
            filter: filter,
        });
    };

    const selectedObject = cardData.objects.filter((obj: ObjectType) => {
        return obj.isSelected;
    })[0];

    return (
        <div className={classes.page}>
            <TopToolbar
                cardData={cardData}
                setCardData={setCardData}
                addObject={addObject}
                setFilter={setFilter}
                filter={cardData.filter}
            />
            <div className={classes.inlineContainer}>
                <LeftToolbar
                    removeObject={removeObject}
                    selectedObject={selectedObject}
                    setObject={setObject}
                />
                <Canvas
                    canvasProps={cardData.canvas}
                    filter={cardData.filter}
                    resetAllSelections={resetAllSelections}
                >
                    {cardData.objects.map((object: ObjectType) => (
                        <ObjectView
                            key={object.id}
                            object={object}
                            setObject={setObject}
                            resetAllSelections={resetAllSelections}
                        />
                    ))}
                </Canvas>
            </div>
        </div>
    );
};

export { CardEditPage };
