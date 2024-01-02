import React, { ReactElement } from 'react';
import {
    ArtType,
    ImageType,
    isArtType,
    isImageType,
    isTextType,
    ObjectType,
    TextType,
} from '../../../types/types';
import { TextObject } from '../TextObject/TextObject';
import classes from './ObjectView.module.css';
import { ImageObject } from '../ImageObject/ImageObject';
import { ArtObject } from '../ArtObject/ArtObject';
import ResizeControls from '../ResizeControls/ResizeControls';
import { useObjectInteraction } from '../../../hooks/useObjectInteraction';

interface IObjectView {
    object: ObjectType;
    setObject: (object: ObjectType) => void;
    resetAllSelections: () => void;
}

const ObjectView = ({ object, setObject, resetAllSelections }: IObjectView) => {
    const onInteraction = useObjectInteraction({
        object: object,
        changeObject: setObject,
    });

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (object.isSelected) {
            onInteraction(e);
            return;
        }

        resetAllSelections();

        setObject({
            ...object,
            isSelected: true,
        });
    };

    let element: ReactElement = <></>;
    if (isTextType(object)) {
        element = <TextObject textObject={object as TextType} />;
    } else if (isImageType(object)) {
        element = <ImageObject imageObject={object as ImageType} />;
    } else if (isArtType(object)) {
        element = <ArtObject artObject={object as ArtType} />;
    }

    return (
        <div
            className={classes.objectContainer}
            style={{
                top: object.y,
                left: object.x,
                width: object.width,
                height: object.height,
                outline: object.isSelected ? '1px dashed gray' : undefined,
            }}
            onMouseDown={handleMouseDown}
        >
            {element}
            {object.isSelected ? (
                <ResizeControls resizeHandler={onInteraction} />
            ) : null}
        </div>
    );
};

export { ObjectView };
