import { CreateUserDto } from "./CreateUserDto";
import { User } from "../models/userModel";

export class CreatePatientDto extends CreateUserDto {
  social_security_number: string;
  address: string;

  constructor(data: any) {
    super(data);
    if (!data.address) {
      throw new Error("El campo address es obligatorio.");
    }
    this.social_security_number = data.social_security_number;
    this.address = data.address;
  }

  validateRegistrationForm(): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const validation = super.validateRegistrationForm();
    const errors = { ...validation.errors };

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
