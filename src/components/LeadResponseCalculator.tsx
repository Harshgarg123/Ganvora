import { useState, useMemo } from 'react';
import { Calculator, TrendingDown, DollarSign } from 'lucide-react';

export function LeadResponseCalculator() {
  const [leadsPerWeek, setLeadsPerWeek] = useState(25);
  const [responseHours, setResponseHours] = useState(4);
  const [patientValue, setPatientValue] = useState(650);

  const result = useMemo(() => {
    const responseMinutes = responseHours * 60;

    let conversionMultiplier: number;
    if (responseMinutes <= 1) {
      conversionMultiplier = 1.0;
    } else if (responseMinutes <= 5) {
      conversionMultiplier = 0.39;
    } else if (responseMinutes <= 10) {
      conversionMultiplier = 0.26;
    } else if (responseMinutes <= 30) {
      conversionMultiplier = 0.16;
    } else if (responseMinutes <= 60) {
      conversionMultiplier = 0.10;
    } else if (responseMinutes <= 120) {
      conversionMultiplier = 0.06;
    } else {
      conversionMultiplier = 0.03;
    }

    const oneMinuteMultiplier = 1.0;
    const leadsPerMonth = leadsPerWeek * 4.33;
    const currentConversions = Math.round(leadsPerMonth * conversionMultiplier);
    const potentialConversions = Math.round(leadsPerMonth * oneMinuteMultiplier);
    const recoveredPatients = potentialConversions - currentConversions;
    const monthlyRevenueLeft = recoveredPatients * patientValue;
    const yearlyRevenueLeft = monthlyRevenueLeft * 12;

    const breakevenMonthly = Math.max(monthlyRevenueLeft * 0.1, 150);

    return {
      currentConversions,
      potentialConversions,
      recoveredPatients,
      monthlyRevenueLeft,
      yearlyRevenueLeft,
      breakevenMonthly,
      responseMinutes,
    };
  }, [leadsPerWeek, responseHours, patientValue]);

  const formatCurrency = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-10">
      <div className="flex items-center gap-2.5">
        <Calculator size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-xl font-500 text-ink">
          Lead Response Time Calculator
        </h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">
        How much revenue is your clinic leaving on the table by responding to
        leads slowly? Based on MIT research by Dr. James Oldroyd.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <SliderInput
            label="Leads per week"
            value={leadsPerWeek}
            min={1}
            max={100}
            step={1}
            suffix=" leads"
            onChange={setLeadsPerWeek}
          />
          <SliderInput
            label="Average response time"
            value={responseHours}
            min={0.017}
            max={48}
            step={0.5}
            suffix={responseHours < 1 ? ' min' : ' hrs'}
            displayValue={
              responseHours < 1
                ? `${Math.round(responseHours * 60)} min`
                : responseHours.toString()
            }
            onChange={setResponseHours}
          />
          <SliderInput
            label="Average patient value"
            value={patientValue}
            min={100}
            max={3000}
            step={50}
            prefix="$"
            onChange={setPatientValue}
          />
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-xl bg-forest-50 p-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingDown size={16} className="text-forest" />
              <p className="label-mono !text-forest-600">Revenue at risk</p>
            </div>
            <p className="mt-3 font-display text-4xl font-500 text-ink">
              {formatCurrency(result.monthlyRevenueLeft)}
              <span className="text-lg text-ink-400 font-400">/mo</span>
            </p>
            <p className="mt-1 text-sm text-ink-500">
              {formatCurrency(result.yearlyRevenueLeft)} per year
            </p>
          </div>

          <div className="space-y-3 border-t border-forest-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Patients lost per month</span>
              <span className="font-medium text-ink">{result.recoveredPatients}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Current conversion rate</span>
              <span className="font-medium text-ink">
                {((result.currentConversions / (leadsPerWeek * 4.33)) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">If you responded in under 1 min</span>
              <span className="font-medium text-forest">100%</span>
            </div>
          </div>

          <div className="border-t border-forest-100 pt-4">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-forest" />
              <p className="text-sm text-ink-500">
                Breakeven on automation: <span className="font-medium text-ink">{formatCurrency(result.breakevenMonthly)}/mo</span>
              </p>
            </div>
            <p className="mt-1 text-xs text-ink-400">
              An automation tool costing less than this pays for itself.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-400">
        Conversion multipliers are derived from Dr. James Oldroyd's lead
        response research (MIT, published in Harvard Business Review). This is
        a simplified model for estimation only.
      </p>
    </div>
  );
}

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  displayValue?: string;
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = '',
  suffix = '',
  displayValue,
}: SliderInputProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-ink">{label}</label>
        <span className="font-mono text-sm text-forest">
          {prefix}{displayValue ?? value}{suffix}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-forest cursor-pointer"
      />
    </div>
  );
}
