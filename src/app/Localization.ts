export class Localization {

  public static WRONG_REGISTRATION_DATA:string = 'wrong-registration-data';
  public static KEY_WRONG_CONFIRM_PASSWORD:string = 'key-wrong-confirm-password';
  public static REGISTRATION_PROMPT:string = 'registration-prompt';
  public static KEY_USER_NAME_WRONG_LENGTH:string = 'key-user-name-wrong-length';
  public static KEY_USER_NAME_ALLOWED_SYMBOLS:string = 'key-user-name-allowed-symbols';
  public static KEY_EMAIL_INCORRECT_FORMAT:string = 'key-email-incorrect-format';
  public static KEY_PASSWORD_INCORRECT_FORMAT:string = 'key-password-incorrect-format';
  public static KEY_PASSWORD_WRONG_LENGTH:string = 'key-password-wrong-length';
  public static KEY_PASSWORDS_NOT_EQUAL:string = 'key-passwords-not-equal';
  public static KEY_PHONE_WRONG_LENGTH:string = 'key-phone-wrong-length';
  public static KEY_NOT_FILL_REGISTRATION_PARAMS:string = 'key-not-fill-registration-params';
  public static LOGIN_PROMPT:string = 'login-prompt';
  public static KEY_NOT_FILL_LOGIN_PARAMS:string = 'key-not-fill-login-params';

  public static getLocalizationFor(code:string, key:string) : string {
    switch(code) {
      case 'LOGIN_ERROR': {
        switch (key) {
          case 'Phone_not_found_or_wrong_password':
            return 'Не найден номер телефона или введен некорректный пароль.';
        }
        return 'Ошибка входа в систему.';
      }
      case 'LOGOUT_ERROR': {
        switch (key) {
          case 'token_not_found':
            return 'Не найден токен.';
        }
        return 'Ошибка выхода из системы.';
      }
      case Localization.WRONG_REGISTRATION_DATA: {
        switch (key) {
          case Localization.KEY_WRONG_CONFIRM_PASSWORD:
            return 'Подтверждение пароля отличается от самого пароля';
        }
        return 'Ошибка регистрационных данных';
      }
      case Localization.REGISTRATION_PROMPT: {
        switch (key) {
          case Localization.KEY_USER_NAME_WRONG_LENGTH:
            return 'Длина имени не должна превышать 5 символов';
          case Localization.KEY_USER_NAME_ALLOWED_SYMBOLS:
            return 'Имя может содержать строчные и заглавные латинские буквы, знаки "дефис" и "нижнее подчеркивание"';
          case Localization.KEY_EMAIL_INCORRECT_FORMAT:
            return 'Неверный формат электронной почты';
          case Localization.KEY_PASSWORD_WRONG_LENGTH:
            return 'Пароль должен быть не короче 5 символов';
          case Localization.KEY_PASSWORD_INCORRECT_FORMAT:
            return "Пароль может содержать строчные и заглавные латинские буквы, и следующие спецсимволы !#$%&'*+=?^_`{|}~-";
          case Localization.KEY_PASSWORDS_NOT_EQUAL:
            return "Повторный пароль отличается от оригинального.";
          case Localization.KEY_PHONE_WRONG_LENGTH:
            return "Не до конца заполнен номер телефона.";
          case Localization.KEY_NOT_FILL_REGISTRATION_PARAMS:
            return "Необходимо заполнить все поля!";
        }
        return 'Ошибка регистрационных данных';
      }
      case Localization.LOGIN_PROMPT: {
        switch (key) {
          case Localization.KEY_NOT_FILL_LOGIN_PARAMS:
            return 'Введите пароль';
        }
        return 'Данные заполнены не корректно';
      }
    }
    return 'Неизвестная ошибка.';
  }
}
