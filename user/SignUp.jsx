import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import schema from "./TextFieldAndJoi";
import clientStructure from "./ClientStructure";

export default function SignUp({ theme }) {
  const navigate = useNavigate();
  const { setLoader } = useContext(GeneralContext);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    business: false,
  });
  const [errors, setErrors] = useState({});
  const [, setIsFormValid] = useState(false);

  const handelChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);

    const validate = schema.validate(obj, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[name];

    if (validate.error) {
      const item = validate.error.details.find((e) => e.context.key === name);

      if (item) {
        tempErrors[name] = item.message;
      }
    }
    setIsFormValid(!validate.error);
    setErrors(tempErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const obj = {};
    const elements = ev.target.elements;

    clientStructure.forEach((s) => {
      if (s.type === "boolean") {
        obj[s.name] = elements[s.name].checked;
      } else {
        obj[s.name] = elements[s.name].value;
      }
    });

    setLoader(true);

    fetch(
      `https://api.shipap.co.il/clients/SignUp?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then(() => navigate("/login"))
      .catch((err) => alert(err.message))
      .finally(() => setLoader(false));
  };

  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                SignUp
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  {clientStructure.map((s) => (
                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                      {s.type === "boolean" ? (
                        <FormControlLabel
                          control={<Switch color="primary" name={s.name} />}
                          label={s.label}
                          labelPlacement="start"
                        />
                      ) : (
                        <TextField
                          error={!!errors[s.name]}
                          helperText={errors[s.name]}
                          margin="normal"
                          required={s.required}
                          fullWidth
                          id={s.name}
                          label={s.label}
                          name={s.name}
                          type={s.type}
                          autoComplete={s.name}
                          onChange={handelChange}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  SignUp
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/login"
                  >
                    Already have an account? Login
                  </Link>
                </Button>
              </Box>
            </Box>
          </Container>
          <br /> <br /> <br /> <br />
        </ThemeProvider>
      }
    </>
  );
}
