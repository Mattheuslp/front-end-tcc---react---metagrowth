import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useForm } from 'react-hook-form'
import { Button } from "../../components/ui/button";
import titleLogo from "../../assets/login/titleLogo.png"
import { useSignIn } from "../../lib/react-query/querysAndMuations";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




const signInFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type SignInFormValidationSchema = z.infer<typeof signInFormValidationSchema>

export function Signin() {
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<SignInFormValidationSchema>()
  const { mutateAsync: signIn } = useSignIn();
  const { loadUser, isAuthenticated } = useUserContext();
  const navigate = useNavigate()

  async function handleSignIn({ email, password }: SignInFormValidationSchema) {
    try {
      const { data } = await signIn({ email, password })
      localStorage.setItem('token', data.token);

      loadUser()

      if (isAuthenticated) {
        navigate('/metas')
      }
      toast.success('Bem vindo de volta :)')
    } catch (error) {
      toast.error('Erro de login, por favor tente novamente')
    } finally {
      reset()
    }

  }
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen bg-gray-black">

      <img src={titleLogo} alt="titleLogin" />

      <div className="flex flex-col items-center gap-24 w-[50rem]  h-[40rem] border rounded-xl shadow-lg bg-primary-darkGray px-20">

        <div className="w-full flex flex-col items-center gap-10">
          <h1 className="font-extrabold text-3xl pt-10">Faça login na sua conta</h1>
          <div className="bg-primary-yellowNeon h-1 w-full"></div>
        </div>

        <div className="w-2/3">
          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col items-center gap-2 ">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />

            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} />

            <Button className="w-full c-yellowNeonBtn text-black mt-10" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </form>
        </div>
      </div>


    </div>
  )
}
