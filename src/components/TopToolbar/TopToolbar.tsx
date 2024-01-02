import React, { useRef, useState } from 'react';
import classes from './TopToolbar.module.css';
import { DropDownButtons } from '../../common/DropdownButtons/DropdownButtons';
import { Button } from '../../common/Button/Button';
import { artObjectList } from '../../data/ArtObjectList/ArtObjectList';
import { FilterBlock } from './FilterBlock/ui/FilterBlock';
import { CardDataType } from '../../types/types';
import { loadJson, saveJson } from './model/actionHandlers';

type SaveActionType = 'jpeg' | 'png' | 'json';
type LoadActionType = 'json';
const saveActions: SaveActionType[] = ['jpeg', 'png', 'json'];
const loadActions: LoadActionType[] = ['json'];

interface ITopToolbar {
    cardData: CardDataType;
    setCardData: (cardData: CardDataType) => void;
}

const TopToolbar = ({ cardData, setCardData }: ITopToolbar) => {
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
                            className={classes.input}
                        />
                        <label className={classes.inputLabel}>
                            Загрузить изображение
                        </label>
                    </div>
                    <Button content={'Добавить текст'} onClick={() => {}} />
                    <div className={classes.importArtObjectContainer}>
                        <h3 className={classes.importArtObjectTitle}>
                            Арт Объекты
                        </h3>
                        <div className={classes.previewArtObjectsBlock}>
                            {artObjectList.map((src: string) => {
                                return (
                                    <div key={src} onClick={() => {}}>
                                        <img
                                            src={src}
                                            className={classes.previewArt}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <FilterBlock />
                </div>
            </div>
        </>
    );
};

export { TopToolbar };
