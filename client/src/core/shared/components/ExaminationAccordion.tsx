import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ComponentType, Dispatch, SetStateAction, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomizedDialog from "./CustomizeDialog";
import { CustomDataTable, HeaderItem } from "./CustomDataTable";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FilterQuery } from "@/core/api";
import { useAppDispatch } from "@/core/state/store";
import { Box, Breakpoint } from "@mui/system";
import ConfirmationDialog from "./ConfirmationDialog";
import PrimaryButton from "./btns/PrimaryButton";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", transform: "rotate(180deg)" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface AccordionComponentPropsInterface {
  title: string;
  FormComponent: ComponentType<ExaminationFormComponentPropsInterface>;
  tableHeader: HeaderItem[];
  tableList: any;
  getListThunk: (filters: FilterQuery[]) => any;
  deleteThunk: (id: string) => any;
  isAccordionExpanded?: boolean;
  formDialogMaxWidth?: false | Breakpoint;
  accordionWidth?: string;
  accordionSx?: any;
  patientId?: string;
  visitCode?: string;
}

export interface ExaminationFormComponentPropsInterface {
  isViewMode: boolean;
  patientId?: string;
  visitCode?: string;
  initialValues: any;
  setShowFormDialog: Dispatch<SetStateAction<boolean>>;
}

export default function ExaminationAccordion({
  title,
  FormComponent,
  tableList,
  tableHeader,
  getListThunk,
  deleteThunk,
  formDialogMaxWidth = "sm",
  accordionWidth = "100%",
  accordionSx,
  isAccordionExpanded = false,
  visitCode,
  patientId
}: AccordionComponentPropsInterface) {
  const [expandedAccordion, setExpandedAccordion] =
    useState<boolean>(isAccordionExpanded);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [tableItemData, setTableItemData] = useState<any>();
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

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

  // Function to check and format date properties
  const formatDateProperties = (item: any) => {
    const formattedItem: any = { ...item };
    for (const key in formattedItem) {
      if (formattedItem.hasOwnProperty(key)) {
        const value = formattedItem[key];
        if (value === null || value === undefined) {
          formattedItem[key] = "";
        }
        if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
          formattedItem[key] = value.split("T")[0];
        }
      }
    }
    return formattedItem;
  };

  return (
    <>
      <Accordion
        expanded={expandedAccordion}
        onChange={() => setExpandedAccordion(!expandedAccordion)}
        sx={{ width: accordionWidth, ...accordionSx }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{title}</Typography>
          <AddCircleOutlineIcon
            sx={{
              position: "absolute",
              zIndex: 999,
              right: "0.7rem !important",
            }}
            onClick={(event) => {
              event.stopPropagation();
              setTableItemData(undefined);
              setIsViewMode(false);
              setIsDialogOpen(true);
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <CustomDataTable
            boxShadow={0}
            height="40vh"
            sx={{ mb: 0, }}
            showPagination={false}
            showToolbar={false}
            fetchData={(filters: FilterQuery[]) => {
              dispatch(getListThunk(filters));
            }}
            resetComponent={tableList?.reset}
            totalItems={tableList?.total}
            noDataMessage={
              "No data available, press the add button to add a new item."
            }
            data={tableList?.items?.map((item: any) => {
              const formattedItem = formatDateProperties(item);
              return {
                ...formattedItem,
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
                    <VisibilityIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsViewMode(true);
                        setTableItemData(formattedItem);
                        setIsDialogOpen(true);
                      }}
                    />
                    <EditRoundedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsViewMode(false);
                        setTableItemData(formattedItem);
                        setIsDialogOpen(true);
                      }}
                    />
                    <DeleteRoundedIcon
                      sx={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        setTableItemData(formattedItem);
                        setShowConfirmationDialog(true);
                      }}
                    />
                  </Box>
                ),
              };
            })}
            headerItems={updatedTableHeader}
          />
        </AccordionDetails>
      </Accordion>

      {/* Delete Item */}
      <ConfirmationDialog
        confirmFunction={async () => {
          console.log(tableItemData?.id, "tableItemData?.id");

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
          patientId={patientId}
          visitCode={visitCode}
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
