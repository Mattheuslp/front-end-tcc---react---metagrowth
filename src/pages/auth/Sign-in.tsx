import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useForm } from 'react-hook-form'
import { Button } from "../../components/ui/button";
import logo from "../../assets/login/logo.png"
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
        navigate('/')
      }
      toast.success('Bem vindo de volta :)')
    } catch (error) {
      toast.error('Erro de login, por favor tente novamente')
    } finally {
      reset()
    }

  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex items-center bg-primary-yellowNeon absolute top-0 w-full h-20 gap-2">
        <img src={logo} alt="" className="object-contain max-w-full max-h-10" />
        <h1 className="font-extrabold ">Metagrowth</h1>
      </div>
      <div className="flex items-center bg-black absolute bottom-0 w-full h-4 gap-2">
      </div>


      <div className="c-descriptionLogin animate-fadeIn  ">
        <h1 className="pt-20 font-extrabold ">Seu espaço para realizar mais.</h1>
        <p>Acompanhe suas metas, organize suas tarefas e veja o progresso em tempo real. Tudo no mesmo lugar, de forma simples.</p>
        <div className="flex ">
        </div>
      </div>

      <div className="flex flex-col items-center gap-24 w-[30rem]  h-[40rem] border rounded-xl shadow-lg bg-black text-white">
        <div className="mt-20 flex flex-col justify-center items-center gap-3">
          <h1 className="font-extrabold bg-prima">Bem vindo de volta</h1>
          <p className="text-[#c9cacc]">Faça login no Metagrowth</p>
        </div>
        <div className="w-2/3">
          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-5">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
            <Button className="w-full c-yellowNeonBtn text-black" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </form>
        </div>
      </div>


    </div>
  )
}
