import { PaymentModel } from "../models/PaymentModel";

export class PaymentService {
  static async getAll() {
    return await PaymentModel.getAll();
  }

  static async getByPatient(patientId: number) {
    return await PaymentModel.getByPatient(patientId);
  }

  static async create(
    appointmentId: number,
    // patientId: number,
    amount: number,
    paymentMethod: string,
  ) {
    return await PaymentModel.create(
      appointmentId,
      // patientId,
      amount,
      paymentMethod,
    );
  }
}
