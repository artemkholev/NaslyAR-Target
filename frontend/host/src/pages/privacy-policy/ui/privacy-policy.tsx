import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  lineHeight: 1.6,
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

const Subsection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SubsectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
}));

const PolicyItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: "flex",
  "&::before": {
    content: '"•"',
    marginRight: theme.spacing(1),
  },
}));

const PrivacyPolicyPage = () => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 0, minHeight: "100vh" }}>
      <StyledContainer maxWidth='md'>
        <Typography variant='h3' component='h1' gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Политика конфиденциальности
        </Typography>

        <Section>
          <Typography variant='body1' paragraph>
            Настоящая политика обработки персональных данных составлена в соответствии с
            требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и
            определяет порядок обработки персональных данных и меры по обеспечению безопасности
            персональных данных, предпринимаемые avitoprofi.ru (далее — Оператор).
          </Typography>
        </Section>

        <Section>
          <SectionTitle variant='h5'>1. Основные понятия</SectionTitle>
          <Subsection>
            <SubsectionTitle variant='h6'>
              1.1. Автоматизированная обработка персональных данных
            </SubsectionTitle>
            <Typography variant='body1'>
              Обработка персональных данных с помощью средств вычислительной техники.
            </Typography>
          </Subsection>

          <Subsection>
            <SubsectionTitle variant='h6'>1.2. Веб-сайт</SubsectionTitle>
            <Typography variant='body1'>
              Совокупность графических и информационных материалов, а также программ для ЭВМ и баз
              данных, обеспечивающих их доступность в сети интернет по сетевому адресу
              avitoprofi.ru.
            </Typography>
          </Subsection>
        </Section>

        <Section>
          <SectionTitle variant='h5'>2. Основные права и обязанности Оператора</SectionTitle>
          <Subsection>
            <SubsectionTitle variant='h6'>2.1. Оператор имеет право:</SubsectionTitle>
            <PolicyItem>
              Получать от субъекта персональных данных достоверную информацию и/или документы
            </PolicyItem>
            <PolicyItem>
              В случае отзыва согласия на обработку персональных данных продолжить обработку при
              наличии законных оснований
            </PolicyItem>
          </Subsection>

          <Subsection>
            <SubsectionTitle variant='h6'>2.2. Оператор обязан:</SubsectionTitle>
            <PolicyItem>
              Предоставлять субъекту персональных данных по его просьбе информацию об обработке
            </PolicyItem>
            <PolicyItem>Обеспечивать безопасность персональных данных</PolicyItem>
            <PolicyItem>
              Прекратить обработку и уничтожить персональные данные при достижении целей обработки
            </PolicyItem>
          </Subsection>
        </Section>

        <Section>
          <SectionTitle variant='h5'>3. Цели обработки персональных данных</SectionTitle>
          <Typography variant='body1' paragraph>
            Цель обработки персональных данных — предоставление доступа Пользователю к сервисам,
            информации и/или материалам, содержащимся на веб-сайте.
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mb: 2 }}>
            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Персональные данные:
              </Typography>
              <Typography>Электронный адрес</Typography>
              <Typography>Номера телефонов</Typography>
            </Box>
            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Правовые основания:
              </Typography>
              <Typography>Федеральный закон «Об информации» от 27.07.2006 N 149-ФЗ</Typography>
            </Box>
          </Box>
        </Section>

        <Section>
          <SectionTitle variant='h5'>4. Условия обработки персональных данных</SectionTitle>
          <PolicyItem>Обработка осуществляется с согласия субъекта персональных данных</PolicyItem>
          <PolicyItem>Обработка необходима для исполнения договора с субъектом</PolicyItem>
          <PolicyItem>
            Обработка осуществляется для осуществления прав и законных интересов оператора
          </PolicyItem>
        </Section>

        <Section>
          <SectionTitle variant='h5'>5. Контактная информация</SectionTitle>
          <Typography variant='body1' paragraph>
            Пользователь может получить любые разъяснения по вопросам обработки персональных данных,
            обратившись к Оператору по электронной почте:
          </Typography>
          <Typography variant='h6' color='primary'>
            info@webfront.ru
          </Typography>
          <Typography variant='body1' sx={{ mt: 2 }}>
            Актуальная версия Политики доступна по адресу: avitoprofi.ru/politic/
          </Typography>
        </Section>

        <Divider sx={{ my: 4 }} />

        <Typography variant='body2' color='text.secondary'>
          Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
        </Typography>
      </StyledContainer>
    </Paper>
  );
};

export default PrivacyPolicyPage;
