import React from "react";
import ListItem from "@mui/material/ListItem";
import ElemCard from "./ElemCard";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ListWrapper from "../ListWrapper";
import "./ElemCardList.css";

export interface ISecondaryCardText {
  text: string;
  colorClass?: string;
}

interface ElemCardListProps {
  data?: any[];
  noDataMsg?: string;
  getId?: (elem: any) => string;
  getPrimary?: (elem: any) => string;
  getSecondary1?: (elem: any) => ISecondaryCardText;
  getSecondary2?: (elem: any) => ISecondaryCardText;
  getSecondary3?: (elem: any) => ISecondaryCardText;
  getImage?: (elem: any) => string;
  onClick?: (elem: any) => void;
  subHeader?: any;
  loading?: boolean;
  error?: string;
}

const ElemCardList: React.FC<ElemCardListProps> = ({
  data = [],
  noDataMsg,
  getId = () => "",
  getPrimary = () => "",
  getSecondary1 = (): ISecondaryCardText => ({ text: "" }),
  getSecondary2 = (): ISecondaryCardText => ({ text: "" }),
  getSecondary3 = (): ISecondaryCardText => ({ text: "" }),
  getImage = () => "",
  onClick = () => {},
  subHeader = "",
  loading,
  error
}) => {
  const handleClick = (elem: any) => {
    onClick(elem);
  };

  if (loading) {
    return <CircularProgress className="target-list" />;
  }
  if (error) {
    return (
      <Typography
        className="elem-list"
        variant="caption"
        display="block"
        gutterBottom
      >
        {error}
      </Typography>
    );
  }
  if (data.length === 0) {
    return (
      <Typography
        className="elem-list"
        variant="caption"
        display="block"
        gutterBottom
      >
        {noDataMsg || "No data"}
      </Typography>
    );
  }
  const secondary1 = (elem: any) => {
    const { text, colorClass } = getSecondary1(elem);
    return <div className={colorClass}>{text}</div>;
  };
  const secondary2 = (elem: any) => {
    const { text, colorClass } = getSecondary2(elem);
    return <div className={colorClass}>{text}</div>;
  };
  const secondary3 = (elem: any) => {
    const { text, colorClass } = getSecondary3(elem);
    return <div className={colorClass}>{text}</div>;
  };
  return (
    <ListWrapper subHeader={subHeader}>
      {data.map((elem: any) => (
        <ListItem button key={getId(elem)} onClick={() => handleClick(elem)}>
          <ElemCard
            primary={getPrimary(elem)}
            secondary1={secondary1(elem)}
            secondary2={secondary2(elem)}
            secondary3={secondary3(elem)}
            image={getImage(elem)}
          ></ElemCard>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default ElemCardList;
