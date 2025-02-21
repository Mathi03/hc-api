export interface PacienteDTO {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: "Masculino" | "Femenino" | "Otro";
  direccion?: string;
  telefono?: string;
  email: string;
  numero_seguro_social?: string;
}

