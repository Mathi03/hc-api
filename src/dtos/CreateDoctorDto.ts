import { CreateUserDto } from "./CreateUserDto";
import { User } from "../models/userModel";

export class CreateDoctorDto extends CreateUserDto {
  specialty_id: number;

  constructor(data: any) {
    super(data);
    if (!data.specialty_id) {
      throw new Error("El campo specialty_id es obligatorio.");
    }
    this.specialty_id = data.specialty_id;
  }

  validateRegistrationForm(): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const validation = super.validateRegistrationForm();
    const errors = { ...validation.errors };

    if (!this.specialty_id || isNaN(this.specialty_id)) {
      errors.specialty_id = "El specialty_id debe ser un número válido y obligatorio.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  toModel(): User {
    return {
      ...super.toModel(),
      // specialty_id: this.specialty_id,
    };
  }
}

