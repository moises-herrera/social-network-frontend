import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalData } from "src/interfaces";
import {
  ModalContainForm,
  FormControlContainer,
  NavLink,
} from "src/shared/components";
import { LoginSchema, LoginSchemaType } from "src/auth/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTypedSelector } from "src/store";
import { useMessageToast } from "src/hooks";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { clearErrorMessage, loginUser } from "src/store/auth";

export const LoginForm = ({ isOpen, onClose }: ModalData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage } = useTypedSelector(({ auth }) => auth);
  const { displayError } = useMessageToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      displayError(errorMessage);
      clearError();
    }
  }, [errorMessage, displayError, clearError]);

  const onSubmitForm: SubmitHandler<LoginSchemaType> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Iniciar sesión"}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth-form">
        <FormControlContainer fieldError={errors.email}>
          <Input placeholder="Correo" type="email" {...register("email")} />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.password}>
          <Input
            placeholder="Contraseña"
            type="password"
            {...register("password")}
          />
        </FormControlContainer>
        <Button type="submit" variant="form">
          Iniciar sesión
        </Button>
        <div className="auth-link">
          <NavLink
            path="/auth/forgot-password"
            label="¿Olvidaste tu contraseña?"
            className="!w-full"
          />
        </div>

        <div className="auth-link">
          <hr />

          <p className="w-full mt-2">
            ¿No tienes una cuenta?
            <NavLink
              path="/auth/register"
              label="Regístrate"
              className="!w-full justify-center"
            />
          </p>
        </div>
      </form>
    </ModalContainForm>
  );
};
