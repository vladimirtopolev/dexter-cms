import React, {ChangeEvent, useEffect, useState} from 'react';
import _ from 'lodash';
import {BuildAdminEditElementProps} from '../../helpers/buildAdminEditElement';
import {ImageDescription} from '../../../../../types';
import * as actions from '../../actions';
import 'react-image-crop/dist/ReactCrop.css';

import styles from './ImageValue.module.scss';
import Button from '../../../../../../components/common/Button';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import b64ImageToBlob from '../../../../../../utilities/b64ImageToBlob';
import InputFile from '../../../../../../components/common/InputFileButton';
import * as ReactCropModule from 'react-image-crop';
import {Crop} from 'react-image-crop';

interface ImageValueComponentProps extends BuildAdminEditElementProps {
    description: ImageDescription
}

export default ({description, state, path, changeState}: ImageValueComponentProps) => {

    const [isOpen, changeModalState] = useState(false);
    const toggleModal = () => changeModalState(!isOpen);

    const src = _.get(state, path, null);
    const saveImage = (imageUrl: any) => {
        changeState(path, imageUrl)
    };

    return (
        <div className={styles.ImageValue}>
            <div className={styles.ImageValue__title}>{description.title}</div>
            <div className={styles.ImageValue__content}>
                <div className={styles.Image}>
                    {src && (
                        <React.Fragment>
                            <img src={src} className={styles.Image__img}/>
                            <div className={styles.Image__toolbar}>
                                <div className={styles.Image__buttons}>
                                    <Button onClick={() => toggleModal()}
                                            className={styles.Image__btn}>Изменить</Button>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                    {!src && (
                        <div className={styles.Image__imgPlaceholder}>
                            <Button onClick={() => toggleModal()}>
                                Загрузить
                            </Button>
                        </div>)}
                </div>
            </div>
            <ModalImageChanger isOpen={isOpen}
                               toggle={toggleModal}
                               src={src}
                               saveImage={saveImage}/>
        </div>
    );
}

type ModalImageChangerProps = {
    isOpen: boolean,
    toggle: () => void,
    src: string,
    saveImage: (image: any) => void
};

function ModalImageChanger({isOpen, toggle, saveImage}: ModalImageChangerProps) {
    const [imagePreview, changeImagePreview] = useState<any>(null);
    const [isUploadingImage, changeUploadingImageStatus] = useState<boolean>(false);

    const saveImageInCloudinary = (imageFile: any) => {
        changeUploadingImageStatus(true);
        const formData = new FormData();
        formData.append('0', imageFile);

        actions.uploadImage(formData)
            .then(res => {
                saveImage(res.data[0].url);
                changeUploadingImageStatus(false);
                toggle();
                changeImagePreview(null);
            })
            .catch(e => {
                changeUploadingImageStatus(false);
            });
    };

    const changePreview = (fileList: FileList) => {
        const reader = new FileReader();
        reader.onload = () => {
            return changeImagePreview(reader.result);
        };
        reader.readAsDataURL(fileList[0]);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={styles.Modal}>
            <ModalHeader>Редактировать изображение</ModalHeader>
            <ModalBody>
                <div>
                    {!imagePreview && (
                        <div className={styles.Modal__imagePreview}>
                            <div className={styles.Modal__imagePreviewToolbar}>
                                <InputFile onChange={changePreview}>Загрузка</InputFile>
                            </div>
                        </div>
                    )}
                    {imagePreview && <SimpleImageUploader src={imagePreview}
                                                          isUploadingImage={isUploadingImage}
                                                          saveImageInCloudinary={saveImageInCloudinary}/>}
                </div>
            </ModalBody>
        </Modal>)
}


type ImageUploaderProps = {
    src: string,
    isUploadingImage: boolean,
    saveImageInCloudinary: (imageFile: any) => void,
}

function SimpleImageUploader({src, saveImageInCloudinary, isUploadingImage}: ImageUploaderProps) {
    const onSaveImage = () => {
        b64ImageToBlob(src)
            .then(blob => saveImageInCloudinary(blob));
    };
    return (
        <div className={styles.SimpleImageUploader}>
            <div className={styles.SimpleImageUploader__imageContainer}>
                <img src={src} alt="Preview" className={styles.SimpleImageUploader__image}/>
            </div>
            <div>
                <Button onClick={onSaveImage} disabled={isUploadingImage}>Сохранить</Button>
            </div>
        </div>
    )
}
interface CropImageUploader extends ImageUploaderProps{
    changeUploadingImageStatus: (status: boolean) => void
}

function CropImageUploader({changeUploadingImageStatus, src, saveImageInCloudinary, isUploadingImage}: CropImageUploader) {
    const [crop, changeCrop] = useState<Crop>({
        aspect: 1,
        width: 50,
        x: 0,
        y: 0
    });
    const [pixelCrop, changePixelCrop] = useState<any>(null);

    useEffect(() =>
        changeCrop({...crop, aspect: 1}), [1]);

    const onSaveImage = () => {
        changeUploadingImageStatus(true);
        const canvas = document.createElement('canvas');

        const image = document.createElement('img');
        image.src = src;

        const {height, width} = image;
        canvas.width = pixelCrop.width * width / 100;
        canvas.height = pixelCrop.height * height / 100;

        const ctx = canvas.getContext('2d');
        ctx && ctx.drawImage(
            image,
            pixelCrop.x * width / 100,
            pixelCrop.y * height / 100,
            pixelCrop.width * width / 100,
            pixelCrop.height * height / 100,
            0,
            0,
            pixelCrop.width * width / 100,
            pixelCrop.height * height / 100
        );

        canvas.toBlob((blob: any) => {
            blob.name = 'crop.img';
            blob.lastModifiedDate = new Date();
            saveImageInCloudinary(blob);
        }, 'image/jpeg');
    };

    const onCropChange = (newCrop: Crop) => {
        changeCrop({...crop, ...newCrop});
    };

    const onCropComplete = (newCrop: Crop, pixelCrops?: any) => {
        changePixelCrop(pixelCrops);
    };

    const ReactCrop = (ReactCropModule as any).default;
    return (
        <React.Fragment>
            {src && (

                    <ReactCrop
                        src={src}
                        crop={crop}
                        onChange={onCropChange}
                        onComplete={onCropComplete}
                        keepSelection={true}
                        imageStyle={{width: '100%', maxHeight: 'none'}}
                        className={styles.ImageModal__previewContainer}
                    />


            )}
            <div className={styles.ImageModal__buttons}>
                <Button onClick={onSaveImage} disabled={isUploadingImage}>Сохранить</Button>
            </div>
        </React.Fragment>
    );

}





