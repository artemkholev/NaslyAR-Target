import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    fullName: false,
    phone: false,
    email: false,
    serviceType: false,
    agree: false,
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      agree: e.target.checked,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: formData.fullName.trim() === "",
      phone: !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(formData.phone),
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      serviceType: formData.serviceType === "",
      agree: !formData.agree,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Здесь обычно отправка данных на сервер
      console.log("Форма отправлена:", formData);
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        serviceType: "",
        message: "",
        agree: false,
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          Оставить заявку
        </Typography>

        {submitSuccess && (
          <Alert severity='success' sx={{ mb: 3 }}>
            Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </Alert>
        )}

        <Box component='form' onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='ФИО'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                helperText={errors.fullName ? "Поле обязательно для заполнения" : ""}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Телефон'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText={errors.phone ? "Введите корректный номер телефона" : ""}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? "Введите корректный email" : ""}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={errors.serviceType}>
                <InputLabel>Тип услуги</InputLabel>
                <Select
                  value={formData.serviceType}
                  label='Тип услуги'
                  onChange={handleSelectChange}>
                  <MenuItem value='consultation'>Консультация</MenuItem>
                  <MenuItem value='repair'>Ремонт</MenuItem>
                  <MenuItem value='maintenance'>Обслуживание</MenuItem>
                  <MenuItem value='other'>Другое</MenuItem>
                </Select>
                {errors.serviceType && (
                  <Typography variant='caption' color='error'>
                    Поле обязательно для выбора
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Сообщение'
                name='message'
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agree}
                    onChange={handleCheckboxChange}
                    color='primary'
                  />
                }
                label='Я согласен на обработку персональных данных'
                sx={{ color: errors.agree ? "error.main" : "inherit" }}
              />
              {errors.agree && (
                <Typography variant='caption' color='error' display='block'>
                  Необходимо ваше согласие
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' fullWidth sx={{ py: 1.5 }}>
                Отправить заявку
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplicationPage;
