import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography, Link, Grid } from "@mui/material";
import ApiBack from "../../services/base-back.js";
import ControlledText from "../../shared/Fields/TextField.js";
import { useToast } from "../../context/ToastContext.js";
import { AxiosError } from "axios";
import LoadingButton from "../../shared/Buttons/LoadingButton.js";

function SignIn() {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const { showToast } = useToast();

  async function handleLogin(formData: unknown) {
    try {
      const response = await ApiBack.post("/user/session", formData);

      if (response?.data.success) {
        const address = response.data.user.address[0];
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response?.data?.user?.id,
            name: response?.data?.user?.name,
            email: response?.data?.user?.email,
            birthDate: response?.data?.user?.birthDate,
            phone: response?.data?.user?.phone,
            cpf: response?.data?.user?.cpf,
            address: address,
            token: response?.data?.token,
          })
        );
        showToast("success", "Login realizado com sucesso!", "/home");
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
    <>
      <Grid
        container
        spacing={2}
        margin={0}
        justifyContent="center"
        alignItems="center"
        padding={0}
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url(/image3.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Bem-vindo!
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Faça seu login para começar!
          </Typography>
          <Typography fontWeight={600}>
            Descubra novas funcionalidades e acompanhe seu o rastreamento do seu
            veiculo em <b>Tempo Real</b>!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            width: "100vw",
            height: "100%",
            border: "1px solid #ccc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Typography component="h1" variant="h2" fontWeight={400}>
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
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Acessar
              </LoadingButton>
              <Link href="/signup" variant="body2">
                {"Não tem conta? Cadastre-se"}
              </Link>
            </Box>
          </FormProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default SignIn;
