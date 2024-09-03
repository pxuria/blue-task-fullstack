import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { BASE_URL } from "../../../config.json";
import { convertToPersian } from "../../utils";
import { Buttons, FacilityItem, Modal } from "../UI";

interface FacilityTypeItem {
  _id: string;
  name: string;
  repaymentType: number;
  amount: number;
  interestRate: number;
  penaltyPrice: number;
  interestPrice: number;
  penaltyRate: number;
}
interface FacilityType {
  _id: string;
  name: string;
  repaymentType: number[];
  amount: number;
  interestRate: number;
  penaltyRate: number;
}

interface FacilitySelectionProps {
  nextStep: () => void;
  backStep?: () => void;
}

const FacilitySelection: React.FC<FacilitySelectionProps> = ({ nextStep, backStep }) => {
  const { setValue } = useFormContext();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [facilityType, setFacilityType] = useState<FacilityTypeItem>({
    _id: "",
    name: "",
    repaymentType: 0,
    interestPrice: 0,
    penaltyPrice: 0,
    amount: 0,
    interestRate: 0,
    penaltyRate: 0,
  });
  const [repaymentType, setRepaymentType] = useState<{ facilityId: string; repayment: number }>({
    facilityId: facilityType._id,
    repayment: facilityType.repaymentType,
  });
  const [facilityOptionList, setFacilityOptionList] = useState<FacilityType[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      const res = await fetch(`${BASE_URL}/api/facility-types`);
      const fetchedData = await res.json();
      const data = await fetchedData.data;
      setFacilityOptionList(data);
      setFacilityType(data[0]);
    };
    fetchFacilities();
  }, []);

  // Function to update form values
  const updateFormValues = useCallback(
    (id: string, repayment: number) => {
      setValue("facilityType", id);
      setValue("repaymentType", repayment);
    },
    [setValue]
  );

  const facilityOptions = useMemo(
    () =>
      facilityOptionList.map((item, index) => (
        <FacilityItem
          key={index}
          index={index}
          facilityOptionList={facilityOptionList.length}
          item={item}
          updateFormValues={updateFormValues}
          setFacilityType={setFacilityType}
          setRepaymentType={setRepaymentType}
          repaymentType={repaymentType}
          setToggleModal={setToggleModal}
        />
      )),
    [facilityOptionList, repaymentType, updateFormValues]
  );
  return (
    <>
      <div className="flex flex-wrap justify-start gap-4 mt-6">
        {/* facility selection */}
        <div className="flex flex-col gap-2 items-start w-full relative">
          <label htmlFor="facilitySelection" className="label">
            انتخاب نوع تسهیلات
          </label>
          <div className="relative w-full">
            {toggleModal ? (
              <FaChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 h-3 w-3" />
            ) : (
              <FaChevronLeft className="absolute top-1/2 right-4 -translate-y-1/2 h-3 w-3" />
            )}
            <input
              type="text"
              name="facilitySelection"
              id="facilitySelection"
              className="outline-none border-2 border-solid border-secondary px-2 py-1 rounded-md w-full h-[48px] ps-8 cursor-pointer bg-white hover:bg-[#f8f9fa]"
              onClick={() => setToggleModal((prev) => !prev)}
              value={facilityType.name}
              readOnly
            />
          </div>
          {toggleModal && (
            <Modal onClose={() => setToggleModal(false)}>
              <div className="w-full flex flex-col bg-[#f8f9fa] rounded-xl max-h-[80vh] overflow-y-scroll overflow-x-hidden">
                {facilityOptions}
              </div>
            </Modal>
          )}
        </div>

        {/* amount */}
        <div className="input-group">
          <label htmlFor="price" className="label">
            مبلغ
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={`${convertToPersian(facilityType.amount)} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* repayment period */}
        <div className="input-group">
          <label htmlFor="repaymentPeriod" className="label">
            مدت زمان بازپرداخت
          </label>
          <input
            type="text"
            name="repaymentPeriod"
            id="repaymentPeriod"
            value={`${convertToPersian(facilityType.repaymentType)} ماهه`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* number of installments */}
        <div className="input-group mt-2">
          <label htmlFor="numberOfInstallments" className="label">
            تعداد اقساط
          </label>
          <input
            type="text"
            name="numberOfInstallments"
            id="numberOfInstallments"
            value={convertToPersian(facilityType.repaymentType)}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* monthly installment amount */}
        <div className="input-group mt-2">
          <label htmlFor="installmentAmount" className="label">
            مبلغ قسط ماهیانه
          </label>
          <input
            type="text"
            name="installmentAmount"
            id="installmentAmount"
            value={`${convertToPersian(
              Math.round((facilityType.interestPrice + facilityType.amount) / facilityType.repaymentType)
            )} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* annual interest percentage */}
        <div className="input-group mt-2">
          <div className="flex gap-2 flex-nowrap">
            <label htmlFor="annualInterestPercentage" className="label">
              مبلغ سود سالیانه
            </label>
            <span className="text-[#35AD8B] bg-[#E0F0ED] px-2 rounded-md">{facilityType.interestRate}%</span>
          </div>
          <input
            type="text"
            name="annualInterestPercentage"
            id="annualInterestPercentage"
            value={`${convertToPersian(facilityType.interestPrice)} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* late fine amount */}
        <div className="input-group mt-2">
          <div className="flex gap-2 flex-nowrap">
            <label htmlFor="lateFineAmount" className="label">
              مبلغ جریمه دیرکرد
            </label>
            <span className="text-[#BC102B] bg-[#F1DCE1] px-2 rounded-md">{facilityType.penaltyRate}%</span>
          </div>
          <input
            type="text"
            name="lateFineAmount"
            id="lateFineAmount"
            value={`${convertToPersian(facilityType.penaltyPrice)} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>
      </div>

      {/* buttons */}
      <Buttons nextStep={nextStep} backStep={backStep} submit />
    </>
  );
};

export default FacilitySelection;
