import { User } from "../models/userModel";

export class CreateUserDto {
  name: string;
  lastname: string;
  identifier: string;
  dob: string;
  email: string;
  sex: string;
  username: string;
  password: string;
  phone: string;
  country?: string;
  city: string;
  tyc: boolean;
  // is_admin?: boolean;

  [key: string]: any;
  constructor(data: any) {
    this.name = data.name;
    this.lastname = data.lastname;
    this.identifier = data.identifier;
    this.dob = data.dob;
    this.email = data.email;
    this.sex = data.sex;
    this.username = data.username?.toLowerCase();
    this.password = data.password;
    this.phone = data.phone;
    this.city = data.city;
    this.tyc = data.tyc;
    this.country = data.country;
  }

  validate() {
    const errors: { [key: string]: string } = {};
    const requiredFields: Record<string, string>[] = [
      { field: "name", label: "nombre" },
      { field: "lastname", label: "apellido" },
      { field: "identifier", label: "identificador" },
      { field: "dob", label: "fecha de nacimiento" },
      { field: "email", label: "correo electrónico" },
      { field: "sex", label: "sexo" },
      { field: "username", label: "nombre de usuario" },
      { field: "password", label: "contraseña" },
      { field: "phone", label: "teléfono" },
      { field: "city", label: "ciudad" },
      { field: "country", label: "pais" },
      { field: "tyc", label: "términos y condiciones" },
    ];

    // Validación de campos obligatorios
    requiredFields.forEach(({ field, label }) => {
      if (!this[field]) {
        errors[field] = `El campo [${label}] es obligatorio.`;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  validateRegistrationForm(): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: { [key: string]: string } = {};

    const nameRegex = /^[a-zA-Z\s]{2,20}$/;
    if (!nameRegex.test(this.name)) {
      errors.name = "Nombre debe conformarse de entre 2-20 letras.";
    }
    if (!nameRegex.test(this.lastname)) {
      errors.lastname = "Apellido debe conformarse de entre 2-20 letras.";
    }

    const dobDate = new Date(this.dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const isValidDate = !isNaN(dobDate.getTime());
    const over18 =
      age > 18 ||
      (age === 18 &&
        today >= new Date(dobDate.setFullYear(dobDate.getFullYear() + 18)));
    const notInFuture = dobDate <= today;

    if (!isValidDate) {
      errors.dob = "La fecha de nacimiento debe ser valida.";
    } else if (!over18) {
      errors.dob = "Tu debes ser mayor a 18 años.";
    } else if (!notInFuture) {
      errors.dob = "La fecha de nacimiento no puede ser en el futuro.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      errors.email = "Correo electronico invalido.";
    }

    const validGenders = ["M", "F"];
    if (this.sex && !validGenders.includes(this.sex)) {
      errors.sex = "Sexo invalido.";
    }

    const usernameRegex = /^[a-zA-Z0-9]{6,20}$/;
    if (!usernameRegex.test(this.username)) {
      errors.username =
        "Username debe ser alfanumerico, sin caracteres especiales y entre 6-20 caracteres.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*+\-])[A-Za-z\d@#$*+\-]{8,20}$/;
    if (!passwordRegex.test(this.password!)) {
      errors.password =
        "Password debe ser entre 8-20 caracteres con al menos 1 letra mayuscula, 1 letra minuscula, 1 numero, y 1 caracter especial (@, #, $, *, +, -).";
    }

    const phoneRegex = /^\+?[0-9\s()-]{7,15}$/;
    if (!phoneRegex.test(this.phone)) {
      errors.phoneNumber =
        "Telefono debe ser entre 7-15 digitos y puede incluir espacios, parentesis, guines, y el simbolo +.";
    }

    const cityRegex = /^[a-zA-Z\s]+$/;
    if (!cityRegex.test(this.city)) {
      errors.city = "Ciudad debe conformarse solamente con letras y espacios.";
    }

    if (!this.tyc) {
      errors.termsAndConditions = "Debes aceptar los terminos y condiciones.";
    }

    // Final validation result
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
  toModel(): User {
    return {
      id: 0,
      external_id: "",
      name: this.name,
      lastname: this.lastname,
      identifier: this.identifier,
      dob: this.dob,
      email: this.email.toLowerCase(),
      sex: this.sex,
      username: this.username.toLowerCase(),
      password: this.password!,
      phone: this.phone,
      city: this.city,
      tyc: this.tyc,
      created: "",
      updated: "",
      ...(this.country && { country: this.country }),
    };
  }
}
