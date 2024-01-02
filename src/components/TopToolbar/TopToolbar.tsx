import React, { useRef, useState } from 'react';
import classes from './TopToolbar.module.css';
import { DropDownButtons } from '../../common/DropdownButtons/DropdownButtons';
import { Button } from '../../common/Button/Button';
import { artObjectList } from '../../data/ArtObjectList/ArtObjectList';
import { FilterBlock } from './FilterBlock/ui/FilterBlock';
import {
    CardDataType,
    FilterType,
    ImageType,
    ObjectType,
    TextType,
} from '../../types/types';
import { loadJson, saveJson } from './model/actionHandlers';

type SaveActionType = 'jpeg' | 'png' | 'json';
type LoadActionType = 'json';
const saveActions: SaveActionType[] = ['jpeg', 'png', 'json'];
const loadActions: LoadActionType[] = ['json'];

const createArtObject = (
    src: string,
    addObject: (object: ObjectType) => void
) => {
    addObject({
        id: Date.now().toString(),
        artSrc: src,
        isSelected: false,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    });
};

const createTextBlock = (addObject: (object: ObjectType) => void) => {
    const textObject: TextType = {
        id: Date.now().toString(),
        isSelected: false,
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        content: '',
        fontColor: 'black',
        fontSize: 20,
        fontFamily: 'Arial',
        decorations: [],
    };

    addObject(textObject);
};

const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    addObject: (object: ObjectType) => void
) => {
    const file = e.target.files?.[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64Data = event.target?.result as string;

        const image = new Image();
        image.src = base64Data;

        image.onload = () => {
            const width = image.width;
            const height = image.height;

            const imageObject: ImageType = {
                id: Date.now().toString(),
                imageSrc: base64Data,
                isSelected: false,
                x: 0,
                y: 0,
                width: width,
                height: height,
            };

            addObject(imageObject);
        };
    };
    reader.readAsDataURL(file);
};

interface ITopToolbar {
    cardData: CardDataType;
    setCardData: (cardData: CardDataType) => void;
    addObject: (object: ObjectType) => void;
    setFilter: (filter: FilterType) => void;
    filter: FilterType;
}

const TopToolbar = ({
    cardData,
    setCardData,
    addObject,
    setFilter,
    filter,
}: ITopToolbar) => {
    const [notificationData, setNotificationData] = useState<{
        message: string;
        isVisible: boolean;
    }>({
        message: '',
        isVisible: false,
    });
    const jsonInputRef = useRef<HTMLInputElement | null>(null);

    const showNotification = (message: string) => {
        setNotificationData({ message, isVisible: true });
        setTimeout(() => {
            setNotificationData({
                ...notificationData,
                isVisible: false,
            });
        }, 3000);
    };

    const loadCard = (cardData: CardDataType | null, errorMessage?: string) => {
        if (cardData) {
            setCardData(cardData);
        }
        if (errorMessage) {
            showNotification(errorMessage);
        } else {
            showNotification('Loaded successfully');
        }
    };

    const handleSaveAction = (value: SaveActionType) => {
        switch (value) {
            case 'json':
                saveJson(cardData, showNotification);
                break;
            default:
                break;
        }
    };

    const handleLoadAction = (value: LoadActionType) => {
        switch (value) {
            case 'json':
                if (jsonInputRef.current?.value) {
                    jsonInputRef.current.value = '';
                }
                jsonInputRef.current?.click();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div
                className={`${classes.appMessage} ${
                    notificationData.isVisible ? classes.appMessageShow : ''
                }`}
            >
                {notificationData.message}
            </div>
            <div className={classes.toolbarContainer}>
                <div className={classes.toolbarHeader}>
                    <DropDownButtons
                        parentButtonName={'Сохранить'}
                        childButtonNames={saveActions}
                        onSelect={handleSaveAction}
                    />
                    <DropDownButtons
                        parentButtonName={'Загрузить'}
                        childButtonNames={loadActions}
                        onSelect={handleLoadAction}
                    />
                    <input
                        className={classes.input}
                        type="file"
                        accept=".json"
                        ref={jsonInputRef}
                        onChange={(event) => loadJson(event, loadCard)}
                    />
                </div>
                <div className={classes.toolbarFooter}>
                    <div className={classes.inputContainer}>
                        <input
                            id={'import-image'}
                            type={'file'}
                            accept=".jpeg, .jpg, .png"
                            className={classes.input}
                            onChange={(e) => handleImageUpload(e, addObject)}
                        />
                        <label
                            className={classes.inputLabel}
                            htmlFor={'import-image'}
                        >
                            Загрузить изображение
                        </label>
                    </div>
                    <Button
                        content={'Добавить текст'}
                        onClick={() => createTextBlock(addObject)}
                    />
                    <div className={classes.importArtObjectContainer}>
                        <h3 className={classes.importArtObjectTitle}>
                            Арт Объекты
                        </h3>
                        <div className={classes.previewArtObjectsBlock}>
                            {artObjectList.map((src: string) => {
                                return (
                                    <div
                                        key={src}
                                        onClick={() => {
                                            createArtObject(src, addObject);
                                        }}
                                    >
                                        <img
                                            src={src}
                                            className={classes.previewArt}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <FilterBlock setFilter={setFilter} filter={filter} />
                </div>
            </div>
        </>
    );
};

export { TopToolbar };
