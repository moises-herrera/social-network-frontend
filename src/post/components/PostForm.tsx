import {
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import "./PostForm.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostSchema, PostSchemaType } from "../validations";
import { FormControlContainer } from "src/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useTypedSelector } from "src/store";
import { createPost } from "src/store/post";

export const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoadingPostForm } = useTypedSelector(({ post }) => post);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };

  const onSubmitForm: SubmitHandler<PostSchemaType> = (data) => {
    dispatch(createPost(data));
  };

  return (
    <div className="post-form-container">
      <Box className="flex justify-center mb-5">
        <Image
          src=""
          alt="Post image"
          fallbackSrc="src/assets/images/upload-image.png"
          borderRadius={20}
          onClick={onUploadImage}
          cursor="pointer"
          className="w-[400px]"
        />
        <Input
          className="hidden"
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          ref={profileImageInputRef}
        />
      </Box>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-3 pb-4"
      >
        <FormControlContainer fieldError={errors.topic}>
          <FormLabel textColor="secondary.300">Tema</FormLabel>
          <Input backgroundColor="white" {...register("topic")} />
        </FormControlContainer>

        <FormControlContainer fieldError={errors.title}>
          <FormLabel textColor="secondary.300">Título</FormLabel>
          <Input backgroundColor="white" {...register("title")} />
        </FormControlContainer>

        <FormControlContainer fieldError={errors.description}>
          <FormLabel textColor="secondary.300">Descripción</FormLabel>
          <Textarea
            backgroundColor="white"
            rows={6}
            resize="none"
            {...register("description")}
          />
        </FormControlContainer>

        <Button
          type="submit"
          marginX="auto"
          variant="form"
          isLoading={isLoadingPostForm}
        >
          Publicar
        </Button>
      </form>
    </div>
  );
};
