import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import {
  deleteRadiologist,
  getRadiologistList,
} from "@/modules/admin/controllers/thunks/radiologist-thunk";
import { RadiologistState } from "@/modules/admin/controllers/types";
import React from "react";
import { radiologistHeaderTable } from "./data";
import RadiologistForm from "../../components/radiologist/RadiologistForm";

const AddRadiologistPage = () => {
  const radiologistState: RadiologistState = useAppSelector(
    (state: any) => state.radiologist
  );
  return (
    <ExaminationAccordion
      getListThunk={getRadiologistList}
      deleteThunk={deleteRadiologist}
      tableList={radiologistState?.radiologists}
      tableHeader={radiologistHeaderTable}
      title="Radiologists"
      FormComponent={RadiologistForm}
      formDialogMaxWidth="md"
    />
  );
};

export default AddRadiologistPage;
