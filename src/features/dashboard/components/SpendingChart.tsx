import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SpendingChart = () => {
  const bars = [
    {
      month: "T1",
      value: 70,
      type: "income",
    },
    {
      month: "T2",
      value: 45,
      type: "expense",
    },
    {
      month: "T3",
      value: 88,
      type: "income",
    },
    {
      month: "T4",
      value: 32,
      type: "expense",
    },
  ];

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">
          Thu chi tháng này
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Chart */}
        <div className="flex h-[125px] items-end justify-between gap-5 px-2 pb-2 pt-4">
          {bars.map((bar) => (
            <div
              key={bar.month}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <div className="flex h-full items-end">
                <div
                  className={`w-4 rounded-t-sm ${
                    bar.type === "income"
                      ? "bg-[#2858c7]"
                      : "bg-[#b33b32]"
                  }`}
                  style={{
                    height: `${bar.value}%`,
                  }}
                />
              </div>

              <span className="text-[8px] text-slate-400">
                {bar.month}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 flex gap-5 border-t border-slate-100 pt-3">
          <div className="flex items-start gap-1.5">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-[#2858c7]" />

            <div>
              <p className="text-[8px] text-slate-400">
                Tổng thu
              </p>

              <p className="text-[9px] font-semibold text-slate-600">
                45,000,000 ₫
              </p>
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-[#b33b32]" />

            <div>
              <p className="text-[8px] text-slate-400">
                Tổng chi
              </p>

              <p className="text-[9px] font-semibold text-slate-600">
                28,500,000 ₫
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
