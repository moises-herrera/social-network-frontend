import {
  Box,
  Image,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTypedSelector } from "src/store";
import { SettingSchema, SettingSchemaType } from "src/settings/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormControlContainer } from "src/shared/components";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { clearSuccessMessage, updateUser } from "src/store/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useMessageToast } from "src/hooks";
import { FileStored, UserWithAvatarFile } from "src/interfaces";

export default function SettingForm() {
  const { user, successMessage, isLoading } = useTypedSelector(
    ({ auth }) => auth
  );
  const [isVisible, setIsVisible] = useState(false);
  const onChangeVisible = () => {
    setIsVisible(!isVisible);
  };

  const { displaySuccessMessage, displayError } = useMessageToast();
  const avatar = user?.avatar
    ? ({
        url: user.avatar,
        type: "image/jpeg",
      } as FileStored)
    : null;
  const [userAvatar, setUserAvatar] = useState<FileStored | null>(avatar);

  const dispatch = useDispatch<AppDispatch>();

  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };

  const formDefaultValues = {
    ...user,
    password: "",
  };
  const onCancelChanges = () => {
    reset(formDefaultValues);
    setUserAvatar({
      url: user?.avatar || null,
      type: "image/jpeg",
    } as FileStored);
  };

  const onUploadAvatar = (files: FileList | null) => {
    const avatarFile = files?.[0];

    if (avatarFile) {
      setUserAvatar(
        Object.assign(avatarFile, { url: URL.createObjectURL(avatarFile) })
      );
    }
  };

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SettingSchemaType>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(SettingSchema),
  });

  const onSubmitForm: SubmitHandler<SettingSchemaType> = (data) => {
    const userData: UserWithAvatarFile = {
      ...data,
      avatarFile: userAvatar,
    };
    dispatch(
      updateUser({
        id: user?._id as string,
        userData: userData,
      })
    )
      .unwrap()
      .catch((error) => {
        displayError(error.message);
      });
  };

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      displaySuccessMessage(successMessage);
      clearSuccess();
    }
  }, [displaySuccessMessage, successMessage, clearSuccess]);

  useEffect(() => {
    document.title = "Configuración";
  }, []);

  return (
    <section className="flex flex-col justify-center w-full min-h-screen py-5 bg-secondary-200 text-primary-500">
      <Box className="flex justify-center mb-5">
        <Image
          content="center"
          objectFit="cover"
          borderRadius="full"
          alt="avatar"
          cursor="pointer"
          onClick={onUploadImage}
          boxSize="200px"
          src={userAvatar?.url || avatarPlaceholder}
        />
        <Input
          onChange={({ target: { files } }) => onUploadAvatar(files)}
          className="hidden"
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          ref={profileImageInputRef}
        />
      </Box>

      <div className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col w-full gap-10 px-5 md:px-12 lg:w-1/2 lg:px-0"
        >
          <FormControlContainer fieldError={errors.firstName}>
            <Input
              type="text"
              placeholder="Nombre"
              variant="settings"
              {...register("firstName")}
            />
          </FormControlContainer>
          <FormControlContainer fieldError={errors.lastName}>
            <Input
              type="text"
              placeholder="Apellido"
              variant="settings"
              {...register("lastName")}
            />
          </FormControlContainer>
          <FormControlContainer fieldError={errors.username}>
            <Input
              type="text"
              placeholder="Usuario"
              variant="settings"
              {...register("username")}
            />
          </FormControlContainer>
          <FormControlContainer fieldError={errors.email}>
            <Input
              type="text"
              placeholder="Correo"
              variant="settings"
              {...register("email")}
            />
          </FormControlContainer>
          <FormControlContainer fieldError={errors.password}>
            <InputGroup>
              <Input
                autoComplete="off"
                type={isVisible ? "text" : "password"}
                placeholder="Contraseña"
                variant="settings"
                {...register("password")}
              />
              <InputRightElement>
                <button onClick={onChangeVisible} type="button">
                  {!isVisible ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </InputRightElement>
            </InputGroup>
          </FormControlContainer>

          <div className="flex justify-center space-x-2 md:space-x-8">
            <Button type="button" variant="form" onClick={onCancelChanges}>
              Cancelar
            </Button>

            <Button type="submit" variant="form" isLoading={isLoading}>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
