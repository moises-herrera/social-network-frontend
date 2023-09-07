import {
  Sidebar,
  ButtonComponent,
  UserCard,
  FollowButton,
} from "src/shared/components";
import { datademo } from "src/mocks";

interface Props {
  onOpen: () => void;
}

export const RightSidebarNoLogin = ({ onOpen }: Props) => {
  return (
    <Sidebar align="right">
      <div className="w-full text-[#E0E0E0] border-b-2 border-[#E0E0E0] mt-3 2xl:mt-20 mb-3 2xl:mb-10">
        <div className="font-extrabold text-[30px] text-center">
          <h2>¿Eres nuevo?</h2>
        </div>
        <div className="font-medium text-[12px] text-center mt-2">
          <p>
            Registrate ahora y obten la capacidad de crear tus propios post e
            interactua con los demas.
          </p>
        </div>
        <div className="mt-5 2xl:mt-10">
          <ButtonComponent title="Iniciar sesión" onClick={onOpen} />
          <ButtonComponent title="Crear cuenta" onClick={onOpen} />
        </div>
        <div className="text-[#FF5050] font-medium text-[14px] 2xl:text-[16px] text-center mb-5">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
      <div className=" text-[#E0E0E0] bg-center">
        <h2 className="font-bold text-[30px] mb-2">Tal vez te interese</h2>
        <div className="min-w-full  comments-list lg:h-[310px] font-medium text-[14px] text-[#2F2F2F]">
          {datademo
            .filter((obj) => obj.follow == "Seguir")
            .slice(0, 5)
            .map((item, index) => (
              <div key={index}>
                <UserCard user={item.user} img={item.img}>
                  <FollowButton title={item.follow} />
                </UserCard>
              </div>
            ))}
        </div>
        <div className="mt-3 2xl:mt-28">
          <p>
            Condiciones de ServicioPolítica de Privacidad Política de cookies ©
            2023 IUE Corp.
          </p>
        </div>
      </div>
    </Sidebar>
  );
};