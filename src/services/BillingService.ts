import BillingModel from "../models/BillingModel";
import { BillingDTO } from "../dtos/BillingDTO";

class BillingService {
  async create(billingData: any) {
    const billingDTO = new BillingDTO(billingData);
    const validation = billingDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await BillingModel.create(billingDTO);
  }

  async getAll() {
    return await BillingModel.getAll();
  }

  async getById(id: number) {
    const billing = await BillingModel.getById(id);
    if (!billing) throw new Error("Billing record not found");
    return billing;
  }

  async update(id: number, billingData: any) {
    return await BillingModel.update(id, billingData);
  }

  async delete(id: number) {
    return await BillingModel.delete(id);
  }
}

export default new BillingService();
