"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { TrendingUp, Euro, DollarSign, BarChart3, RefreshCw, ArrowRightLeft } from "lucide-react"

export default function CurrencyWidget() {
  const { darkMode } = useTheme()
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("EUR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [isLoading, setIsLoading] = useState(false)

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const currencies = ["EUR", "USD", "GBP", "JPY", "CAD", "AUD"]

  const getThemeClasses = () => {
    if (darkMode) {
      // Dark mode: Violet and Black
      return {
        container: "bg-black/70 border-violet-500/40",
        gradient: "from-violet-600 via-purple-600 to-violet-700",
        title: "text-violet-100",
        description: "text-violet-300",
        rateMain: "text-violet-100",
        rateChange: "text-violet-400",
        input: "bg-black/50 border-violet-500/30 text-violet-100 placeholder-violet-400",
        select: "bg-black/50 border-violet-500/30 text-violet-100",
        button: "bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800",
        swapButton: "bg-violet-900/40 hover:bg-violet-800/50",
        resultBox: "bg-violet-900/40",
        resultText: "text-violet-300",
        resultValue: "text-violet-100",
        resultHighlight: "text-violet-400",
        resultUpdate: "text-violet-500",
      }
    } else {
      // Light mode: Green and Dark White
      return {
        container: "bg-slate-50/80 border-green-300/50",
        gradient: "from-green-500 via-emerald-500 to-green-600",
        title: "text-slate-800",
        description: "text-slate-600",
        rateMain: "text-slate-800",
        rateChange: "text-green-600",
        input: "bg-white/70 border-green-300/40 text-slate-800 placeholder-slate-500",
        select: "bg-white/70 border-green-300/40 text-slate-800",
        button: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
        swapButton: "bg-green-100/60 hover:bg-green-200/60",
        resultBox: "bg-green-100/60",
        resultText: "text-slate-600",
        resultValue: "text-slate-800",
        resultHighlight: "text-green-600",
        resultUpdate: "text-slate-500",
      }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <div
      className={`w-full backdrop-blur-lg rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 shadow-lg ${themeClasses.container}`}
    >
      <div className="p-8">
        {/* Header avec gradient et icône */}
        <div className="flex items-center space-x-4 mb-8">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <BarChart3 className="w-9 h-9 text-white" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${themeClasses.title}`}>Change</h3>
            <p className={`text-base ${themeClasses.description}`}>Taux en temps réel</p>
          </div>
        </div>

        {/* Taux principal */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex flex-col items-center">
            <Euro className={`w-10 h-10 mb-2 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
            <span className={`text-lg font-medium ${themeClasses.title}`}>EUR</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`text-5xl font-bold mb-1 ${themeClasses.rateMain}`}>1.08</div>
            <div className="flex items-center space-x-1">
              <TrendingUp className={`w-5 h-5 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
              <span className={`text-base font-semibold ${themeClasses.rateChange}`}>+0.02%</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <DollarSign className={`w-10 h-10 mb-2 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
            <span className={`text-lg font-medium ${themeClasses.title}`}>USD</span>
          </div>
        </div>

        {/* Convertisseur interactif */}
        <form onSubmit={handleConvert} className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="number"
              placeholder="Montant"
              className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.input}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
              <select
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.select}`}
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={swapCurrencies}
                className={`p-3 rounded-full transition-all ${themeClasses.swapButton}`}
              >
                <ArrowRightLeft className={`w-6 h-6 ${darkMode ? "text-violet-300" : "text-slate-600"}`} />
              </button>
            </div>

            <div className="md:col-span-2">
              <select
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.select}`}
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full p-4 rounded-xl flex items-center justify-center font-semibold text-white transition-all ${
              isLoading ? "bg-gray-500" : themeClasses.button
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <RefreshCw className="w-5 h-5 mr-2" />
            )}
            {isLoading ? "Conversion en cours..." : "Convertir"}
          </button>
        </form>

        {/* Résultat de conversion */}
        <div className={`p-4 rounded-lg text-center ${themeClasses.resultBox}`}>
          <div className={`text-sm mb-1 ${themeClasses.resultText}`}>Résultat de la conversion</div>
          <div className={`text-2xl font-bold ${themeClasses.resultValue}`}>
            100 EUR = <span className={themeClasses.resultHighlight}>108 USD</span>
          </div>
          <div className={`text-xs mt-1 ${themeClasses.resultUpdate}`}>Mis à jour il y a 2 minutes</div>
        </div>
      </div>
    </div>
  )
}
