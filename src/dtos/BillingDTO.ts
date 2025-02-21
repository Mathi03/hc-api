export class BillingDTO {
  patientId: number;
  date: string;
  amount: number;
  paymentStatus: "Pending" | "Paid" | "Canceled";
  insurance?: string;

  constructor(data: any) {
    this.patientId = data.patientId;
    this.date = data.date;
    this.amount = data.amount;
    this.paymentStatus = data.paymentStatus;
    this.insurance = data.insurance;
  }

  validate() {
    const errors: string[] = [];

    if (!this.patientId) errors.push("Patient ID is required.");
    if (!this.date) errors.push("Date is required.");
    if (!this.amount) errors.push("Amount is required.");
    if (!this.paymentStatus) errors.push("Payment status is required.");
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
