import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '../../components/form/Input';
import { LoginProps } from '../../consts/login';
import { postLogin } from '../../api/auth';
import { useState } from 'react';
import { useAlert } from '../../hooks/useAlert';
import { ALERT_TYPE } from '../../consts/alert';
import { useSignIn } from 'react-auth-kit';
import { User } from '../../consts/user';
import { PrimaryButton } from '../../components/form/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const alert = useAlert()
    const signIn = useSignIn()


    const onSubmit: SubmitHandler<LoginProps> = async (data) => {
        setIsLoading(true)
        const loginData = await postLogin(data)
            .catch((error) => {
                alert.addAlert({
                    type: ALERT_TYPE.ERROR,
                    title: "Autentikasi gagal",
                    message: error.message
                })
                return
            })
            .finally(() => setIsLoading(false)) as User
        signIn({
            authState: loginData,
            token: loginData.token,
            tokenType: "Bearer",
            expiresIn: 60
        })
    };

    return <>
        <div className="min-w-screen min-h-screen flex items-center justify-center bg-login">
            <div className="bg-white floating-shadow-md p-10 lg:w-[450px] md:w-1/2 w-11/12">
                <h1 className="font-bold text-primary text-3xl text-center">PORTAL SATGAS</h1>
                <form
                    action=""
                    className="flex flex-col gap-2 mt-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputText
                        errors={errors}
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                        isRequired
                        register={register}
                    />
                    <InputText
                        errors={errors}
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        obscure
                        isRequired
                        register={register}
                    />
                    <PrimaryButton className="mt-5 py-4" isLoading={isLoading} isSubmit isDisabled={isLoading}>
                        Sign In
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </>
}

export default Login