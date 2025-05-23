import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

export default function LeadGenROICalculator() {
  const [inputs, setInputs] = useState({
    serviceFeeA: 2000,
    installFeeB: 1000,
    adSpendDaily: 25,
    leadCost: 20,
    leadsPerDeal: 80,
    dealValue: 15000,
  })

  const [results, setResults] = useState(null)

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) })
  }

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const labels = {
    serviceFeeA: "Monthly Retainer (Traditional Setup)",
    installFeeB: "One-Time Setup Fee (Your Model)",
    adSpendDaily: "Daily Ad Budget",
    leadCost: "Average Cost per Lead",
    leadsPerDeal: "Leads Needed to Win a Listing",
    dealValue: "GCI per Listing ($)"
  }

  const calculate = () => {
    const months = 12
    const adSpendMonthly = inputs.adSpendDaily * 30
    const adSpendYearly = adSpendMonthly * months

    const serviceFeeA = inputs.serviceFeeA * months
    const totalCostA = serviceFeeA + adSpendYearly
    const leadsA = adSpendYearly / inputs.leadCost
    const costPerLeadA = totalCostA / leadsA
    const dealsA = leadsA / inputs.leadsPerDeal
    const gciA = dealsA * inputs.dealValue
    const netRoiA = gciA - totalCostA

    const totalCostB = inputs.installFeeB + adSpendYearly
    const leadsB = adSpendYearly / inputs.leadCost
    const costPerLeadB = totalCostB / leadsB
    const dealsB = leadsB / inputs.leadsPerDeal
    const gciB = dealsB * inputs.dealValue
    const netRoiB = gciB - totalCostB

    setResults({
      A: { totalCost: totalCostA, costPerLead: costPerLeadA, deals: dealsA, gci: gciA, roi: netRoiA },
      B: { totalCost: totalCostB, costPerLead: costPerLeadB, deals: dealsB, gci: gciB, roi: netRoiB },
    })
  }

  return (
    <div className="bg-black min-h-screen py-10">
      <Card className="max-w-4xl mx-auto p-6 bg-zinc-900 shadow-2xl rounded-2xl text-white">
        <CardContent>
          <h2 className="text-3xl font-extrabold text-center mb-6">Lead Gen ROI Calculator</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(inputs).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <Label className="text-sm mb-1 text-white">{labels[key]}</Label>
                <Input type="number" name={key} value={value} onChange={handleChange} className="text-sm bg-zinc-800 text-white border-zinc-700" />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={calculate} className="px-6 py-2 text-lg">Calculate</Button>
          </div>

          {results && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(results).map(([option, data]) => (
                <div key={option} className="border rounded-xl p-6 shadow-sm bg-zinc-800 text-white">
                  <h3 className="text-lg font-semibold mb-4">Option {option}</h3>
                  <p className="mb-1">💰 <strong>Total Cost:</strong> ${formatNumber(data.totalCost)}</p>
                  <p className="mb-1">📊 <strong>Cost per Lead:</strong> ${formatNumber(data.costPerLead)}</p>
                  <p className="mb-1">📈 <strong>Deals Closed:</strong> {data.deals.toFixed(2)}</p>
                  <p className="mb-1">🏆 <strong>Estimated GCI:</strong> ${formatNumber(data.gci)}</p>
                  <p className="mb-1">🚀 <strong>Net ROI:</strong> ${formatNumber(data.roi)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
