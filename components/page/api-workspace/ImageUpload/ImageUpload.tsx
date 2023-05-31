import { DeleteOutlined } from "@ant-design/icons";
import { Empty, notification, Spin } from "antd";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  RefObject,
  useMemo,
} from "react";
import { Button } from "../../../Button";
import cx from "classnames";

interface Props {
  fileInputRef: RefObject<HTMLInputElement>;
  setBanners: Dispatch<SetStateAction<File[]>>;
  disabled?: boolean;
  isUploading?: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const ImageUpload = (props: Props) => {
  const {
    fileInputRef,
    setBanners,
    disabled = false,
    isUploading = false,
    setIsUploading,
    className,
  } = props;
  const [images, setImages] = useState<File[]>([]);

  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

  useEffect(() => {
    setBanners([...images]);
  }, [images, setBanners]);

  // upload previews
  useEffect(() => {
    if ((images || []).length) {
      const newPreviews: string[] = [];

      images.forEach((image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          setUploadPreviews(newPreviews);
        };

        reader.onerror = () => {
          notification.error({ message: "Could not upload image" });
        };
      });
    } else {
      setUploadPreviews([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // the recently added banner is displayed on the left
  const reversedUploadPreviews = useMemo(
    () => [...uploadPreviews].reverse(),
    [uploadPreviews]
  );

  const handleDeleteUploadBanner = (indexToDelete: number) => {
    // the formula below is applied because the displayed previews order is reversed
    const reversedIndexToDelete = uploadPreviews.length - 1 - indexToDelete;

    const newImages: File[] = [];

    images.forEach((image, index) => {
      if (index !== reversedIndexToDelete) {
        newImages.push(image);
      }
    });

    setImages(newImages);
  };

  const onImagesSubmit = async (files: File[]) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      files.forEach((image) => {
        formData.append(
          "files",
          image,
          `${image.name}-${image.lastModified}.png`
        );
      });

      setImages([...(images || []), ...files]);
    } catch (error: any) {
      notification.error({ message: error?.message || "Could not upload" });
      setIsUploading(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {isUploading ? (
        <div className="h-[250px] w-full flex justify-center items-center absolute z-10 bg-slate-100">
          <Spin size="large" />
        </div>
      ) : null}

      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/*"
        onChange={(event) => {
          const files = Array.from(event?.target?.files || []);
          if (files.length) {
            onImagesSubmit(files);
          } else {
            notification.error({ message: "Could not upload images" });
          }
        }}
        multiple
      />
      {uploadPreviews.length ? (
        <div className={cx("w-full overflow-auto", className)}>
          <div className="flex gap-2 h-max w-max">
            {reversedUploadPreviews.map((item: string, index: number) => (
              <div
                key={`upload-banner-${index + 1}`}
                className="w-[300px] h-max relative"
              >
                <img
                  src={item}
                  srcSet={item}
                  alt={item}
                  loading="lazy"
                  className="w-[300px] h-[250px] object-cover"
                />
                <div className="bg-black/20 absolute bottom-0 w-full">
                  <Button
                    borderRadius="none"
                    className="!text-white !bg-rose-500 flex items-center justify-center !py-2"
                    label={<DeleteOutlined />}
                    onClick={() => handleDeleteUploadBanner(index)}
                    disabled={isUploading || disabled}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={cx(
            "h-[250px] w-full overflow-auto flex justify-center items-center",
            className
          )}
        >
          <Empty
            description={
              <div className="flex flex-col gap-2 items-center">
                <div>No images uploaded</div>

                <Button
                  disabled={isUploading}
                  onClick={(event) => {
                    event.preventDefault();
                    if (fileInputRef?.current) {
                      // clear the current value of the file input since we use
                      // the onChange to trigger upload inside the ImageUpload
                      if (fileInputRef?.current?.value) {
                        fileInputRef.current.value = "";
                      }
                      fileInputRef?.current?.click();
                    }
                  }}
                  label="Upload image"
                />
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};
