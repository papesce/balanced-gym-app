import { ISerie, ISerieDao } from "../metamodel/Serie.metamodel";

export const emptySerie: ISerie = {
  _id: "",
  createdAt: "",
  reps: 0,
  weight: 0
};

export const serieNow: ISerie = {
  _id: "fakeid",
  reps: 7,
  weight: 42,
  createdAt: new Date().toString()
};

const minuteAgo: Date = new Date(Date.now() - 1000 * 60);

export const serieMinAgo: ISerie = {
  _id: "fakeid",
  reps: 7,
  weight: 42,
  createdAt: minuteAgo.toString()
};

export const serie0dao: ISerieDao = {
  _id: "5a78d7933014df0014ad064a",
  createdAt: "2018-02-05T22:18:47.918Z",
  reps: 8,
  weight: 40
};

export const seriesDao2: ISerieDao[] = [
  {
    _id: "5a5b84f3b8de6d0014844191",
    createdAt: "2018-01-14T16:27:31.355Z",
    reps: 16,
    weight: 25,
    restTime: 188
  },
  {
    _id: "5a1dde09c5803b0004611e4f",
    createdAt: "2017-11-28T22:07:05.753Z",
    reps: 14,
    weight: 25,
    restTime: 150
  }
];

export const series0: ISerie[] = [];

export const serie1: ISerie = {
  _id: "5a78d7933014df0014ad064a",
  createdAt: "2018-02-05T22:18:47.918Z",
  reps: 8,
  weight: 40,
  restTime: 110
};

export const serieI: ISerie = {
  _id: "5a78d7933014df0014ad064a",
  createdAt: "2018-02-05T22:15:47.918Z",
  reps: 8.1,
  weight: -40
};

export const series1: ISerie[] = [serie1];

export const serie2: ISerie = {
  _id: "5a78d6d63014df0014ad0649",
  createdAt: "2018-02-05T22:16:38.656Z",
  reps: 10,
  weight: 40
};

export const series2: ISerie[] = [serie1, serie2];

export const serie3: ISerie = {
  _id: "5a78d6d63014df0014ad0649",
  createdAt: "2018-02-05T22:12:38.656Z",
  reps: 10,
  weight: 40
};

export const series3: ISerie[] = [serie1, serie2, serie3];

export const serie4: ISerie = {
  _id: "5a28711558cf370014b2a6f5",
  createdAt: "2017-12-06T22:37:09.544Z",
  reps: 12,
  weight: 36.5
};
export const series4: ISerie[] = [serie1, serie2, serie3, serie4];
export const serie5: ISerie = {
  _id: "5a28709458cf370014b2a6f4",
  createdAt: "2017-12-06T22:35:00.286Z",
  reps: 12,
  weight: 36.5
};
export const series5: ISerie[] = [serie1, serie2, serie3, serie4, serie5];
export const serie6: ISerie = {
  _id: "5a020effffe7390004b7d4a9",
  createdAt: "2017-11-07T19:52:31.070Z",
  reps: 8,
  weight: 35
};
export const series6: ISerie[] = [
  serie1,
  serie2,
  serie3,
  serie4,
  serie5,
  serie6
];

export const serie7: ISerie = {
  _id: "5a020e61ffe7390004b7d4a8",
  createdAt: "2017-11-07T19:49:53.167Z",
  reps: 9,
  weight: 35
};
export const series7: ISerie[] = [
  serie1,
  serie2,
  serie3,
  serie4,
  serie5,
  serie6,
  serie7
];

export const serie8: ISerie = {
  _id: "59f779fd5e69400004fe6f98",
  createdAt: "2017-10-30T19:14:05.619Z",
  reps: 11,
  weight: 30
};
export const series8: ISerie[] = [
  serie1,
  serie2,
  serie3,
  serie4,
  serie5,
  serie6,
  serie7,
  serie8
];
export const series9now: ISerie[] = [
  serieNow,
  serie1,
  serie2,
  serie3,
  serie4,
  serie5,
  serie6,
  serie7,
  serie8
];

export const serie9: ISerie = {
  _id: "59f7795c5e69400004fe6f97",
  createdAt: "2017-10-30T19:11:24.664Z",
  reps: 12,
  weight: 30
};
export const series9: ISerie[] = [
  serie1,
  serie2,
  serie3,
  serie4,
  serie5,
  serie6,
  serie7,
  serie8,
  serie9
];

export const serie10: ISerie = {
  _id: "59ee466e7178850004a09713",
  createdAt: "2017-10-23T19:43:42.918Z",
  reps: 7,
  weight: 30
};
export const serie11: ISerie = {
  _id: "59ee45e77178850004a09712",
  createdAt: "2017-10-23T19:41:27.758Z",
  reps: 8,
  weight: 30
};
