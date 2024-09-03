import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    birthDate: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    nationalCode: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
      max: 16,
    },
    averageBalance: {
      type: String,
      required: true,
    },
    shabaNumber: {
      type: String,
      required: true,
      max: 24,
    },
    facilityType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacilityTypes",
      required: true,
    },
    repaymentType: { type: Number, required: true },
    repaymentPricePerMonth: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Facility", facilitySchema);
