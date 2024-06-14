import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface CustomAlertHeaderPropsI {
  dataList: { title: string; message: any }[];
  color : string;
}

const CustomAlertHeaderData = ({ dataList , color }: CustomAlertHeaderPropsI) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5rem 2rem",
      }}
    >
      <Grid
        container
        sx={{ color: "white", padding: "0.5rem", alignItems: "center" }}
      >
        {dataList.map(
          (dataEl: { title: string; message: any }, index: number) => {
            return (
              <Grid
                key={index}
                item
                lg={3}
                md={3}
                sm={6}
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography>{dataEl.title} :</Typography>
                <Typography sx={{ fontWeight: "600" }}>
                  &nbsp;{dataEl.message}
                </Typography>
              </Grid>
            );
          }
        )}
      </Grid>
    </Box>
  );
};

export default CustomAlertHeaderData;
