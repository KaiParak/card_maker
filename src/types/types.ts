type SizeType = {
    width: number;
    height: number;
};

type PositionType = {
    x: number;
    y: number;
};

type BoundingBoxType = SizeType & PositionType;

type BaseElementType = BoundingBoxType & {
    id: string;
    isSelected: boolean;
};

type ImageType = BaseElementType & {
    imageSrc: string;
};

type TextDecorationType = 'italic' | 'bold' | 'underline';

type TextType = BaseElementType & {
    content: string;
    decorations: TextDecorationType[];
    fontSize: number;
    fontFamily: string;
    fontColor: string;
};

type ArtType = BaseElementType & {
    artSrc: string;
};

type ObjectType = ImageType | TextType | ArtType;

type FilterType = {
    r: number;
    g: number;
    b: number;
    a: number;
};

type CanvasType = SizeType;

type CardDataType = {
    filter: FilterType;
    canvas: CanvasType;
    objects: ObjectType[];
};

const isArtType = (object: ObjectType): boolean => {
    return 'artSrc' in object;
};

const isImageType = (object: ObjectType): boolean => {
    return 'imageSrc' in object;
};

const isTextType = (object: ObjectType): boolean => {
    return (
        'content' in object &&
        'fontSize' in object &&
        'fontColor' in object &&
        'fontFamily' in object
    );
};

export type {
    ImageType,
    TextType,
    ArtType,
    ObjectType,
    FilterType,
    CanvasType,
    CardDataType,
};

export { isTextType, isArtType, isImageType };
