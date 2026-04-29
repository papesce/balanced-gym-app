import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";
import { ISerie } from "balanced-gym-model";
import { getGraphData, GraphDataPoint } from "./GraphUtils";
import Typography from "@mui/material/Typography";
import "./Graph.css";

interface GraphProps {
  series: ISerie[];
  noDataMsg?: string;
  isNavigable?: boolean;
  handleSelected?: (serieIndex: number) => void;
  handleGraphClick?: () => void;
}

const Graph: React.FC<GraphProps> = ({
  series = [],
  noDataMsg,
  isNavigable = false,
  handleSelected,
  handleGraphClick
}) => {
  const onDotClick = (data: any) => {
    if (!isNavigable || !handleSelected) return;
    const index = series.length - data.index - 1;
    handleSelected(index);
  };

  const onGraphClick = () => {
    if (!isNavigable && handleGraphClick) handleGraphClick();
  };

  if (series.length === 0) {
    return (
      <Typography
        className="elem-list"
        variant="caption"
        display="block"
        gutterBottom
      >
        {noDataMsg || "No history available"}
      </Typography>
    );
  }

  const data = getGraphData(series);

  return (
    <div className="graph-chart-container" onClick={onGraphClick}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <ReferenceArea y1={5} y2={12} fill="#e0e0e0" fillOpacity={0.3} />
          <Line
            type="monotone"
            dataKey="reps"
            stroke="#7cd6fd"
            dot={{ r: 4, cursor: isNavigable ? 'pointer' : 'default' }}
            activeDot={isNavigable ? { r: 6, onClick: (e: any, payload: any) => onDotClick(payload) } : undefined}
            label={{ fontSize: 10, position: 'top' }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#743ee2"
            dot={{ r: 4, cursor: isNavigable ? 'pointer' : 'default' }}
            activeDot={isNavigable ? { r: 6, onClick: (e: any, payload: any) => onDotClick(payload) } : undefined}
            label={{ fontSize: 10, position: 'bottom' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
