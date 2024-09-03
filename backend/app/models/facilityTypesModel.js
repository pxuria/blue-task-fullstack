import mongoose from "mongoose";

const facilityTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    repaymentType: {
      type: [Number],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    penaltyRate: {
      type: Number,
      required: true,
    },
    interestPrice: {
      type: Number,
    },
    penaltyPrice: {
      type: Number,
    },
    repaymentPricePerMonth: {
      type: Number,
    },
  },
  { timestamps: true }
);

facilityTypesSchema.pre("save", function (next) {
  this.interestPrice = (this.interestRate / 100) * this.amount;
  this.penaltyPrice = Math.round((this.penaltyRate / 100) * this.amount);
  next();
});

const FacilityTypes = mongoose.model("FacilityTypes", facilityTypesSchema);
export default FacilityTypes;
