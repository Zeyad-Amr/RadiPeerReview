import { RootState, useAppSelector } from "@/core/state/store";
import {
  deleteRadiologist,
  getRadiologistList,
} from "@/modules/radiologists/controllers/thunks/radiologist-thunk";
import { RadiologistState } from "@/modules/radiologists/controllers/types";
import React from "react";
import { radiologistHeaderTable } from "./data";
import RadiologistForm from "../components/RadiologistForm";
import RadiologistsListTable from "../components/RadiologistsListTable";

const RadiologistPage = () => {
  const radiologistState: RadiologistState = useAppSelector(
    (state: RootState) => state.radiologists
  );
  return (
    <RadiologistsListTable
      getListThunk={getRadiologistList}
      tableList={radiologistState?.radiologists}
      tableHeader={radiologistHeaderTable}
      title="Radiologists"
      FormComponent={RadiologistForm}
      formDialogMaxWidth="md"
    />
  );
};

export default RadiologistPage;
