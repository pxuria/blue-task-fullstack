import Facility from "../models/facilityModel.js";
import FacilityTypes from "../models/facilityTypesModel.js";

const createFacility = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      nationalCode,
      bankAccountNumber,
      averageBalance,
      shabaNumber,
      facilityType,
      repaymentType,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      !phoneNumber ||
      !nationalCode ||
      !bankAccountNumber ||
      !averageBalance ||
      !shabaNumber ||
      !facilityType ||
      !repaymentType
    ) {
      res.status(400);
      throw new Error("Please fill all the inputs.");
    }

    const selectedFacilityType = await FacilityTypes.findById(facilityType);
    if (!selectedFacilityType) {
      res.status(404);
      throw new Error("Facility type not found.");
    }

    if (!selectedFacilityType.repaymentType.includes(repaymentType)) {
      res.status(400);
      throw new Error("Invalid repayment type selected.");
    }

    const interestPrice = (selectedFacilityType.interestRate / 100) * selectedFacilityType.amount;
    const repaymentPricePerMonth = (interestPrice + selectedFacilityType.amount) / repaymentType;

    const newFacility = new Facility({
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      nationalCode,
      bankAccountNumber,
      averageBalance,
      shabaNumber,
      facilityType,
      repaymentType,
      repaymentPricePerMonth,
    });

    await newFacility.save();

    res.status(201).json({ message: "Facility created successfully!", facility: newFacility });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the facility", error: error.message });
  }
};

const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().populate("facilityType");
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the facilities", error: error.message });
  }
};

export { createFacility, getFacilities };
