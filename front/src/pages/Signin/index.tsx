import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Typography,
  Link,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ApiBack from "../../services/base-back.js";
import ControlledText from "../../shared/Fields/TextField.js";
import { useToast } from "../../context/ToastContext.js";
import { AxiosError } from "axios";
import LoadingButton from "../../shared/Buttons/LoadingButton.js";

type FormData = {
  email: string;
  password: string;
};

function SignIn() {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const { showToast } = useToast();

  async function handleLogin(formData: FormData) {
    try {
      const response = await ApiBack.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response?.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response?.data?.user?.id,
            name: response?.data?.user?.name,
            email: response?.data?.user?.email,
            token: response?.data?.token,
          })
        );
        showToast("success", "Login realizado com sucesso!");
      }
    } catch (err) {
      if ((err as AxiosError)?.response?.status == 400) {
        showToast("error", "E-mail ou senha inválidos, Tente novamente!");
      } else {
        showToast("error", "Ocorreu um erro ao realizar o login!");
      }
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px #ccc",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          fontWeight={600}
          color={"#FFC03D"}
        >
          Login
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{
              mt: 8,
              width: "100%",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            gap={4}
          >
            <ControlledText
              name="email"
              control={control}
              defaultValue=""
              label="E-mail"
              fullWidth
              size="medium"
            />
            <ControlledText
              name="password"
              control={control}
              defaultValue=""
              label="Senha"
              fullWidth
              type="password"
              size="medium"
            />
            <FormControlLabel control={<Checkbox />} label="Lembrar-me" />
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{
                mb: 2,
                backgroundColor: "#FFC03D",
                color: "black",
              }}
              fullWidth
            >
              Acessar
            </LoadingButton>
            <Link
              href="/signup"
              variant="body2"
              sx={{
                color: "black",
              }}
            >
              {"Não tem conta? Cadastre-se"}
            </Link>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
}

export default SignIn;
