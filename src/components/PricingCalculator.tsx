
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { BASE_PRICE, companySize, industries, tools } from "@/data/pricingData";

const PricingCalculator = () => {
  const [selectedSize, setSelectedSize] = useState(companySize[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].id);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  const calculatePrice = () => {
    const sizeMultiplier = companySize.find((size) => size.id === selectedSize)?.multiplier || 1;
    const industryMultiplier = industries.find((ind) => ind.id === selectedIndustry)?.multiplier || 1;
    
    const toolsPrice = selectedTools.reduce((acc, toolId) => {
      const tool = tools.find((t) => t.id === toolId);
      return acc + (tool?.price || 0);
    }, 0);

    const baseWithMultipliers = BASE_PRICE * sizeMultiplier * industryMultiplier;
    return Math.round(baseWithMultipliers + toolsPrice);
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [selectedSize, selectedIndustry, selectedTools]);

  const handleToolToggle = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  return (
    <div className="min-h-screen bg-pricing-light py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Precios
          </h1>
          <p className="text-lg text-gray-600">
            Personaliza tu plan según las necesidades de tu empresa
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tamaño de Empresa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {companySize.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-4 rounded-xl transition-all duration-200 ${
                    selectedSize === size.id
                      ? "bg-pricing-accent text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="font-medium">{size.name}</div>
                  <div className="text-sm opacity-80">{size.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Industria</h2>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pricing-accent focus:border-transparent transition-all duration-200"
            >
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Herramientas Adicionales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedTools.includes(tool.id)
                      ? "border-pricing-accent bg-pricing-accent bg-opacity-5"
                      : "border-gray-200 hover:border-pricing-accent"
                  }`}
                  onClick={() => handleToolToggle(tool.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-sm text-gray-600">+${tool.price}/mes</div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedTools.includes(tool.id)
                          ? "bg-pricing-accent text-white"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {selectedTools.includes(tool.id) && <Check size={14} />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-pricing-accent text-white rounded-2xl p-8 text-center"
        >
          <div className="text-xl mb-2">Precio Total Estimado</div>
          <div className="text-5xl font-bold">${totalPrice}/mes</div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingCalculator;
