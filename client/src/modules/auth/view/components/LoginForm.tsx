import { Box, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import { AuthState } from "../../controllers/types";
import { useRouter } from "next/navigation";
import CustomTextField from "@/core/shared/components/CustomTextField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import authModel from "../../models/auth-model";
import { AuthInterface } from "../../interfaces/auth-interface";
import { login } from "../../controllers/thunks/auth-thunk";
import { useRef } from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formSubmit = useRef<any>();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          position: "absolute",
          left: "50%",
          top: "4rem",
          transform: "translate(-50%, -40%)",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "2rem",
            color: "primary.dark",
          }}
        >
          Radi
        </Typography>
        <Typography
          sx={{ fontWeight: "600", fontSize: "1.5rem", color: "primary.main" }}
        >
          PeerReview
        </Typography>
      </Box>
      <Box
        sx={{
          width: "25rem",
          height: "30rem",
          backgroundColor: "white",
          filter: "drop-shadow(0 0 3px #00000080)",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -40%)",
          borderRadius: "15px",
        }}
      >
        <Box sx={{ padding: "2rem 2rem" }}>
          <Typography
            sx={{
              minWidth: "100%",
              fontSize: "2rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          <Box
            sx={{
              padding: "3rem 0",
            }}
          >
            <Formik
              initialValues={authModel.defaultValues}
              validationSchema={authModel.validationSchema}
              onSubmit={(values: AuthInterface) => {
                console.log(values);
                dispatch(login(values)).then(
                  (res: any) => {
                    // if fullfilled then redirect to dashboard
                    if (res.meta.requestStatus === "fulfilled") {
                      router.push("/dashboard");
                    }
                  },
                  (err: any) => {
                    alert(err.message);
                  }
                );
              }}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <CustomTextField
                    isRequired
                    name="username"
                    label="Usersame"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username}
                    touched={touched.username}
                    width="100%"
                    props={{
                      type: "text",
                    }}
                  />
                  <CustomTextField
                    isRequired
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    width="100%"
                    props={{
                      type: "password",
                    }}
                  />
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={formSubmit}
                  >
                    done
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
          <Box
            sx={{
              padding: "1rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PrimaryButton
              title="Login"
              onClick={() => {
                formSubmit.current.click();
              }}
              sx={{ width: "70%" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
