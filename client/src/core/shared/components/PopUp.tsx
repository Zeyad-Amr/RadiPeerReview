import { Box, Typography } from '@mui/material';
import React from 'react'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface PopUpProps {
    display: string;
    DialogStateController: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    children: React.ReactNode;
}

const PopUp = ({
    display,
    DialogStateController,
    title,
    children,
}: PopUpProps) => {
    return (
        <Box sx={{ display: display }}>
            <Box
                sx={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000000aa",
                    zIndex: "1000",
                    filter: "blur(0.5px)",
                }}
                onClick={() => DialogStateController("none")}

            ></Box>
            <Box
                sx={{
                    padding: "2rem",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40vw",
                    height: "fit-content",
                    zIndex: "1001",
                }}
            >
                <Box
                    sx={{

                        position: "relative",
                        backgroundColor: "white",
                        width: "100%",
                        height: "100%",
                        borderRadius: "15px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "primary.dark",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: ".25rem 2rem",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                        }}
                    >
                        <Typography sx={{ color: "white", fontWeight: "600" }}>
                            {title}
                        </Typography>
                        <CloseRoundedIcon
                            sx={{
                                color: "white",
                                margin: "0.5rem 0",
                                fontSize: "2rem",
                                cursor: "pointer",
                            }}
                            onClick={() => DialogStateController("none")}
                        />
                    </Box>
                    <Box sx={{padding:'2rem'}}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>)
}

export default PopUp