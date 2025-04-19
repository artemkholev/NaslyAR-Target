import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/entities/user";
import { AppRoutes } from "@/app/router";
import { Input } from "@/shared/ui/input";
import baseApi from "@/shared/api/requests";

export const Connection = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "Запрос на рекламу",
    niche: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState(""); // Добавляем состояние для хранения ID заявки

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.niche.trim()) {
      errors.niche = "Пожалуйста, введите нишу, в которой вы хотите приобрести рекламу";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Пожалуйста, введите номер телефона";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate(AppRoutes.AUTH_LOGIN);
      return;
    }

    if (!validateForm()) {
      setSubmitError("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setIsSuccess(false);
    setRequestId("");

    try {
      const response = await baseApi.post("/api/requests/", formData);

      // Проверяем успешность ответа и наличие данных
      if (response.data?.success && response.data?.data?.id) {
        setIsSuccess(true);
        setRequestId(response.data.data.id); // Сохраняем ID заявки
        setFormData({ title: "Запрос на рекламу", niche: "", phone: "" });
      } else {
        throw new Error("Неверный формат ответа от сервера");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Произошла ошибка при отправке. Пожалуйста, попробуйте позже."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article id='connection' className='page__box max-w-[1200px] mx-auto px-4 py-8'>
      <h1 className='typography__title font-bold text-center mb-8'>
        Связаться с нами очень просто!
      </h1>

      {isAuthenticated ? (
        <form
          onSubmit={handleSubmit}
          className='w-full flex bg-[var(--secondary-bg-black)] rounded-[30px] p-8 gap-8 max-lg:flex-col shadow-regular'>
          <div className='flex-1 flex flex-col bg-gradient-bg p-8 rounded-[30px]'>
            <h2 className='typography__title !text-[var(--text-white)]'>
              Ну что, готов запустить ракету объявления в космос
            </h2>
            <span className='typography__text !text-[var(--text-white)]'>Тогда погнали!</span>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <Input
              name='niche'
              placeholder='Ниша'
              type='text'
              value={formData.niche}
              onChange={handleChange}
              error={fieldErrors.niche} // Исправлено с name на niche
            />
            <Input
              name='phone'
              placeholder='Номер телефона'
              type='text'
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
            />

            {isSuccess && (
              <div className='p-4 bg-[var(--secondary-bg-green)] rounded-lg'>
                <h3 className='typography__title--medium !text-[var(--text-green)] mb-2'>
                  Заявка успешно создана!
                </h3>
                <p className='typography__text'>Ваша заявка #{requestId} принята в обработку.</p>
                <p className='typography__text mt-2'>
                  Наш менеджер свяжется с вами в ближайшее время.
                </p>
              </div>
            )}

            {submitError && (
              <div className='p-4 bg-[var(--secondary-bg-red)] rounded-lg'>
                <h3 className='typography__title--medium !text-[var(--text-red)] mb-2'>
                  Ошибка отправки
                </h3>
                <p className='typography__text'>{submitError}</p>
              </div>
            )}

            {!isSuccess && (
              <>
                <button
                  type='submit'
                  className={`button w-full ${
                    isSubmitting
                      ? "bg-[var(--button-primary-disabled)]"
                      : "bg-[var(--button-primary-enabled)] hover:bg-[var(--button-primary-click)]"
                  }`}
                  disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </button>

                <p className='typography__meta text-center'>
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных и
                  соглашаетесь c{" "}
                  <a href='/privacy-policy' className='text-[var(--text-blue)] hover:underline'>
                    политикой конфиденциальности
                  </a>
                </p>
              </>
            )}
          </div>
        </form>
      ) : (
        <div className='flex flex-col items-center bg-[var(--secondary-bg-black)] rounded-[30px] p-8 shadow-regular max-w-[600px] mx-auto'>
          <div className='typography__title font-bold text-center mb-4'>
            Чтобы отправить сообщение, пожалуйста, авторизуйтесь
          </div>
          <p className='typography__text text-center mb-6'>
            После авторизации вы сможете связаться с нашей командой напрямую
          </p>
          <button
            onClick={() => navigate(AppRoutes.AUTH_LOGIN)}
            className='button button--gradient'>
            Войти в аккаунт
          </button>
          <p className='typography__meta mt-4'>
            Нет аккаунта?{" "}
            <button
              onClick={() => navigate(AppRoutes.AUTH_REGISTER)}
              className='text-[var(--text-blue)] hover:underline'>
              Зарегистрироваться
            </button>
          </p>
        </div>
      )}
    </article>
  );
};
