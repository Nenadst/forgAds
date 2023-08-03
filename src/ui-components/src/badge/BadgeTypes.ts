import { BadgeProps as MuiBadgeProps } from "@mui/material";
import React from "react";

type StatusType = 'active' | 'deleted';
type SizeType = 'sm' | 'md';

export interface BadgeProps extends MuiBadgeProps {
    label?: React.ReactNode;
    size?: SizeType;
    status?: StatusType;
}