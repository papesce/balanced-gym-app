import {
  getDaysFromDate,
  getDaysFromString,
  getTimeFromDate,
  getTimeForGraph,
  millisToMinutesAndSeconds
} from "./dateUtils";

describe("dateUtils/getDaysFromDate", () => {
  it("should return 0", () => {
    const days = getDaysFromDate(
      new Date("2017-12-23T12:56:21.730Z"),
      new Date("2017-12-23T12:56:21.730Z")
    );
    expect(days).toBe(0);
  });
  it("should return 30", () => {
    const days = getDaysFromDate(
      new Date("2018-12-23T12:56:21.730Z"),
      new Date("2018-11-23T12:56:21.730Z")
    );
    expect(days).toBe(30);
  });
  it("should return 365", () => {
    const days = getDaysFromDate(
      new Date("2017-12-23T12:56:21.730Z"),
      new Date("2018-12-23T12:56:21.730Z")
    );
    expect(days).toBe(365);
  });
  it("should return 365", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const days = getDaysFromDate(yesterday);
    expect(days).toBe(1);
  });
});

describe("dateUtils/getDaysFromString", () => {
  it("getDaysFromString should return 365", () => {
    const days = getDaysFromString(
      "2017-12-23T12:56:21.730Z",
      "2018-12-23T12:56:21.730Z"
    );
    expect(days).toBe(365);
  });
  it("getDaysFromString should return 365", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const days = getDaysFromString(yesterday.toString());
    expect(days).toBe(1);
  });
});

describe("dateUtils/getTimeFromDate", () => {
  it("should return minutes", () => {
    const days = getTimeFromDate(
      new Date("2017-12-23T12:46:21.730Z"),
      new Date("2017-12-23T12:56:21.730Z")
    );
    expect(days).toBe('10 minutes ago');
  });
  it("should return hours", () => {
   const days = getTimeFromDate(
     new Date("2018-12-23T10:56:21.730Z"),
     new Date("2018-12-23T11:56:21.730Z")
   );
   expect(days).toBe("an hour ago");
 });
  it("should return months", () => {
    const days = getTimeFromDate(
      new Date("2018-11-23T11:56:21.730Z"),
      new Date("2018-12-23T11:56:21.730Z")
    );
    expect(days).toBe("a month ago");
  });
});

const getDateAgo = (seconds: number) => {
  const dateNow = new Date();
  const dateAgo = new Date(dateNow.getTime() - seconds * 1000);
  return getTimeForGraph(dateAgo.toUTCString());
}

describe('getTimeForGraph', () => {
  it('now ', () => {
    const text = getTimeForGraph(new Date().toUTCString());
    expect(text).toBe("<1m");
  })
  it('seconds ', () => {
    expect(getDateAgo(43)).toBe("<1m");
  });
  it('1 minute ', () => {
    expect(getDateAgo(45)).toBe("1m");
  })
  it('3 minutes', () => {
    expect(getDateAgo(3 * 60)).toBe("3m");
  })
   it('45 minutes', () => {
    expect(getDateAgo(45 * 60)).toBe("<1h");
  })
  it('1 hour', () => {
    expect(getDateAgo(60 * 60)).toBe("<1h");
  })
  it('3 hours', () => {
    expect(getDateAgo(3 * 60 * 60)).toBe("3h");
  })
  it('23 hours', () => {
    expect(getDateAgo(23 * 60 * 60)).toBe("<1d");
  })
  it('2 days', () => {
    expect(getDateAgo(2 * 24 * 60 * 60)).toBe("2d");
  })
  it('30 days', () => {
    expect(getDateAgo(30 * 24 * 60 * 60)).toBe("30d");
  })
  it('2 months', () => {
    expect(getDateAgo(2 * 30 * 24 * 60 * 60)).toBe("60d");
  })
  
})

describe('millisToMinutesAndSeconds', () => {
  it('1s ', () => {
    expect(millisToMinutesAndSeconds(1000)).toBe("0:01");
  })
  it('60s ', () => {
    expect(millisToMinutesAndSeconds(60*1000)).toBe("1:00");
  })
})
