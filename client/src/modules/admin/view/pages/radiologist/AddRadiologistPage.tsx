
import { useAppSelector } from "@/core/state/store";
import {
  deleteRadiologist,
  getRadiologistList,
} from "@/modules/admin/controllers/thunks/radiologist-thunk";
import { RadiologistState } from "@/modules/admin/controllers/types";
import React from "react";
import { radiologistHeaderTable } from "./data";
import RadiologistForm from "../../components/radiologist/RadiologistForm";
import CreateUser from "@/core/shared/components/CreateUser";


const AddRadiologistPage = () => {
  const radiologistState: RadiologistState = useAppSelector(
    (state: any) => state.radiologist
  );
  console.log(radiologistState?.radiologists)
  return (
    <CreateUser
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
