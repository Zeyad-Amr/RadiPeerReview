import * as React from "react";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomizedDialog from "./CustomizeDialog";
import { CustomDataTable, HeaderItem } from "./CustomDataTable";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch } from "@/core/state/store";
import { Box } from "@mui/system";
import ConfirmationDialog from "./ConfirmationDialog";
import PrimaryButton from "./btns/PrimaryButton";
import PageTitle from "./PageTitle";
import IconBtn from "./btns/IconBtn";

export default function CreateUser({
  title,
  FormComponent,
  tableList,
  tableHeader,
  getListThunk,
  deleteThunk,
  formDialogMaxWidth = "sm",
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [tableItemData, setTableItemData] = useState<any>();
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [userId, setUserID] = useState<string>('')
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
      onClick: () => { },
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
          onClick={(event) => {
            event.stopPropagation();
            setTableItemData(undefined);
            setIsViewMode(false);
            setIsDialogOpen(true);
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <CustomDataTable
          boxShadow={0}
          height="40vh"
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
          data={tableList?.map((item: any) => {
            return {
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
                  {/* <VisibilityIcon
                    sx={{ cursor: "pointer", color: "primary.light" }}
                    onClick={() => {
                      setIsViewMode(true);
                      setTableItemData({ ...item, password: '' });
                      setUserID(item.id);
                      setIsDialogOpen(true);
                    }}
                  />
                  <EditRoundedIcon
                    sx={{ cursor: "pointer", color: "primary.light" }}
                    onClick={() => {
                      setIsViewMode(false);
                      setTableItemData({...item, password:''});
                      setUserID(item.id);
                      console.log({...item, password:''});
                      setIsDialogOpen(true);
                    }}
                  /> */}
                  <DeleteRoundedIcon
                    sx={{ cursor: "pointer", color: "primary.light" }}
                    onClick={() => {
                      setTableItemData(item);
                      setShowConfirmationDialog(true);
                    }}
                  />
                </Box>
              ),
            };
          })}
          headerItems={updatedTableHeader}
        />
      </Box>

      {/* Delete Item */}
      <ConfirmationDialog
        confirmFunction={async () => {
          dispatch(deleteThunk(String(tableItemData?.id))).then(() => {
            setShowConfirmationDialog(false);
          });
        }}
        contentMessage="If you delete the item, you will not be able to retrieve it again. Are you sure you want to delete this item?"
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="Delete Item"
      />

      {/* Create, Edit, or View Item */}
      <CustomizedDialog
        title={
          isViewMode ? "Show Item" : tableItemData ? "Edit Item" : "Add Item"
        }
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        maxWidth={formDialogMaxWidth}
      >
        <FormComponent
          isViewMode={isViewMode}
          initialValues={tableItemData}
          setShowFormDialog={setIsDialogOpen}
          id={userId}
        />
        {/* Convert from view mode to edit mode */}
        {isViewMode && (
          <PrimaryButton
            title={"تعديل العنصر"}
            type="submit"
            onClick={() => {
              setIsViewMode(false);
            }}
          />
        )}
      </CustomizedDialog>
    </>
  );
}
