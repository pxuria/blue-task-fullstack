import FacilityTypes from "../models/facilityTypesModel.js";

const createFacilityType = async (req, res) => {
  try {
    const { name, repaymentType, amount, interestRate, penaltyRate } = req.body;

    if (!name || !repaymentType || !amount || !interestRate || !penaltyRate) {
      return res.status(400).json({ message: "Please fill all the inputs" });
    }

    const newFacilityTypes = new FacilityTypes({
      name,
      repaymentType,
      amount,
      interestRate,
      penaltyRate,
    });

    await newFacilityTypes.save();
    res.status(201).json({ message: "Facility type created successfully!", facilityType: newFacilityTypes });
  } catch (error) {
    res.status(500).json({ message: "Error creating facility type", error: error.message });
  }
};

const getAllFacilityTypes = async (req, res) => {
  try {
    const facilityTypes = await FacilityTypes.find();
    res.status(200).json({ status: "success", results: facilityTypes.length, data: facilityTypes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching facility details", error: error.message });
  }
};

export { createFacilityType, getAllFacilityTypes };
