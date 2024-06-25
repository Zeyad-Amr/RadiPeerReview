import * as React from "react";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useAppDispatch } from "@/core/state/store";
import { Box } from "@mui/system";
import { Switch } from "@mui/material";
import {
  activateRadiologist,
  deactivateRadiologist,
} from "@/modules/radiologists/controllers/thunks/deactivate-thunk";
import { RadiologistInterface } from "@/modules/radiologists/interfaces/radiologist-interface";
import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import PageTitle from "@/core/shared/components/PageTitle";
import IconBtn from "@/core/shared/components/btns/IconBtn";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import { UserInterface } from "@/modules/auth/interfaces/user-interface";

export default function RadiologistsListTable({
  title,
  FormComponent,
  tableList,
  tableHeader,
  getListThunk,
  formDialogMaxWidth = "sm",
}: {
  title: string;
  FormComponent: any;
  tableList: UserInterface[];
  tableHeader: HeaderItem[];
  getListThunk: any;
  formDialogMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [tableItemData, setTableItemData] = useState<any>();
  const dispatch = useAppDispatch();
  const [userId, setUserID] = useState<string>("");

  const handleToggle = async (item: UserInterface) => {
    setTableItemData(item);
    if (!item.isdeactivated) {
      await dispatch(deactivateRadiologist(item.radiologist?.id ?? ""));
    } else {
      await dispatch(activateRadiologist(item.radiologist?.id ?? ""));
    }
  };

  function formatSpecializations(specializations: string[]) {
    return specializations
      .map((specialization) => {
        return specialization
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      })
      .join(", ");
  }

  const updatedTableHeader: HeaderItem[] = [
    ...tableHeader,
    {
      filterKey: "update",
      id: "update",
      label: "",
      isComponent: true,
      minWidth: 100,
      tableCellProps: { align: "right" },
      sortable: false,
      filterable: false,
      searchable: false,
      onClick: () => {},
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "0 auto",
        }}
      >
        <PageTitle title={title} sx={{ mb: 0 }} />
        <IconBtn
          icon={<AddCircleOutlineIcon />}
          title="Add Radiologist"
          onClick={(event: any) => {
            event.stopPropagation();
            setTableItemData(undefined);
            setIsDialogOpen(true);
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <CustomDataTable
          boxShadow={0}
          height="75vh"
          sx={{ mb: 0 }}
          showPagination={false}
          showToolbar={false}
          fetchData={() => {
            dispatch(getListThunk());
          }}
          totalItems={tableList?.length}
          noDataMessage={
            "No data available, press the add button to add a new item."
          }
          data={tableList?.map((item: UserInterface) => {
            return {
              fullname: item.radiologist?.fname + " " + item.radiologist?.lname,
              specialization: formatSpecializations(
                item.radiologist?.specializations ?? []
              ),
              ...item,
              update: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    color: "primary.dark",
                  }}
                >
                  <EditRoundedIcon
                    sx={{ cursor: "pointer", color: "primary.light" }}
                    onClick={() => {
                      setTableItemData({ ...item, password: "" });
                      setUserID(item.id);
                      setIsDialogOpen(true);
                    }}
                  />
                  <Switch
                    checked={!item.isdeactivated}
                    onClick={() => handleToggle(item)}
                  />
                </Box>
              ),
            };
          })}
          headerItems={updatedTableHeader}
        />
      </Box>

      {/* Create or Edit Item */}
      <CustomizedDialog
        title={tableItemData ? "Edit Radiologist" : "Add Radiologist"}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        maxWidth={formDialogMaxWidth}
      >
        <FormComponent
          initialValues={tableItemData}
          setShowFormDialog={setIsDialogOpen}
          id={userId}
        />
      </CustomizedDialog>
    </>
  );
}
